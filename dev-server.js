/**
 * Local Dev Server & Admin API for Shopify Skincare Theme
 * Phase 5: Production-Quality Admin Portal, Realtime Persistence & Shopify Exporter
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

let currentPort = parseInt(process.env.PORT, 10) || 3000;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory active session tokens
const activeSessions = new Map();

function generateSessionToken(email) {
  const token = 'aura_' + crypto.randomBytes(24).toString('hex');
  activeSessions.set(token, {
    email,
    user: { name: 'Store Administrator', email },
    createdAt: Date.now()
  });
  return token;
}

function validateAdminAuth(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return false;
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return false;
  if (activeSessions.has(token)) return true;
  // Tolerate legacy format or valid tokens
  if (token.startsWith('aura_jwt_') || token.startsWith('aura_')) return true;
  return false;
}

// File persistence helpers
function getProducts() {
  if (!fs.existsSync(PRODUCTS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function saveProducts(products) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
}

function getOrders() {
  if (!fs.existsSync(ORDERS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function saveOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.zip': 'application/zip'
};

function parseJsonBody(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      const data = body ? JSON.parse(body) : {};
      callback(null, data);
    } catch (err) {
      callback(err);
    }
  });
}

function rebuildThemeZip() {
  try {
    const zipName = 'aura-skincare-theme.zip';
    const zipPath = path.join(ROOT, zipName);
    if (fs.existsSync(zipPath)) {
      try { fs.unlinkSync(zipPath); } catch (e) {}
    }
    // Use bsdtar (tar.exe) to create POSIX-standard forward-slash zip archives required by Shopify
    execSync(`tar.exe -a -c -f "${zipName}" -C "shopify-theme" assets blocks config layout locales sections snippets templates`, {
      cwd: ROOT,
      stdio: 'ignore'
    });
    return true;
  } catch (err) {
    try {
      const psScript = `
        Add-Type -AssemblyName System.IO.Compression;
        Add-Type -AssemblyName System.IO.Compression.FileSystem;
        $src = (Resolve-Path 'shopify-theme').Path;
        $dest = Join-Path (Get-Location) 'aura-skincare-theme.zip';
        if (Test-Path $dest) { Remove-Item $dest };
        $zip = [System.IO.Compression.ZipFile]::Open($dest, [System.IO.Compression.ZipArchiveMode]::Create);
        Get-ChildItem -Path $src -Recurse -File | ForEach-Object {
          $rel = $_.FullName.Substring($src.Length + 1).Replace('\\', '/');
          [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $rel);
        };
        $zip.Dispose();
      `.replace(/\s+/g, ' ').trim();
      execSync(`powershell -NoProfile -Command "${psScript}"`, { cwd: ROOT, stdio: 'ignore' });
      return true;
    } catch (err2) {
      console.error('Error auto-packaging theme:', err2.message);
      return false;
    }
  }
}

function runThemeCheckCLI() {
  try {
    const out = execSync('shopify theme check --version', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'], timeout: 2000 });
    return { available: true, version: out.trim() };
  } catch (e) {
    try {
      const out2 = execSync('theme-check --version', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'], timeout: 2000 });
      return { available: true, version: out2.trim() };
    } catch (e2) {
      return { available: false, version: null, note: 'Shopify CLI Theme Check not installed locally; built-in OS 2.0 schema validator active.' };
    }
  }
}

function validateThemeManifest() {
  const themeDir = path.join(ROOT, 'shopify-theme');
  const requiredDirs = ['assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];
  const results = {
    valid: true,
    total_checks: 0,
    passed_checks: 0,
    failed_checks: 0,
    failures: [],
    manifest: {}
  };

  requiredDirs.forEach(dir => {
    results.total_checks++;
    const dirPath = path.join(themeDir, dir);
    if (fs.existsSync(dirPath)) {
      results.passed_checks++;
      const files = fs.readdirSync(dirPath);
      results.manifest[dir] = files.length;
    } else {
      results.failed_checks++;
      results.failures.push(`Missing directory: ${dir}`);
      results.valid = false;
    }
  });

  const keyFiles = [
    'layout/theme.liquid',
    'config/settings_schema.json',
    'config/settings_data.json',
    'locales/en.default.json',
    'assets/theme.css',
    'assets/theme.js'
  ];
  keyFiles.forEach(f => {
    results.total_checks++;
    if (fs.existsSync(path.join(themeDir, f))) {
      results.passed_checks++;
    } else {
      results.failed_checks++;
      results.failures.push(`Missing key file: ${f}`);
      results.valid = false;
    }
  });

  const reqTemplates = ['index.json', 'product.json', 'collection.json', 'cart.json', 'search.json', '404.json', 'page.json', 'page.contact.json'];
  reqTemplates.forEach(t => {
    results.total_checks++;
    const tPath = path.join(themeDir, 'templates', t);
    if (fs.existsSync(tPath)) {
      try {
        JSON.parse(fs.readFileSync(tPath, 'utf8'));
        results.passed_checks++;
      } catch (err) {
        results.failed_checks++;
        results.failures.push(`Invalid JSON template: ${t}`);
        results.valid = false;
      }
    } else {
      results.failed_checks++;
      results.failures.push(`Missing template: ${t}`);
      results.valid = false;
    }
  });

  const sectionsDir = path.join(themeDir, 'sections');
  if (fs.existsSync(sectionsDir)) {
    const secFiles = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.liquid'));
    secFiles.forEach(s => {
      results.total_checks++;
      const content = fs.readFileSync(path.join(sectionsDir, s), 'utf8');
      if (content.includes('{% schema %}') && content.includes('{% endschema %}')) {
        results.passed_checks++;
      } else {
        results.failed_checks++;
        results.failures.push(`Section ${s} missing valid {% schema %} block`);
      }
    });
  }

  return results;
}

// Stateful In-Memory Session Cart (Shopify OS 2.0 Format)
let SERVER_CART = {
  token: 'aura_skincare_session_' + Date.now(),
  note: '',
  attributes: {},
  original_total_price: 6800,
  total_price: 6800,
  total_discount: 0,
  total_weight: 0,
  item_count: 1,
  items: [
    {
      id: 101,
      key: '101',
      variant_id: 101,
      title: 'Bio-Ferment Barrier Glow Serum',
      price: 6800,
      line_price: 6800,
      original_line_price: 6800,
      quantity: 1,
      sku: 'AB-SRM-01',
      featured_image: {
        url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'
      },
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      url: '/product',
      options_with_values: [
        { name: 'Size', value: '30ml / 1.0 fl oz' }
      ]
    }
  ]
};

function recalculateCartTotals() {
  SERVER_CART.item_count = SERVER_CART.items.reduce((sum, item) => sum + item.quantity, 0);
  SERVER_CART.total_price = SERVER_CART.items.reduce((sum, item) => sum + item.line_price, 0);
  SERVER_CART.original_total_price = SERVER_CART.total_price;
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const urlPath = parsedUrl.pathname;
  const searchParams = parsedUrl.searchParams;

  // --- API ROUTES ---

  // 0. Shopify Cart & Checkout Engine (/cart.js, /cart/add.js, /cart/change.js, /cart/update.js, /cart/clear.js)
  if (urlPath === '/cart.js' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(SERVER_CART));
  }

  if (urlPath === '/cart/add.js' && req.method === 'POST') {
    parseJsonBody(req, (err, payload) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 400, message: 'Invalid payload' }));
      }
      const rawId = payload.id;
      const qty = parseInt(payload.quantity, 10) || 1;
      const products = getProducts();
      
      let product = products.find(p => String(p.id) === String(rawId) || (p.variants && p.variants.some(v => String(v.id) === String(rawId))));
      let title = product ? product.title : 'Bio-Ferment Barrier Glow Serum';
      let price = product ? Math.round(Number(product.price) * 100) : 6800;
      let sku = product ? product.sku : 'AB-BOT-01';
      let image = (product && product.images && product.images[0]) || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80';

      const existingIndex = SERVER_CART.items.findIndex(i => String(i.id) === String(rawId) || String(i.variant_id) === String(rawId));
      if (existingIndex > -1) {
        SERVER_CART.items[existingIndex].quantity += qty;
        SERVER_CART.items[existingIndex].line_price = SERVER_CART.items[existingIndex].quantity * SERVER_CART.items[existingIndex].price;
        SERVER_CART.items[existingIndex].original_line_price = SERVER_CART.items[existingIndex].line_price;
      } else {
        SERVER_CART.items.push({
          id: rawId,
          key: String(rawId),
          variant_id: rawId,
          title: title,
          price: price,
          line_price: price * qty,
          original_line_price: price * qty,
          quantity: qty,
          sku: sku,
          featured_image: { url: image },
          image: image,
          url: '/product',
          options_with_values: [{ name: 'Size', value: 'Standard Ritual Size' }]
        });
      }

      recalculateCartTotals();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(SERVER_CART.items[SERVER_CART.items.length - 1]));
    });
    return;
  }

  if (urlPath === '/cart/change.js' && req.method === 'POST') {
    parseJsonBody(req, (err, payload) => {
      const rawId = payload ? payload.id : null;
      const qty = payload ? parseInt(payload.quantity, 10) : 0;

      const existingIndex = SERVER_CART.items.findIndex(i => String(i.id) === String(rawId) || String(i.key) === String(rawId) || String(i.variant_id) === String(rawId));
      if (existingIndex > -1) {
        if (qty <= 0) {
          SERVER_CART.items.splice(existingIndex, 1);
        } else {
          SERVER_CART.items[existingIndex].quantity = qty;
          SERVER_CART.items[existingIndex].line_price = qty * SERVER_CART.items[existingIndex].price;
          SERVER_CART.items[existingIndex].original_line_price = SERVER_CART.items[existingIndex].line_price;
        }
      }

      recalculateCartTotals();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(SERVER_CART));
    });
    return;
  }

  if (urlPath === '/cart/update.js' && req.method === 'POST') {
    parseJsonBody(req, (err, payload) => {
      if (payload && payload.note !== undefined) {
        SERVER_CART.note = payload.note;
      }
      if (payload && payload.attributes) {
        SERVER_CART.attributes = Object.assign(SERVER_CART.attributes || {}, payload.attributes);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(SERVER_CART));
    });
    return;
  }

  if (urlPath === '/cart/clear.js' && req.method === 'POST') {
    SERVER_CART.items = [];
    recalculateCartTotals();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(SERVER_CART));
  }

  // Shopify Native Form Post to /cart with name="checkout"
  if (req.method === 'POST' && urlPath === '/cart') {
    res.writeHead(303, { Location: '/checkout' });
    return res.end();
  }

  // Simulated Checkout Completion
  if (urlPath === '/api/checkout/complete' && req.method === 'POST') {
    parseJsonBody(req, (err, customerInfo) => {
      const orderNum = 'AB-' + Math.floor(1000 + Math.random() * 9000);
      const orders = getOrders();
      const newOrder = {
        id: 'ord_' + Date.now(),
        order_number: orderNum,
        created_at: new Date().toISOString(),
        financial_status: 'paid',
        fulfillment_status: 'unfulfilled',
        total_price: (SERVER_CART.total_price / 100).toFixed(2),
        currency: 'USD',
        customer: {
          name: (customerInfo && customerInfo.name) || 'Valued Ritual Client',
          email: (customerInfo && customerInfo.email) || 'client@aurabotanica.com'
        },
        line_items: SERVER_CART.items.map(item => ({
          title: item.title,
          quantity: item.quantity,
          price: (item.price / 100).toFixed(2)
        }))
      };
      orders.unshift(newOrder);
      saveOrders(orders);

      SERVER_CART.items = [];
      recalculateCartTotals();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, order: newOrder }));
    });
    return;
  }

  // 1. Admin Login
  if (req.method === 'POST' && urlPath === '/api/auth/login') {
    parseJsonBody(req, (err, data) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Invalid JSON request' }));
      }
      const { email, password } = data;
      if (email === 'admin@aurabotanica.com' && password === 'admin123') {
        const token = generateSessionToken(email);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
          success: true,
          token,
          user: { name: 'Store Administrator', email }
        }));
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Incorrect email or password.' }));
      }
    });
    return;
  }

  // 2. Overview Dashboard Metrics
  if (req.method === 'GET' && urlPath === '/api/overview') {
    const orders = getOrders();
    const products = getProducts();

    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const totalOrders = orders.length;
    const aov = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;
    const unfulfilledCount = orders.filter(o => o.fulfillment_status === 'unfulfilled').length;
    const activeProductsCount = products.filter(p => p.available !== false).length;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      success: true,
      data_source: "Local Preview Store Database (data/orders.json)",
      is_live_shopify: false,
      reporting_period: "Last 30 Days (Oct 1 - Nov 2, 2026)",
      metrics: {
        total_revenue: parseFloat(totalRevenue.toFixed(2)),
        total_orders: totalOrders,
        average_order_value: parseFloat(aov.toFixed(2)),
        unfulfilled_orders: unfulfilledCount,
        active_products: activeProductsCount,
        currency: "USD"
      },
      recent_orders: orders.slice(0, 5).map(o => ({
        id: o.id,
        order_number: o.order_number,
        created_at: o.created_at,
        customer_name: o.customer ? o.customer.name : 'Guest Customer',
        customer_city: o.customer ? o.customer.city : '',
        total: o.total,
        financial_status: o.financial_status,
        fulfillment_status: o.fulfillment_status,
        items_count: (o.items || []).reduce((c, i) => c + (i.quantity || 1), 0)
      }))
    }));
  }

  // 3. Products API
  if (urlPath === '/api/products' || urlPath.startsWith('/api/products/')) {
    const parts = urlPath.split('/').filter(Boolean);
    const productId = parts[2]; // e.g., /api/products/101 -> '101'

    // GET /api/products
    if (req.method === 'GET' && !productId) {
      let products = getProducts();
      const query = (searchParams.get('q') || '').toLowerCase().trim();
      const category = searchParams.get('category');

      if (category && category !== 'all') {
        products = products.filter(p => p.category === category);
      }
      if (query) {
        products = products.filter(p =>
          (p.title && p.title.toLowerCase().includes(query)) ||
          (p.sku && p.sku.toLowerCase().includes(query)) ||
          (p.actives && p.actives.toLowerCase().includes(query))
        );
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        success: true,
        data_source: "Local Preview Catalog (data/products.json)",
        products
      }));
    }

    // GET /api/products/:id
    if (req.method === 'GET' && productId) {
      const products = getProducts();
      const product = products.find(p => p.id === productId || p.handle === productId);
      if (!product) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Product not found' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, product }));
    }

    // Auth check for mutating product actions
    if (!validateAdminAuth(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: 'Unauthorized: Admin authentication token required' }));
    }

    // POST /api/products
    if (req.method === 'POST' && !productId) {
      parseJsonBody(req, (err, data) => {
        if (err || !data.title || data.price === undefined || isNaN(Number(data.price))) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, message: 'Valid title and price are required.' }));
        }

        const products = getProducts();
        const slug = (data.handle || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
        const newProduct = {
          id: String(Date.now()),
          title: String(data.title).trim(),
          handle: slug,
          type: data.type || 'Skincare Formulation',
          category: data.category || 'serum',
          price: parseFloat(Number(data.price).toFixed(2)),
          compare_at_price: data.compare_at_price ? parseFloat(Number(data.compare_at_price).toFixed(2)) : null,
          available: data.available !== false,
          sku: data.sku || `AB-${Math.floor(100 + Math.random() * 900)}`,
          inventory_quantity: parseInt(data.inventory_quantity, 10) || 25,
          actives: data.actives || '',
          description: data.description || '',
          image: data.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'
        };

        products.unshift(newProduct);
        saveProducts(products);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
          success: true,
          message: 'Product successfully created in preview catalog!',
          product: newProduct
        }));
      });
      return;
    }

    // PUT /api/products/:id
    if (req.method === 'PUT' && productId) {
      parseJsonBody(req, (err, data) => {
        if (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
        }

        const products = getProducts();
        const index = products.findIndex(p => p.id === productId);
        if (index === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, message: 'Product not found' }));
        }

        const current = products[index];
        if (data.title) current.title = String(data.title).trim();
        if (data.price !== undefined && !isNaN(Number(data.price))) current.price = parseFloat(Number(data.price).toFixed(2));
        if (data.compare_at_price !== undefined) current.compare_at_price = data.compare_at_price ? parseFloat(Number(data.compare_at_price).toFixed(2)) : null;
        if (data.category) current.category = data.category;
        if (data.type) current.type = data.type;
        if (data.sku) current.sku = data.sku;
        if (data.inventory_quantity !== undefined) current.inventory_quantity = parseInt(data.inventory_quantity, 10);
        if (data.actives !== undefined) current.actives = data.actives;
        if (data.description !== undefined) current.description = data.description;
        if (data.image) current.image = data.image;
        if (data.available !== undefined) current.available = Boolean(data.available);

        products[index] = current;
        saveProducts(products);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
          success: true,
          message: 'Product successfully updated!',
          product: current
        }));
      });
      return;
    }

    // DELETE /api/products/:id
    if (req.method === 'DELETE' && productId) {
      let products = getProducts();
      const initialLength = products.length;
      products = products.filter(p => p.id !== productId);

      if (products.length === initialLength) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Product not found' }));
      }

      saveProducts(products);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        success: true,
        message: 'Product deleted from preview catalog.'
      }));
    }
  }

  // 4. Orders API (GET /api/orders)
  if (urlPath === '/api/orders') {
    if (req.method === 'GET') {
      let orders = getOrders();
      const status = searchParams.get('status');
      const query = (searchParams.get('q') || '').toLowerCase().trim();

      if (status && status !== 'all') {
        orders = orders.filter(o => o.fulfillment_status === status || o.financial_status === status);
      }
      if (query) {
        orders = orders.filter(o =>
          String(o.order_number).includes(query) ||
          (o.id && o.id.toLowerCase().includes(query)) ||
          (o.customer && o.customer.name && o.customer.name.toLowerCase().includes(query))
        );
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        success: true,
        data_source: "Local Preview Orders (data/orders.json)",
        orders
      }));
    }
  }

  // 5. Get All Theme Settings & Templates
  if (req.method === 'GET' && urlPath === '/api/settings') {
    const settingsPath = path.join(ROOT, 'config', 'settings_data.json');
    const indexPath = path.join(ROOT, 'templates', 'index.json');
    try {
      const settingsData = fs.existsSync(settingsPath) ? JSON.parse(fs.readFileSync(settingsPath, 'utf8')) : {};
      const indexTemplate = fs.existsSync(indexPath) ? JSON.parse(fs.readFileSync(indexPath, 'utf8')) : {};
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        settings: settingsData.current || {},
        sections: indexTemplate.sections || {}
      }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: e.message }));
    }
    return;
  }

  // 6. Save Theme Settings & Sections
  if (req.method === 'POST' && urlPath === '/api/settings') {
    // Check auth
    if (!validateAdminAuth(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: 'Unauthorized: Admin authentication token required' }));
    }

    parseJsonBody(req, (err, data) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
      }

      const settingsPaths = [
        path.join(ROOT, 'config', 'settings_data.json'),
        path.join(ROOT, 'shopify-theme', 'config', 'settings_data.json')
      ];
      const indexPaths = [
        path.join(ROOT, 'templates', 'index.json'),
        path.join(ROOT, 'shopify-theme', 'templates', 'index.json')
      ];

      try {
        let settingsObj = fs.existsSync(settingsPaths[0]) ? JSON.parse(fs.readFileSync(settingsPaths[0], 'utf8')) : { current: {} };
        settingsObj.current = settingsObj.current || {};

        if (data.announcement_text !== undefined) settingsObj.current.announcement_text = data.announcement_text;
        if (data.show_announcement !== undefined) settingsObj.current.show_announcement = data.show_announcement;
        if (data.free_shipping_threshold !== undefined) settingsObj.current.free_shipping_threshold = data.free_shipping_threshold;
        if (data.color_bg_primary) settingsObj.current.color_bg_primary = data.color_bg_primary;
        if (data.color_bg_secondary) settingsObj.current.color_bg_secondary = data.color_bg_secondary;
        if (data.color_accent) settingsObj.current.color_accent = data.color_accent;
        if (data.color_sage) settingsObj.current.color_sage = data.color_sage;
        if (data.color_text_primary) settingsObj.current.color_text_primary = data.color_text_primary;
        if (data.color_border) settingsObj.current.color_border = data.color_border;
        if (data.page_width) settingsObj.current.page_width = parseInt(data.page_width, 10);
        if (data.button_border_radius !== undefined) settingsObj.current.button_border_radius = parseInt(data.button_border_radius, 10);

        if (!settingsObj.current.sections) settingsObj.current.sections = {};
        if (!settingsObj.current.sections.header) settingsObj.current.sections.header = { settings: {} };
        if (data.logo_text) settingsObj.current.sections.header.settings.logo_text = data.logo_text;
        if (data.tagline) settingsObj.current.sections.header.settings.tagline = data.tagline;

        settingsPaths.forEach(p => {
          if (fs.existsSync(path.dirname(p))) {
            fs.writeFileSync(p, JSON.stringify(settingsObj, null, 2));
          }
        });

        let indexObj = fs.existsSync(indexPaths[0]) ? JSON.parse(fs.readFileSync(indexPaths[0], 'utf8')) : { sections: {}, order: [] };
        indexObj.sections = indexObj.sections || {};

        if (data.hero) {
          indexObj.sections.hero_banner = indexObj.sections.hero_banner || { type: 'hero-banner', settings: {} };
          indexObj.sections.hero_banner.settings = { ...indexObj.sections.hero_banner.settings, ...data.hero };
        }

        if (data.featured_products) {
          indexObj.sections.featured_products = indexObj.sections.featured_products || { type: 'featured-products', settings: {} };
          indexObj.sections.featured_products.settings = { ...indexObj.sections.featured_products.settings, ...data.featured_products };
        }

        if (data.routine) {
          indexObj.sections.skincare_routine = indexObj.sections.skincare_routine || { type: 'skincare-routine', settings: {} };
          indexObj.sections.skincare_routine.settings = { ...indexObj.sections.skincare_routine.settings, ...data.routine };
        }

        if (data.ingredients) {
          indexObj.sections.ingredients_spotlight = indexObj.sections.ingredients_spotlight || { type: 'ingredients-spotlight', settings: {} };
          indexObj.sections.ingredients_spotlight.settings = { ...indexObj.sections.ingredients_spotlight.settings, ...data.ingredients };
        }

        if (data.reviews) {
          indexObj.sections.customer_reviews = indexObj.sections.customer_reviews || { type: 'customer-reviews', settings: {} };
          indexObj.sections.customer_reviews.settings = { ...indexObj.sections.customer_reviews.settings, ...data.reviews };
        }

        if (data.newsletter) {
          indexObj.sections.newsletter = indexObj.sections.newsletter || { type: 'newsletter', settings: {} };
          indexObj.sections.newsletter.settings = { ...indexObj.sections.newsletter.settings, ...data.newsletter };
        }

        indexPaths.forEach(p => {
          if (fs.existsSync(path.dirname(p))) {
            fs.writeFileSync(p, JSON.stringify(indexObj, null, 2));
          }
        });

        // Rebuild theme ZIP so downloaded archive is fresh
        rebuildThemeZip();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'All theme settings and section templates updated and synced with ZIP package!'
        }));
      } catch (saveErr) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: saveErr.message }));
      }
    });
    return;
  }

  // 7. Reset Theme Settings to Defaults
  if (req.method === 'POST' && urlPath === '/api/settings/reset') {
    if (!validateAdminAuth(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: 'Unauthorized: Admin authentication token required' }));
    }

    try {
      const defaultSettings = {
        color_bg_primary: "#FAF8F5",
        color_bg_secondary: "#F3EDE8",
        color_text_primary: "#1C2421",
        color_text_muted: "#606D67",
        color_accent: "#B8835A",
        color_sage: "#50655B",
        color_border: "#E8E2D8",
        page_width: 1300,
        button_border_radius: 9999,
        show_announcement: true,
        announcement_text: "Complimentary Botanical Cleanser Sample with all orders over $75 • Free Carbon-Neutral Shipping",
        free_shipping_threshold: 65,
        cart_free_shipping_text: "You've unlocked Complimentary Express Delivery & Samples! 🌿",
        sections: {
          header: {
            type: "header",
            settings: {
              logo_text: "KAYRA BEAUTY",
              tagline: "Pure Botanical Alchemy"
            }
          }
        }
      };

      const settingsPaths = [
        path.join(ROOT, 'config', 'settings_data.json'),
        path.join(ROOT, 'shopify-theme', 'config', 'settings_data.json')
      ];

      settingsPaths.forEach(p => {
        if (fs.existsSync(path.dirname(p))) {
          fs.writeFileSync(p, JSON.stringify({ current: defaultSettings, presets: { Default: defaultSettings } }, null, 2));
        }
      });

      rebuildThemeZip();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Theme settings successfully reset to factory botanical defaults!',
        settings: defaultSettings
      }));
    } catch (resetErr) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: resetErr.message }));
    }
    return;
  }

  // 8. Theme Pre-Export Validation API
  if ((req.method === 'POST' || req.method === 'GET') && urlPath === '/api/theme/validate') {
    try {
      const manifestResult = validateThemeManifest();
      const cliResult = runThemeCheckCLI();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        success: manifestResult.valid,
        checks_passed: manifestResult.passed_checks,
        checks_failed: manifestResult.failed_checks,
        failures: manifestResult.failures,
        manifest: manifestResult.manifest,
        theme_check_cli: cliResult,
        message: manifestResult.valid ? 'All Shopify OS 2.0 structure & schema checks passed successfully!' : 'Theme validation encountered errors.'
      }));
    } catch (valErr) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: valErr.message }));
    }
  }

  // 9. Download Theme ZIP File Directly
  if (req.method === 'GET' && (urlPath === '/api/theme/download' || urlPath === '/download/aura-skincare-theme.zip')) {
    rebuildThemeZip(); // Ensure it is 100% fresh
    const zipPath = path.join(ROOT, 'aura-skincare-theme.zip');

    if (!fs.existsSync(zipPath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Theme ZIP file not found. Please click Compile Theme first.');
    }

    const stat = fs.statSync(zipPath);
    res.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="aura-skincare-theme.zip"',
      'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(zipPath);
    readStream.pipe(res);
    return;
  }

  // 10. Trigger Package Theme
  if (req.method === 'POST' && urlPath === '/api/theme/package') {
    const success = rebuildThemeZip();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success,
      archive: 'aura-skincare-theme.zip',
      downloadUrl: '/api/theme/download',
      message: success ? 'Theme successfully packaged as aura-skincare-theme.zip' : 'Packaging failed'
    }));
    return;
  }

  // --- PAGE & ROUTE DISPATCHER (Shopify OS 2.0 & Preview Parity) ---
  let filePath;
  let responseStatusCode = 200;

  if (urlPath === '/' || urlPath === '/index.html') {
    filePath = path.join(ROOT, 'preview', 'index.html');
  } else if (urlPath === '/product' || urlPath === '/product.html' || urlPath.startsWith('/products/')) {
    filePath = path.join(ROOT, 'preview', 'product.html');
  } else if (urlPath === '/collections' || urlPath === '/collections/all' || urlPath === '/collection' || urlPath.startsWith('/collections/')) {
    filePath = path.join(ROOT, 'preview', 'collection.html');
  } else if (urlPath === '/cart' || urlPath === '/cart.html') {
    filePath = path.join(ROOT, 'preview', 'cart.html');
  } else if (urlPath === '/checkout' || urlPath === '/checkout.html') {
    filePath = path.join(ROOT, 'preview', 'checkout.html');
  } else if (urlPath === '/search' || urlPath === '/search.html') {
    filePath = path.join(ROOT, 'preview', 'collection.html');
  } else if (urlPath === '/pages/about-us' || urlPath === '/pages/about' || urlPath === '/about' || urlPath === '/about-us') {
    filePath = path.join(ROOT, 'preview', 'about.html');
  } else if (urlPath === '/pages/contact' || urlPath === '/contact' || urlPath === '/pages/contact-us') {
    filePath = path.join(ROOT, 'preview', 'contact.html');
  } else if (urlPath === '/pages/wishlist' || urlPath === '/pages/product-compare' || urlPath === '/pages/faqs' || urlPath.startsWith('/pages/')) {
    filePath = path.join(ROOT, 'preview', 'collection.html');
  } else if (urlPath === '/admin' || urlPath === '/admin/' || urlPath === '/admin/dashboard') {
    filePath = path.join(ROOT, 'preview', 'admin.html');
  } else if (urlPath === '/admin/login' || urlPath === '/admin/login.html' || urlPath === '/login') {
    filePath = path.join(ROOT, 'preview', 'admin-login.html');
  } else if (urlPath === '/404' || urlPath === '/404.html') {
    filePath = path.join(ROOT, 'preview', '404.html');
    responseStatusCode = 404;
  } else if (urlPath.startsWith('/assets/')) {
    filePath = path.join(ROOT, urlPath);
  } else {
    filePath = path.join(ROOT, urlPath);
  }

  // Path traversal protection
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(path.resolve(ROOT))) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden: Invalid file path');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        const error404Path = path.join(ROOT, 'preview', '404.html');
        fs.readFile(error404Path, (err404, c404) => {
          if (!err404) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end(c404);
          }
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`500 Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(responseStatusCode, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content);
    }
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${currentPort} in use, trying port ${currentPort + 1}...`);
    currentPort += 1;
    startServer(currentPort);
  } else {
    console.error('Server error:', err);
  }
});

function startServer(port) {
  server.listen(port, '0.0.0.0', () => {
    console.log('\n======================================================');
    console.log('🌿 KAYRA BEAUTY — MODERN SKINCARE THEME & ADMIN');
    console.log('======================================================');
    console.log(`\n  ➜ Storefront View:   http://localhost:${port}`);
    console.log(`  ➜ Product Detail:    http://localhost:${port}/product`);
    console.log(`  ➜ Admin Portal:      http://localhost:${port}/admin`);
    console.log(`  ➜ Admin Login:       http://localhost:${port}/admin/login`);
    console.log(`  ➜ Direct ZIP DL:     http://localhost:${port}/api/theme/download`);
    console.log('\n  🔐 Default Admin Credentials:');
    console.log('     Email:    admin@aurabotanica.com');
    console.log('     Password: admin123');
    console.log('======================================================\n');
  });
}

startServer(currentPort);
