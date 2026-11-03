/**
 * AURA BOTANICA — MODERN LUXURY BOTANICAL SKINCARE
 * Shopify OS 2.0 Theme Engine: Product, Discovery, Cart & Checkout
 */

(function () {
  'use strict';

  // --- Global Routes & Configuration ---
  const routes = (window.ShopifyTheme && window.ShopifyTheme.routes) || {
    cart_url: '/cart',
    cart_add_url: '/cart/add.js',
    cart_change_url: '/cart/change.js',
    cart_update_url: '/cart/update.js',
    predictive_search_url: '/search/suggest.json',
    product_recommendations_url: '/recommendations/products'
  };

  
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

  const CART_STATE = {
    items: [],
    itemCount: 0,
    totalPrice: 0,
    note: '',
    freeShippingThreshold: 6500, // in cents ($65.00)
    isOpen: false
  };

  // Helper: Format Money
  function formatMoney(cents) {
    if (typeof cents !== 'number') cents = parseInt(cents, 10) || 0;
    return '$' + (cents / 100).toFixed(2);
  }

  // Helper: Live Region Screen-Reader Announcement
  function announceToScreenReader(message) {
    const liveRegion = document.getElementById('CartDrawerLiveStatus');
    if (liveRegion) {
      liveRegion.textContent = '';
      setTimeout(() => {
        liveRegion.textContent = message;
      }, 50);
    }
  }

  // --- DOM Elements ---
  const cartDrawer = document.getElementById('CartDrawer');
  const overlayBackdrop = document.getElementById('OverlayBackdrop');
  const cartToggleBtn = document.getElementById('CartToggle');
  const headerCartCount = document.getElementById('HeaderCartCount');
  const cartDrawerCount = document.getElementById('CartDrawerCount');
  const cartDrawerEmpty = document.getElementById('CartDrawerEmpty');
  const cartItemsList = document.getElementById('CartItemsList');
  const cartDrawerFooter = document.getElementById('CartDrawerFooter');
  const cartSubtotal = document.getElementById('CartSubtotal');
  const checkoutTotal = document.getElementById('CheckoutTotal');
  const shippingBarMsg = document.getElementById('ShippingBarMessage');
  const shippingFill = document.getElementById('ShippingProgressFill');
  const cartDrawerNote = document.getElementById('CartDrawerNote');
  const cartNoteSaveHint = document.getElementById('CartNoteSaveHint');

  // Mobile Navigation
  const mobileNav = document.getElementById('MobileNav');
  const mobileMenuToggle = document.getElementById('MobileMenuToggle');
  const mobileNavClose = document.getElementById('MobileNavClose');

  // Search Modal & Predictive Search
  const searchModal = document.getElementById('SearchModal');
  const searchInput = document.getElementById('SearchInput');
  const searchResults = document.getElementById('SearchResults');
  const searchModalClose = document.getElementById('SearchModalClose');
  const searchToggle = document.getElementById('SearchToggle');

  // Collection Filters Drawer (Mobile)
  const filterDrawer = document.getElementById('CollectionFilterDrawer');
  const filterDrawerToggleBtn = document.getElementById('FilterDrawerToggleBtn');
  const filterDrawerCloseBtn = document.getElementById('FilterDrawerCloseBtn');

  // --- Cart Drawer Controls ---
  function openCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    if (cartToggleBtn) cartToggleBtn.setAttribute('aria-expanded', 'true');
    if (overlayBackdrop) overlayBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    CART_STATE.isOpen = true;
  }

  function closeCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    if (cartToggleBtn) cartToggleBtn.setAttribute('aria-expanded', 'false');
    if (!searchModal?.classList.contains('is-open') && !filterDrawer?.classList.contains('is-open')) {
      if (overlayBackdrop) overlayBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
    CART_STATE.isOpen = false;
  }

  // --- Search Modal Controls ---
  function openSearchModal() {
    if (!searchModal) return;
    searchModal.classList.add('is-open');
    searchModal.setAttribute('aria-hidden', 'false');
    if (searchToggle) searchToggle.setAttribute('aria-expanded', 'true');
    if (overlayBackdrop) overlayBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { if (searchInput) searchInput.focus(); }, 120);
  }

  function closeSearchModal() {
    if (!searchModal) return;
    searchModal.classList.remove('is-open');
    searchModal.setAttribute('aria-hidden', 'true');
    if (searchToggle) searchToggle.setAttribute('aria-expanded', 'false');
    if (!CART_STATE.isOpen && !filterDrawer?.classList.contains('is-open')) {
      if (overlayBackdrop) overlayBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  // --- Mobile Navigation Controls ---
  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('is-open');
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
    if (overlayBackdrop) overlayBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
    if (!CART_STATE.isOpen && !searchModal?.classList.contains('is-open') && !filterDrawer?.classList.contains('is-open')) {
      if (overlayBackdrop) overlayBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  // --- Mobile Collection Filter Drawer Controls ---
  function openFilterDrawer() {
    if (!filterDrawer) return;
    filterDrawer.classList.add('is-open');
    if (filterDrawerToggleBtn) filterDrawerToggleBtn.setAttribute('aria-expanded', 'true');
    if (overlayBackdrop) overlayBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeFilterDrawer() {
    if (!filterDrawer) return;
    filterDrawer.classList.remove('is-open');
    if (filterDrawerToggleBtn) filterDrawerToggleBtn.setAttribute('aria-expanded', 'false');
    if (!CART_STATE.isOpen && !searchModal?.classList.contains('is-open')) {
      if (overlayBackdrop) overlayBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  // --- Cart UI Rendering & Calculations ---
  function updateCartUI() {
    const totalCount = CART_STATE.itemCount;
    const subtotal = CART_STATE.totalPrice;

    if (headerCartCount) headerCartCount.textContent = totalCount;
    if (cartDrawerCount) cartDrawerCount.textContent = totalCount;

    // Cart Page Updates
    const mainCartCountMsg = document.getElementById('MainCartCountMessage');
    if (mainCartCountMsg) mainCartCountMsg.textContent = `${totalCount} items in your bag`;
    const cartPageSubtotal = document.getElementById('CartPageSubtotal');
    if (cartPageSubtotal) cartPageSubtotal.textContent = formatMoney(subtotal);

    // Empty State vs Populated State
    if (totalCount === 0 || CART_STATE.items.length === 0) {
      if (cartDrawerEmpty) cartDrawerEmpty.style.display = 'block';
      if (cartItemsList) cartItemsList.innerHTML = '';
      if (cartDrawerFooter) cartDrawerFooter.style.display = 'none';
      if (shippingFill) shippingFill.style.width = '0%';
      if (shippingBarMsg) {
        shippingBarMsg.innerHTML = `Spend <strong>$65.00</strong> to unlock <strong>Complimentary Express Delivery & Samples</strong>`;
      }
      return;
    }

    if (cartDrawerEmpty) cartDrawerEmpty.style.display = 'none';
    if (cartDrawerFooter) cartDrawerFooter.style.display = 'block';

    const formattedSubtotal = formatMoney(subtotal);
    if (cartSubtotal) cartSubtotal.textContent = formattedSubtotal;
    if (checkoutTotal) checkoutTotal.textContent = formattedSubtotal;

    // Free Shipping Progress
    const threshold = CART_STATE.freeShippingThreshold;
    const remaining = threshold - subtotal;
    const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

    if (shippingFill) shippingFill.style.width = `${progressPercent}%`;

    if (remaining <= 0) {
      if (shippingBarMsg) {
        shippingBarMsg.innerHTML = '🌿 <strong>Complimentary Express Delivery & Botanical Gift Unlocked!</strong>';
      }
    } else {
      if (shippingBarMsg) {
        shippingBarMsg.innerHTML = `Add <strong>${formatMoney(remaining)}</strong> more to unlock <strong>Complimentary Shipping & Samples</strong>`;
      }
    }

    // Render Drawer Line Items
    if (cartItemsList) {
      cartItemsList.innerHTML = CART_STATE.items.map(item => `
        <div class="cart-item-row" data-id="${item.id}" data-key="${item.key || item.id}">
          <img src="${item.image || ''}" alt="${item.title || 'Product'}" class="cart-item__thumb" width="70" height="85" loading="lazy">
          <div class="cart-item__info">
            <h4 class="cart-item__title"><a href="${item.url || '/product'}">${item.title}</a></h4>
            ${item.variant_title ? `<p style="font-size: 0.75rem; color: var(--color-text-light); margin-bottom: 4px;">${item.variant_title}</p>` : ''}
            <div class="cart-item__price">${formatMoney(item.price)}</div>
            <div class="cart-item__qty">
              <button type="button" class="cart-qty-btn" data-action="cart-minus" data-id="${item.key || item.id}" aria-label="Decrease quantity">-</button>
              <input type="number" class="cart-qty-input" value="${item.quantity}" min="0" max="99" data-action="cart-input" data-id="${item.key || item.id}" aria-label="Item quantity">
              <button type="button" class="cart-qty-btn" data-action="cart-plus" data-id="${item.key || item.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div>
            <button type="button" class="cart-item__remove" data-action="cart-remove" data-id="${item.key || item.id}" aria-label="Remove item">Remove</button>
          </div>
        </div>
      `).join('');
    }

    // Populate Note if available
    if (cartDrawerNote && CART_STATE.note) {
      cartDrawerNote.value = CART_STATE.note;
    }
  }

  // --- Real Shopify Cart AJAX Integration ---
  async function fetchShopifyCart() {
    try {
      const response = await fetch('/cart.js', {
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('Not in live Shopify environment');
      const cart = await response.json();
      CART_STATE.itemCount = cart.item_count;
      CART_STATE.totalPrice = cart.total_price;
      CART_STATE.note = cart.note || '';
      CART_STATE.items = cart.items.map(item => ({
        id: item.id,
        key: item.key,
        title: item.product_title,
        variant_title: item.variant_title,
        price: item.final_price,
        quantity: item.quantity,
        image: item.image,
        url: item.url
      }));
      updateCartUI();
        saveCartToStorage();
        return true;
    } catch (e) {
      return false;
    }
  }

  async function addProductToCart(itemData) {
    try {
      const payload = {
        id: itemData.variantId || itemData.id,
        quantity: itemData.quantity || 1
      };
      if (itemData.sellingPlanId) {
        payload.selling_plan = itemData.sellingPlanId;
      }

      const response = await fetch(routes.cart_add_url || '/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await fetchShopifyCart();
        announceToScreenReader(`Added ${itemData.title} to your bag`);
        openCart();
        return;
      }
    } catch (err) {}

    // Fallback in-memory preview state
    const existing = CART_STATE.items.find(i => String(i.id) === String(itemData.id));
    const priceNum = itemData.priceNum || (typeof itemData.price === 'string' ? parseFloat(itemData.price.replace(/[^0-9.]/g, '')) * 100 : itemData.price) || 6800;

    if (existing) {
      existing.quantity += (itemData.quantity || 1);
    } else {
      CART_STATE.items.push({
        id: itemData.id,
        key: itemData.id,
        title: itemData.title,
        price: priceNum,
        image: itemData.image,
        url: itemData.url || '/product',
        quantity: itemData.quantity || 1
      });
    }

    CART_STATE.itemCount = CART_STATE.items.reduce((s, i) => s + i.quantity, 0);
    CART_STATE.totalPrice = CART_STATE.items.reduce((s, i) => s + (i.price * i.quantity), 0);
    announceToScreenReader(`Added ${itemData.title} to your bag`);
    updateCartUI();
    saveCartToStorage();
    openCart();
  }

  async function updateCartItemQuantity(key, newQty) {
    try {
      const response = await fetch(routes.cart_change_url || '/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ id: key, quantity: newQty })
      });
      if (response.ok) {
        await fetchShopifyCart();
        announceToScreenReader('Cart updated successfully');
        return;
      }
    } catch (err) {}

    // Fallback
    const item = CART_STATE.items.find(i => String(i.key) === String(key) || String(i.id) === String(key));
    if (item) {
      if (newQty <= 0) {
        CART_STATE.items = CART_STATE.items.filter(i => String(i.key) !== String(key) && String(i.id) !== String(key));
      } else {
        item.quantity = newQty;
      }
      CART_STATE.itemCount = CART_STATE.items.reduce((s, i) => s + i.quantity, 0);
      CART_STATE.totalPrice = CART_STATE.items.reduce((s, i) => s + (i.price * i.quantity), 0);
      announceToScreenReader('Cart updated successfully');
      updateCartUI();
    }
  }

  // Save Cart Note via AJAX
  let noteDebounceTimer;
  async function saveCartNote(noteText) {
    clearTimeout(noteDebounceTimer);
    noteDebounceTimer = setTimeout(async () => {
      try {
        await fetch(routes.cart_update_url || '/cart/update.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ note: noteText })
        });
      } catch (e) {}

      CART_STATE.note = noteText;
      if (cartNoteSaveHint) {
        cartNoteSaveHint.style.opacity = '1';
        setTimeout(() => { cartNoteSaveHint.style.opacity = '0'; }, 2000);
      }
    }, 600);
  }

  // --- Product Page Variant Selector Engine ---
  function initProductVariantEngine() {
    const productScript = document.querySelector('script[id^="ProductJson-"]');
    if (!productScript) return;

    let productData;
    try {
      productData = JSON.parse(productScript.textContent);
    } catch (e) {
      return;
    }

    if (!productData || !productData.variants) return;

    function getSelectedOptions() {
      const selected = [];
      // 1. Check size selector pills
      document.querySelectorAll('.option-group').forEach((group, index) => {
        const activePill = group.querySelector('.size-pill.is-active');
        if (activePill) {
          selected[index] = activePill.getAttribute('data-value');
        } else {
          const select = group.querySelector('.option-select');
          if (select) selected[index] = select.value;
        }
      });
      return selected;
    }

    function onVariantChange() {
      const selectedOptions = getSelectedOptions();
      const matchedVariant = productData.variants.find(variant => {
        return variant.options.every((opt, idx) => opt === selectedOptions[idx]);
      });

      if (!matchedVariant) return;

      // 1. Update Variant ID input
      const variantIdInput = document.getElementById('ProductVariantId');
      if (variantIdInput) variantIdInput.value = matchedVariant.id;

      // 2. Update Prices
      const currentPriceElem = document.getElementById('ProductCurrentPrice');
      const comparePriceElem = document.getElementById('ProductComparePrice');
      const addToCartPrice = document.getElementById('AddToCartPrice');
      const oneTimePriceDisplay = document.getElementById('OneTimePriceDisplay');
      const saleBadge = document.getElementById('ProductSaleBadge');

      const formattedPrice = formatMoney(matchedVariant.price);
      if (currentPriceElem) currentPriceElem.textContent = formattedPrice;
      if (addToCartPrice) addToCartPrice.textContent = formattedPrice;
      if (oneTimePriceDisplay) oneTimePriceDisplay.textContent = formattedPrice;

      if (matchedVariant.compare_at_price && matchedVariant.compare_at_price > matchedVariant.price) {
        if (comparePriceElem) {
          comparePriceElem.textContent = formatMoney(matchedVariant.compare_at_price);
          comparePriceElem.classList.remove('is-hidden');
        }
        if (saleBadge) {
          const savings = matchedVariant.compare_at_price - matchedVariant.price;
          saleBadge.textContent = `Save ${formatMoney(savings)}`;
          saleBadge.style.display = 'inline-block';
        }
      } else {
        if (comparePriceElem) comparePriceElem.classList.add('is-hidden');
        if (saleBadge) saleBadge.style.display = 'none';
      }

      // 3. Update Availability & Stock Badge
      const addBtn = document.getElementById('ProductAddToCartBtn');
      const addText = document.getElementById('AddToCartText');
      const availabilityElem = document.getElementById('ProductAvailability');

      if (matchedVariant.available) {
        if (addBtn) addBtn.removeAttribute('disabled');
        if (addText) addText.innerHTML = `Add to Bag • <span id="AddToCartPrice">${formattedPrice}</span>`;
        if (availabilityElem) {
          availabilityElem.innerHTML = `<span class="stock-badge stock-badge--available"><span class="stock-dot"></span> In Stock • Ready for Immediate Botanical Dispatch</span>`;
        }
      } else {
        if (addBtn) addBtn.setAttribute('disabled', 'disabled');
        if (addText) addText.textContent = 'Sold Out';
        if (availabilityElem) {
          availabilityElem.innerHTML = `<span class="stock-badge stock-badge--soldout"><span class="stock-dot stock-dot--soldout"></span> Batch Retired / Sold Out</span>`;
        }
      }

      // 4. Update SKU
      const skuElem = document.getElementById('ProductSku');
      if (skuElem && matchedVariant.sku) {
        skuElem.textContent = `SKU: ${matchedVariant.sku}`;
      }

      // 5. Update Featured Media if variant has image
      if (matchedVariant.featured_media || matchedVariant.featured_image) {
        const mediaSrc = (matchedVariant.featured_media && matchedVariant.featured_media.src) || (matchedVariant.featured_image && matchedVariant.featured_image.src);
        const mainGalleryImg = document.querySelector('#ProductGalleryMain img');
        if (mainGalleryImg && mediaSrc) {
          mainGalleryImg.src = mediaSrc;
        }
      }

      // 6. Update URL parameter (?variant=12345)
      if (window.history && window.history.replaceState) {
        const url = new URL(window.location);
        url.searchParams.set('variant', matchedVariant.id);
        window.history.replaceState({}, '', url);
      }
    }

    // Bind Option Pill Clicks
    document.addEventListener('click', function (e) {
      const pill = e.target.closest('.size-pill');
      if (!pill) return;
      const group = pill.closest('.option-group');
      if (!group) return;

      group.querySelectorAll('.size-pill').forEach(p => {
        p.classList.remove('is-active');
        p.setAttribute('aria-checked', 'false');
      });
      pill.classList.add('is-active');
      pill.setAttribute('aria-checked', 'true');

      const optIdx = group.getAttribute('data-option-index');
      const selectedValLabel = document.getElementById(`SelectedVal-${optIdx}`);
      if (selectedValLabel) selectedValLabel.textContent = pill.getAttribute('data-value');

      onVariantChange();
    });

    // Bind Dropdown Select Changes
    document.querySelectorAll('.option-select').forEach(select => {
      select.addEventListener('change', () => {
        const optIdx = select.getAttribute('data-option-index');
        const selectedValLabel = document.getElementById(`SelectedVal-${optIdx}`);
        if (selectedValLabel) selectedValLabel.textContent = select.value;
        onVariantChange();
      });
    });

    // Selling Plans Radio Switcher
    const purchaseOptions = document.querySelectorAll('input[name="purchase_option"]');
    const sellingPlanInput = document.getElementById('ProductSellingPlanId');
    const sellingPlanSelectWrap = document.getElementById('SellingPlanSelectWrap');
    const sellingPlanSelect = document.getElementById('SellingPlanSelect');

    purchaseOptions.forEach(radio => {
      radio.addEventListener('change', () => {
        document.querySelectorAll('.selling-plan-option').forEach(l => l.classList.remove('is-selected'));
        const parentLabel = radio.closest('.selling-plan-option');
        if (parentLabel) parentLabel.classList.add('is-selected');

        if (radio.value === 'subscription') {
          if (sellingPlanSelectWrap) sellingPlanSelectWrap.style.display = 'block';
          if (sellingPlanInput && sellingPlanSelect) sellingPlanInput.value = sellingPlanSelect.value;
        } else {
          if (sellingPlanSelectWrap) sellingPlanSelectWrap.style.display = 'none';
          if (sellingPlanInput) sellingPlanInput.value = '';
        }
      });
    });

    if (sellingPlanSelect) {
      sellingPlanSelect.addEventListener('change', () => {
        if (sellingPlanInput) sellingPlanInput.value = sellingPlanSelect.value;
      });
    }
  }

  // --- Predictive Search Engine ---
  let searchDebounceTimer;
  async function executePredictiveSearch(query) {
    if (!searchResults) return;
    const cleanQ = query.trim();

    if (!cleanQ) {
      searchResults.innerHTML = `
        <div class="search-modal__empty-state">
          <span class="search-hint-title">Popular Skincare Inquiries:</span>
          <div class="search-pills">
            <button type="button" class="search-pill" onclick="window.triggerSearchKeyword('Serum')">Bio-Ferment Serum</button>
            <button type="button" class="search-pill" onclick="window.triggerSearchKeyword('Cream')">Cloud Cream</button>
            <button type="button" class="search-pill" onclick="window.triggerSearchKeyword('Balm')">Camellia Balm</button>
            <button type="button" class="search-pill" onclick="window.triggerSearchKeyword('Niacinamide')">Niacinamide</button>
          </div>
        </div>
      `;
      return;
    }

    // Try Shopify Predictive Search API
    try {
      const apiUrl = `${routes.predictive_search_url}?q=${encodeURIComponent(cleanQ)}&resources[type]=product&resources[limit]=5`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const json = await response.json();
        const products = (json.resources?.results?.products) || [];
        if (products.length > 0) {
          searchResults.innerHTML = products.map(p => `
            <div class="search-result-row">
              <img src="${p.image}" alt="${p.title}" class="search-result-thumb" width="56" height="56">
              <div class="search-result-info">
                <h4 class="search-result-title"><a href="${p.url}">${p.title}</a></h4>
                <span class="search-result-cat">${p.type || 'Skin Formulation'}</span>
              </div>
              <div class="search-result-action">
                <span class="search-result-price">${p.price}</span>
                <a href="${p.url}" class="button button--secondary" style="padding: 6px 14px; font-size: 0.78rem;">Explore</a>
              </div>
            </div>
          `).join('');
          return;
        }
      }
    } catch (e) {}

    // Fallback Client Catalog Search
    const fallbackMatches = [
      {
        id: '101',
        title: 'Bio-Ferment Barrier Glow Serum',
        type: 'Active Serum',
        price: '$68.00',
        url: '/product',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=120&q=80'
      },
      {
        id: '102',
        title: 'Deep Lipid Moisture Cloud Cream',
        type: 'Barrier Cream',
        price: '$74.00',
        url: '/product',
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=120&q=80'
      },
      {
        id: '103',
        title: 'Gentle Camellia Cleansing Balm',
        type: 'Melt Cleanser',
        price: '$46.00',
        url: '/product',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=120&q=80'
      },
      {
        id: '104',
        title: 'Golden Bakuchiol Midnight Nectar',
        type: 'Cellular Oil',
        price: '$78.00',
        url: '/product',
        image: 'https://images.unsplash.com/photo-1608248597359-28c04ec4dc13?auto=format&fit=crop&w=120&q=80'
      }
    ].filter(p => p.title.toLowerCase().includes(cleanQ.toLowerCase()) || p.type.toLowerCase().includes(cleanQ.toLowerCase()));

    if (fallbackMatches.length === 0) {
      searchResults.innerHTML = `
        <div style="text-align: center; padding: 36px 16px; color: var(--color-text-secondary);">
          <p style="font-size: 1.05rem; margin-bottom: 6px;">No botanical formulas found for "<strong>${cleanQ}</strong>"</p>
          <p style="font-size: 0.85rem;">Try searching for <em>serum, ceramides, cream, or balm</em>.</p>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = fallbackMatches.map(p => `
      <div class="search-result-row">
        <img src="${p.image}" alt="${p.title}" class="search-result-thumb" width="56" height="56">
        <div class="search-result-info">
          <h4 class="search-result-title"><a href="${p.url}">${p.title}</a></h4>
          <span class="search-result-cat">${p.type}</span>
        </div>
        <div class="search-result-action">
          <span class="search-result-price">${p.price}</span>
          <a href="${p.url}" class="button button--secondary" style="padding: 6px 14px; font-size: 0.78rem;">Explore</a>
        </div>
      </div>
    `).join('');
  }

  window.triggerSearchKeyword = function (kw) {
    if (searchInput) {
      searchInput.value = kw;
      executePredictiveSearch(kw);
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => executePredictiveSearch(e.target.value), 220);
    });
  }

  // --- Global Event Delegator ---
  document.addEventListener('click', function (e) {
    // Cart open / close
    if (e.target.closest('#CartToggle') || e.target.closest('[data-action="open-cart"]')) {
      e.preventDefault();
      openCart();
      return;
    }

    if (e.target.closest('[data-action="close-cart"]') || e.target.closest('.cart-drawer__close')) {
      e.preventDefault();
      closeCart();
      return;
    }

    // Search open / close
    if (e.target.closest('#SearchToggle') || e.target.closest('[data-action="open-search"]')) {
      e.preventDefault();
      openSearchModal();
      return;
    }

    if (e.target.closest('#SearchModalClose') || e.target.closest('[data-action="close-search"]')) {
      e.preventDefault();
      closeSearchModal();
      return;
    }

    // Mobile nav open / close
    if (e.target.closest('#MobileMenuToggle')) {
      e.preventDefault();
      openMobileNav();
      return;
    }

    if (e.target.closest('#MobileNavClose') || e.target.closest('[data-action="close-mobile-nav"]')) {
      e.preventDefault();
      closeMobileNav();
      return;
    }

    // Collection Filter Drawer open / close
    if (e.target.closest('#FilterDrawerToggleBtn')) {
      e.preventDefault();
      openFilterDrawer();
      return;
    }

    if (e.target.closest('#FilterDrawerCloseBtn')) {
      e.preventDefault();
      closeFilterDrawer();
      return;
    }

    // Backdrop click closes all modals
    if (e.target.id === 'OverlayBackdrop' || e.target.getAttribute('data-action') === 'close-all') {
      closeCart();
      closeSearchModal();
      closeMobileNav();
      closeFilterDrawer();
      return;
    }

    // Quick Add Button
    const quickAddBtn = e.target.closest('[data-action="quick-add"]');
    if (quickAddBtn) {
      e.preventDefault();
      const id = quickAddBtn.getAttribute('data-id') || '101';
      const title = quickAddBtn.getAttribute('data-title') || 'Botanical Formula';
      const price = quickAddBtn.getAttribute('data-price') || '$68.00';
      const image = quickAddBtn.getAttribute('data-image') || '';
      const variantId = quickAddBtn.getAttribute('data-variant-id') || id;

      addProductToCart({
        id,
        variantId,
        title,
        price,
        image,
        quantity: 1
      });
      return;
    }

    // Cart Quantity Increment / Decrement / Remove
    const cartMinus = e.target.closest('[data-action="cart-minus"]');
    if (cartMinus) {
      const key = cartMinus.getAttribute('data-id');
      const item = CART_STATE.items.find(i => String(i.key) === String(key) || String(i.id) === String(key));
      if (item) updateCartItemQuantity(key, item.quantity - 1);
      return;
    }

    const cartPlus = e.target.closest('[data-action="cart-plus"]');
    if (cartPlus) {
      const key = cartPlus.getAttribute('data-id');
      const item = CART_STATE.items.find(i => String(i.key) === String(key) || String(i.id) === String(key));
      if (item) updateCartItemQuantity(key, item.quantity + 1);
      return;
    }

    const cartRemove = e.target.closest('[data-action="cart-remove"]');
    if (cartRemove) {
      const key = cartRemove.getAttribute('data-id');
      updateCartItemQuantity(key, 0);
      return;
    }

    // Product Gallery Thumbnail Click
    const thumbBtn = e.target.closest('.thumbnail-btn');
    if (thumbBtn) {
      document.querySelectorAll('.thumbnail-btn').forEach(b => b.classList.remove('is-active'));
      thumbBtn.classList.add('is-active');
      const newSrc = thumbBtn.getAttribute('data-src');
      const mainImg = document.querySelector('#ProductGalleryMain img');
      if (mainImg && newSrc) {
        mainImg.style.opacity = '0.7';
        mainImg.src = newSrc;
        setTimeout(() => { mainImg.style.opacity = '1'; }, 100);
      }
      return;
    }

    // Product Quantity Buttons on Product Page
    const qtyBtn = e.target.closest('.qty-btn');
    if (qtyBtn) {
      const input = document.getElementById('ProductQuantity');
      if (!input) return;
      let val = parseInt(input.value, 10) || 1;
      const action = qtyBtn.getAttribute('data-action');
      if (action === 'increase') {
        val = Math.min(10, val + 1);
      } else if (action === 'decrease') {
        val = Math.max(1, val - 1);
      }
      input.value = val;
      return;
    }
  });

  // Direct Quantity Input Listener (in drawer or cart table)
  document.addEventListener('change', function (e) {
    if (e.target.getAttribute('data-action') === 'cart-input') {
      const key = e.target.getAttribute('data-id');
      const newQty = parseInt(e.target.value, 10) || 0;
      updateCartItemQuantity(key, newQty);
    }
  });

  // Cart Note Input Listener (Drawer & Full Page)
  if (cartDrawerNote) {
    cartDrawerNote.addEventListener('input', (e) => saveCartNote(e.target.value));
  }
  const cartPageNote = document.getElementById('CartPageNote');
  if (cartPageNote) {
    cartPageNote.addEventListener('input', (e) => saveCartNote(e.target.value));
  }

  // --- Product Form Submission ---
  const productForm = document.getElementById('product-form') || document.querySelector('form[action*="/cart/add"]');
  if (productForm) {
    productForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const variantIdInput = productForm.querySelector('[name="id"]');
      const qtyInput = productForm.querySelector('[name="quantity"]');
      const sellingPlanInput = document.getElementById('ProductSellingPlanId');

      const variantId = variantIdInput ? variantIdInput.value : '101';
      const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
      const sellingPlanId = sellingPlanInput ? sellingPlanInput.value : null;

      const mainAddToCartBtn = document.getElementById('ProductAddToCartBtn');
      const originalText = mainAddToCartBtn ? mainAddToCartBtn.innerHTML : '';
      if (mainAddToCartBtn) {
        mainAddToCartBtn.disabled = true;
        mainAddToCartBtn.innerHTML = '<span>Infusing Ritual Bag...</span>';
      }

      await addProductToCart({
        id: variantId,
        variantId: variantId,
        sellingPlanId: sellingPlanId,
        title: document.querySelector('.product-title')?.textContent?.trim() || 'Botanical Formula',
        price: document.getElementById('ProductCurrentPrice')?.textContent?.trim() || '$68.00',
        image: document.querySelector('#ProductGalleryMain img')?.src || '',
        quantity: quantity
      });

      if (mainAddToCartBtn) {
        mainAddToCartBtn.disabled = false;
        mainAddToCartBtn.innerHTML = originalText;
      }
    });
  }

  // Keyboard Escape Handler
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeCart();
      closeSearchModal();
      closeMobileNav();
      closeFilterDrawer();
    }
  });

  // Sticky Header Elevation
  window.addEventListener('scroll', function () {
    const header = document.getElementById('SiteHeader');
    if (!header) return;
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

  // Initialize Page Modules
  (async function init() {
    initProductVariantEngine();

    const loaded = await fetchShopifyCart();
    if (!loaded) {
      // In local preview/dev server mode, hydrate 1 demo item
      CART_STATE.items = [
        {
          id: '101',
          key: '101',
          title: 'Bio-Ferment Barrier Glow Serum',
          price: 6800,
          image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
          quantity: 1
        }
      ];
      CART_STATE.itemCount = 1;
      CART_STATE.totalPrice = 6800;
      updateCartUI();
    }
  })();

})();
