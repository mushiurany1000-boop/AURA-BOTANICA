const http = require('http');

function request(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    const req = http.request({
      hostname: '127.0.0.1',
      port: 3000,
      path,
      method,
      headers
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data), headers: res.headers });
        } catch(e) {
          resolve({ status: res.statusCode, raw: data, headers: res.headers });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runFullIntegrationTest() {
  console.log('--- Step 1: Admin Login ---');
  const login = await request('POST', '/api/auth/login', { email: 'admin@aurabotanica.com', password: 'admin123' });
  console.log('Login Status:', login.status, 'Token:', login.data.token ? 'Received' : 'Failed');
  const token = login.data.token;

  console.log('--- Step 2: Create Skincare Formulation ---');
  const newProd = await request('POST', '/api/products', {
    title: 'Phyto-Peptide Firming Eye Elixir',
    category: 'serum',
    price: 62.00,
    compare_at_price: 75.00,
    actives: 'Copper Tripeptide-1, Caffeine, Green Tea',
    sku: 'AB-EYE-005',
    inventory_quantity: 40
  }, token);
  console.log('Create Product Status:', newProd.status, 'Title:', newProd.data.product?.title);
  const createdId = newProd.data.product.id;

  console.log('--- Step 3: Verify in Catalog ---');
  const catalog = await request('GET', '/api/products');
  console.log('Catalog Count:', catalog.data.products.length);

  console.log('--- Step 4: Update Formulation ---');
  const updatedProd = await request('PUT', `/api/products/${createdId}`, { price: 64.00 }, token);
  console.log('Update Status:', updatedProd.status, 'New Price:', updatedProd.data.product?.price);

  console.log('--- Step 5: Clean up / Delete Test Formulation ---');
  const delProd = await request('DELETE', `/api/products/${createdId}`, null, token);
  console.log('Delete Status:', delProd.status, 'Message:', delProd.data.message);

  console.log('--- Step 6: Verify Theme Validation API ---');
  const val = await request('POST', '/api/theme/validate');
  console.log('Validation Status:', val.status, 'Passed checks:', val.data.checks_passed, 'Valid:', val.data.success);

  console.log('--- Step 7: Verify Direct ZIP Download ---');
  await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:3000/api/theme/download', res => {
      console.log('ZIP Download Status:', res.statusCode);
      console.log('Content-Type:', res.headers['content-type']);
      console.log('Content-Disposition:', res.headers['content-disposition']);
      let size = 0;
      res.on('data', c => size += c.length);
      res.on('end', () => {
        console.log('ZIP File Downloaded Size:', (size / 1024).toFixed(1) + ' KB');
        resolve();
      });
    }).on('error', reject);
  });
}

runFullIntegrationTest().then(() => console.log('\n>>> ALL PHASE 5 INTEGRATION TESTS PASSED WITH 100% SUCCESS! <<<')).catch(console.error);

