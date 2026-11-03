const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'shopify-theme', 'assets', 'theme.js'),
  path.join(__dirname, '..', 'assets', 'theme.js')
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let code = fs.readFileSync(file, 'utf8');

  // 1. Add saveCartToStorage and loadCartFromStorage if not present
  if (!code.includes('function saveCartToStorage')) {
    const storageCode = `
  // --- Persistent Storage Helpers for Cart ---
  function saveCartToStorage() {
    try {
      localStorage.setItem('aura_cart', JSON.stringify({
        itemCount: CART_STATE.itemCount,
        totalPrice: CART_STATE.totalPrice,
        note: CART_STATE.note || '',
        items: CART_STATE.items
      }));
    } catch (e) {}
  }

  function loadCartFromStorage() {
    try {
      const stored = JSON.parse(localStorage.getItem('aura_cart'));
      if (stored && Array.isArray(stored.items) && stored.items.length > 0) {
        CART_STATE.itemCount = stored.itemCount || stored.items.reduce((s, i) => s + (i.quantity || 1), 0);
        CART_STATE.totalPrice = stored.totalPrice || stored.items.reduce((s, i) => s + (i.price * (i.quantity || 1)), 0);
        CART_STATE.note = stored.note || '';
        CART_STATE.items = stored.items;
        return true;
      }
    } catch (e) {}
    return false;
  }
`;
    code = code.replace("const CART_STATE = {", storageCode + "\n  const CART_STATE = {");
  }

  // 2. Enhance addProductToCart and updateCartItemQuantity to always call saveCartToStorage
  code = code.replace(/updateCartUI\(\);\s*openCart\(\);/g, "updateCartUI();\n    saveCartToStorage();\n    openCart();");
  code = code.replace(/updateCartUI\(\);\s*return true;/g, "updateCartUI();\n        saveCartToStorage();\n        return true;");

  // 3. Fix checkout button handler: ensure saveCartToStorage runs and note is saved, and no infinite loop
  const oldCheckoutHandlerRegex = /\/\/ Checkout Button Handler[\s\S]*?window\.location\.href = '\/checkout';\s*return;\s*\}/;
  const newCheckoutHandler = `// Checkout Button Handler
    const checkoutBtn = e.target.closest('#CartCheckoutButton, #MainCartCheckoutBtn, [name="checkout"], [data-action="checkout"]');
    if (checkoutBtn) {
      const count = CART_STATE.itemCount || (CART_STATE.items && CART_STATE.items.length) || 0;
      if (count === 0) {
        e.preventDefault();
        announceToScreenReader('Your shopping bag is empty.');
        alert('Your ritual bag is empty. Please select a botanical formulation before proceeding to checkout.');
        return;
      }

      // Save note immediately to CART_STATE and storage
      const noteInput = document.getElementById('CartDrawerNote') || document.getElementById('CartPageNote');
      if (noteInput && noteInput.value) {
        CART_STATE.note = noteInput.value;
        try {
          fetch(routes.cart_update_url || '/cart/update.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ note: noteInput.value })
          });
        } catch (err) {}
      }
      saveCartToStorage();

      // If inside a Shopify native form on live store with valid checkout endpoint
      const form = checkoutBtn.closest('form');
      const isShopifyEnv = window.Shopify && window.Shopify.shop && !window.location.host.includes('localhost');
      if (isShopifyEnv && form && form.action && form.action.includes('/cart') && form.method.toLowerCase() === 'post') {
        return;
      }

      // Always reliably navigate to /checkout for preview server, dev mode, and AJAX drawers
      e.preventDefault();
      window.location.href = '/checkout';
      return;
    }`;

  code = code.replace(oldCheckoutHandlerRegex, newCheckoutHandler);

  // 4. Quick View Modal Engine
  if (!code.includes('function initQuickView')) {
    const quickViewEngine = `
  // --- 10. Quick View / Quick Shop Modal Engine ---
  function initQuickView() {
    const modal = document.getElementById('QuickViewModal');
    if (!modal) return;

    let selectedVariantId = null;
    let selectedPrice = 6800;
    let currentItem = null;

    function openQuickView(data) {
      currentItem = data;
      selectedVariantId = data.id;
      selectedPrice = data.priceNum || 6800;

      const img = document.getElementById('QuickViewImage');
      if (img) img.src = data.image || '';

      const cat = document.getElementById('QuickViewCategory');
      if (cat) cat.textContent = data.category || 'Clinical Barrier Care';

      const title = document.getElementById('QuickViewTitle');
      if (title) title.textContent = data.title || 'Botanical Formulation';

      const price = document.getElementById('QuickViewPrice');
      if (price) price.textContent = data.price || formatMoney(selectedPrice);

      const btnPrice = document.getElementById('QuickViewBtnPrice');
      if (btnPrice) btnPrice.textContent = data.price || formatMoney(selectedPrice);

      const desc = document.getElementById('QuickViewDescription');
      if (desc) desc.textContent = data.description || 'Cold-pressed biocompatible formulation designed to restore lipid matrix integrity.';

      const fullLink = document.getElementById('QuickViewFullDetailsLink');
      if (fullLink) fullLink.href = data.url || '/products/' + (data.handle || '');

      // Populate variant pills
      const pillsContainer = document.getElementById('QuickViewVariantsPills');
      if (pillsContainer) {
        pillsContainer.innerHTML = \`
          <button type="button" class="variant-mini-pill is-active" data-size="50ml" data-price="\${data.price || '$68.00'}">50ml Standard Ritual</button>
          <button type="button" class="variant-mini-pill" data-size="100ml" data-price="$118.00">100ml Atelier Size</button>
        \`;
      }

      const qtyInput = document.getElementById('QuickViewQtyInput');
      if (qtyInput) qtyInput.value = 1;

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (overlayBackdrop) overlayBackdrop.classList.add('is-active');
    }

    function closeQuickView() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      if (!CART_STATE.isOpen && !searchModal?.classList.contains('is-open') && !filterDrawer?.classList.contains('is-open')) {
        if (overlayBackdrop) overlayBackdrop.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    }

    // Event Delegator for Quick View clicks
    document.addEventListener('click', function(e) {
      const qvBtn = e.target.closest('[data-action="quick-view"]');
      if (qvBtn) {
        e.preventDefault();
        const priceStr = qvBtn.getAttribute('data-price') || '$68.00';
        const priceNum = parseFloat(priceStr.replace(/[^0-9.]/g, '')) * 100 || 6800;
        openQuickView({
          handle: qvBtn.getAttribute('data-handle'),
          id: qvBtn.getAttribute('data-id') || '101',
          title: qvBtn.getAttribute('data-title') || 'Botanical Formulation',
          price: priceStr,
          priceNum: priceNum,
          image: qvBtn.getAttribute('data-image') || '',
          category: qvBtn.getAttribute('data-category') || 'Barrier Care',
          description: qvBtn.getAttribute('data-description') || '',
          url: qvBtn.getAttribute('data-url') || '/product'
        });
        return;
      }

      if (e.target.closest('[data-action="close-quick-view"]')) {
        closeQuickView();
        return;
      }

      // Variant pill click in quick view
      const pill = e.target.closest('#QuickViewVariantsPills .variant-mini-pill');
      if (pill) {
        document.querySelectorAll('#QuickViewVariantsPills .variant-mini-pill').forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        const pPrice = pill.getAttribute('data-price') || '$68.00';
        const qvPrice = document.getElementById('QuickViewPrice');
        if (qvPrice) qvPrice.textContent = pPrice;
        const qvBtnPrice = document.getElementById('QuickViewBtnPrice');
        if (qvBtnPrice) qvBtnPrice.textContent = pPrice;
      }

      // Quantity adjustments in Quick View
      if (e.target.closest('#QuickViewQtyMinus')) {
        const inp = document.getElementById('QuickViewQtyInput');
        if (inp && parseInt(inp.value, 10) > 1) inp.value = parseInt(inp.value, 10) - 1;
      }
      if (e.target.closest('#QuickViewQtyPlus')) {
        const inp = document.getElementById('QuickViewQtyInput');
        if (inp && parseInt(inp.value, 10) < 99) inp.value = parseInt(inp.value, 10) + 1;
      }

      // Add to Cart from Quick View
      if (e.target.closest('#QuickViewAddToCartBtn')) {
        if (!currentItem) return;
        const qty = parseInt(document.getElementById('QuickViewQtyInput')?.value, 10) || 1;
        closeQuickView();
        addProductToCart({
          id: currentItem.id,
          variantId: selectedVariantId || currentItem.id,
          title: currentItem.title,
          price: currentItem.price,
          priceNum: currentItem.priceNum,
          image: currentItem.image,
          url: currentItem.url,
          quantity: qty
        });
      }
    });
  }
`;
    code = code.replace("function initAgeVerifier() {", quickViewEngine + "\n  function initAgeVerifier() {");
  }

  // 5. Expand Wishlist & Product Comparison Engine
  if (!code.includes('function initCompare')) {
    const wishlistCompareEngine = `
  // --- 11. Full Wishlist Drawer Engine ---
  function initWishlistDrawer() {
    const drawer = document.getElementById('WishlistDrawer');
    if (!drawer) return;

    function getWishlistItems() {
      try {
        return JSON.parse(localStorage.getItem('aura_wishlist_items')) || [];
      } catch (e) {
        return [];
      }
    }

    function saveWishlistItems(items) {
      try {
        localStorage.setItem('aura_wishlist_items', JSON.stringify(items));
        // Keep handle array synced
        localStorage.setItem('aura_wishlist', JSON.stringify(items.map(i => i.handle)));
      } catch (e) {}
    }

    function updateWishlistUI() {
      const items = getWishlistItems();
      const count = items.length;
      const countBadges = document.querySelectorAll('#WishlistDrawerCount, #HeaderWishlistCount');
      countBadges.forEach(b => b.textContent = count);

      const emptyState = document.getElementById('WishlistDrawerEmpty');
      const list = document.getElementById('WishlistItemsList');
      const footer = document.getElementById('WishlistDrawerFooter');

      if (count === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (list) list.style.display = 'none';
        if (footer) footer.style.display = 'none';
      } else {
        if (emptyState) emptyState.style.display = 'none';
        if (footer) footer.style.display = 'block';
        if (list) {
          list.style.display = 'flex';
          list.innerHTML = items.map(item => \`
            <div class="wishlist-item-row" data-handle="\${item.handle}">
              <img src="\${item.image}" alt="\${item.title}" class="wishlist-thumb" width="60" height="72">
              <div class="wishlist-info">
                <h4 class="wishlist-title"><a href="\${item.url || '/product'}">\${item.title}</a></h4>
                <div class="wishlist-price">\${item.price}</div>
                <div class="wishlist-actions">
                  <button type="button" class="btn btn-secondary btn-sm" data-action="wishlist-to-cart" data-handle="\${item.handle}" data-id="\${item.id}" data-title="\${item.title}" data-price="\${item.price}" data-image="\${item.image}">+ Move to Bag</button>
                  <button type="button" class="wishlist-remove" data-action="remove-wishlist" data-handle="\${item.handle}">Remove</button>
                </div>
              </div>
            </div>
          \`).join('');
        }
      }

      // Sync heart button states on page
      const handles = items.map(i => i.handle);
      document.querySelectorAll('[data-action="toggle-wishlist"]').forEach(btn => {
        const h = btn.getAttribute('data-handle');
        if (handles.includes(h)) {
          btn.classList.add('is-saved');
          const svg = btn.querySelector('svg');
          if (svg) svg.style.fill = '#B37446';
        } else {
          btn.classList.remove('is-saved');
          const svg = btn.querySelector('svg');
          if (svg) svg.style.fill = 'none';
        }
      });
    }

    function openWishlist() {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      if (overlayBackdrop) overlayBackdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      updateWishlistUI();
    }

    function closeWishlist() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      if (!CART_STATE.isOpen && !searchModal?.classList.contains('is-open')) {
        if (overlayBackdrop) overlayBackdrop.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    }

    document.addEventListener('click', function(e) {
      if (e.target.closest('[data-action="open-wishlist"]')) {
        e.preventDefault();
        openWishlist();
        return;
      }
      if (e.target.closest('[data-action="close-wishlist"]')) {
        closeWishlist();
        return;
      }

      // Add/Remove toggle from cards
      const toggleBtn = e.target.closest('[data-action="toggle-wishlist"]');
      if (toggleBtn) {
        e.preventDefault();
        const handle = toggleBtn.getAttribute('data-handle');
        if (!handle) return;
        let items = getWishlistItems();
        const exists = items.some(i => i.handle === handle);
        if (exists) {
          items = items.filter(i => i.handle !== handle);
        } else {
          items.push({
            handle: handle,
            id: toggleBtn.getAttribute('data-id') || '101',
            title: toggleBtn.getAttribute('data-title') || 'Botanical Formulation',
            price: toggleBtn.getAttribute('data-price') || '$68.00',
            image: toggleBtn.getAttribute('data-image') || '',
            url: '/product'
          });
        }
        saveWishlistItems(items);
        updateWishlistUI();
        return;
      }

      // Move to Bag from inside Wishlist Drawer
      const moveToCart = e.target.closest('[data-action="wishlist-to-cart"]');
      if (moveToCart) {
        const handle = moveToCart.getAttribute('data-handle');
        const id = moveToCart.getAttribute('data-id') || '101';
        const title = moveToCart.getAttribute('data-title');
        const price = moveToCart.getAttribute('data-price');
        const image = moveToCart.getAttribute('data-image');
        closeWishlist();
        addProductToCart({ id, variantId: id, title, price, image });
        return;
      }

      // Remove from inside Wishlist Drawer
      const removeBtn = e.target.closest('[data-action="remove-wishlist"]');
      if (removeBtn) {
        const handle = removeBtn.getAttribute('data-handle');
        let items = getWishlistItems().filter(i => i.handle !== handle);
        saveWishlistItems(items);
        updateWishlistUI();
        return;
      }

      // Clear all
      if (e.target.closest('#ClearWishlistBtn')) {
        saveWishlistItems([]);
        updateWishlistUI();
        return;
      }
    });

    updateWishlistUI();
  }

  // --- 12. Product Comparison Engine ---
  function initCompare() {
    function getCompareItems() {
      try {
        return JSON.parse(localStorage.getItem('aura_compare_items')) || [];
      } catch(e) {
        return [];
      }
    }

    function saveCompareItems(items) {
      try {
        localStorage.setItem('aura_compare_items', JSON.stringify(items));
      } catch(e) {}
    }

    function updateCompareUI() {
      const items = getCompareItems();
      const count = items.length;
      const bar = document.getElementById('CompareFloatingBar');
      const countSpan = document.getElementById('CompareCount');
      if (countSpan) countSpan.textContent = count;

      if (!bar) return;
      if (count === 0) {
        bar.style.display = 'none';
      } else {
        bar.style.display = 'block';
        const thumbs = document.getElementById('CompareThumbsContainer');
        if (thumbs) {
          thumbs.innerHTML = items.map(item => \`
            <div class="compare-thumb-item" title="\${item.title}">
              <img src="\${item.image}" alt="\${item.title}">
              <button type="button" class="remove-compare-thumb" data-action="remove-compare" data-handle="\${item.handle}">&times;</button>
            </div>
          \`).join('');
        }
      }
    }

    function renderCompareModal() {
      const items = getCompareItems();
      const modal = document.getElementById('CompareModal');
      const thead = document.getElementById('CompareTableHead');
      const tbody = document.getElementById('CompareTableBody');
      if (!modal || !thead || !tbody) return;

      thead.innerHTML = '<th scope="col" style="min-width: 140px;">Clinical Specification</th>' +
        items.map(it => \`
          <th scope="col" style="text-align:center; min-width: 180px;">
            <img src="\${it.image}" alt="\${it.title}" style="width:70px;height:84px;object-fit:cover;border-radius:6px;margin:0 auto 8px;">
            <div style="font-family:var(--font-heading);font-size:1.05rem;margin-bottom:4px;">\${it.title}</div>
            <div style="color:var(--color-accent);font-weight:600;margin-bottom:8px;">\${it.price}</div>
            <button type="button" class="btn btn-secondary btn-sm" data-action="quick-add" data-id="\${it.id}" data-title="\${it.title}" data-price="\${it.price}" data-image="\${it.image}">+ Add to Bag</button>
          </th>
        \`).join('');

      tbody.innerHTML = \`
        <tr>
          <td><strong>Category / Type</strong></td>
          \${items.map(it => \`<td style="text-align:center;">\${it.category || 'Active Serum'}</td>\`).join('')}
        </tr>
        <tr>
          <td><strong>Primary Benefit</strong></td>
          \${items.map(it => \`<td style="text-align:center;">\${it.benefit || 'TEWL Barrier Repair'}</td>\`).join('')}
        </tr>
        <tr>
          <td><strong>Texture & Finish</strong></td>
          \${items.map(() => '<td style="text-align:center;">Fast-absorbing, non-comedogenic silk</td>').join('')}
        </tr>
        <tr>
          <td><strong>Skin Compatibility</strong></td>
          \${items.map(() => '<td style="text-align:center;">Hypersensitive, barrier-compromised skin</td>').join('')}
        </tr>
        <tr>
          <td><strong>Purity Standards</strong></td>
          \${items.map(() => '<td style="text-align:center;">100% Vegan, Cold-Pressed, Fragrance-Free</td>').join('')}
        </tr>
      \`;

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (overlayBackdrop) overlayBackdrop.classList.add('is-active');
    }

    document.addEventListener('click', function(e) {
      const toggle = e.target.closest('[data-action="toggle-compare"]');
      if (toggle) {
        e.preventDefault();
        const handle = toggle.getAttribute('data-handle');
        if (!handle) return;
        let items = getCompareItems();
        if (items.some(i => i.handle === handle)) {
          items = items.filter(i => i.handle !== handle);
        } else {
          if (items.length >= 4) {
            alert('You can compare a maximum of 4 formulations at a time.');
            return;
          }
          items.push({
            handle: handle,
            id: toggle.getAttribute('data-id') || '101',
            title: toggle.getAttribute('data-title') || 'Formulation',
            price: toggle.getAttribute('data-price') || '$68.00',
            image: toggle.getAttribute('data-image') || '',
            category: toggle.getAttribute('data-category') || 'Barrier Care',
            benefit: toggle.getAttribute('data-benefit') || 'Hydration Recovery'
          });
        }
        saveCompareItems(items);
        updateCompareUI();
        return;
      }

      if (e.target.closest('#OpenCompareModalBtn')) {
        renderCompareModal();
        return;
      }

      if (e.target.closest('[data-action="close-compare-modal"]')) {
        const modal = document.getElementById('CompareModal');
        if (modal) {
          modal.classList.remove('is-open');
          modal.setAttribute('aria-hidden', 'true');
        }
        if (!CART_STATE.isOpen && !searchModal?.classList.contains('is-open')) {
          if (overlayBackdrop) overlayBackdrop.classList.remove('is-active');
          document.body.style.overflow = '';
        }
        return;
      }

      const removeBtn = e.target.closest('[data-action="remove-compare"]');
      if (removeBtn) {
        const handle = removeBtn.getAttribute('data-handle');
        let items = getCompareItems().filter(i => i.handle !== handle);
        saveCompareItems(items);
        updateCompareUI();
        return;
      }

      if (e.target.closest('#ClearCompareBtn')) {
        saveCompareItems([]);
        updateCompareUI();
        return;
      }
    });

    updateCompareUI();
  }
`;
    code = code.replace("function initAgeVerifier() {", wishlistCompareEngine + "\n  function initAgeVerifier() {");
  }

  // 6. Hook into init()
  if (!code.includes('initQuickView();')) {
    code = code.replace("initAgeVerifier();", "initAgeVerifier();\n    initQuickView();\n    initWishlistDrawer();\n    initCompare();");
  }

  fs.writeFileSync(file, code, 'utf8');
  console.log('Successfully enhanced:', file);
});

