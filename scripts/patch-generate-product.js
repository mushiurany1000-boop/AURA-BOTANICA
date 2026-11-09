const fs = require('fs');
const path = require('path');

const productScriptPath = path.join(__dirname, '..', 'scripts', 'generate-preview-product.js');
let content = fs.readFileSync(productScriptPath, 'utf8');

// Replace alerts with real functional triggers
content = content.replace(
  'onclick="alert(\'SilkSkin Serum added to Cart!\')"',
  'onclick="addToCartFromProductPage()"'
);
content = content.replace(
  'onclick="alert(\'Proceeding to instant checkout...\')"',
  'onclick="window.location.href=\'/checkout\'"'
);
content = content.replace(
  'onclick="alert(\'Added to wishlist ♡\')"',
  'onclick="toggleWishlist(this)"'
);

// Header cart icon trigger
content = content.replace(
  /href="\/cart"/g,
  'href="javascript:void(0)" onclick="openCartDrawer()"'
);

// Volume pills with price updates
const oldVolumePills = `<div class="volume-pills-row">
          <div class="volume-pill active" onclick="document.querySelectorAll('.volume-pill').forEach(el=>el.classList.remove('active'));this.classList.add('active');">30 ml</div>
          <div class="volume-pill" onclick="document.querySelectorAll('.volume-pill').forEach(el=>el.classList.remove('active'));this.classList.add('active');">60ml</div>
          <div class="volume-pill" onclick="document.querySelectorAll('.volume-pill').forEach(el=>el.classList.remove('active'));this.classList.add('active');">80ml</div>
          <div class="volume-pill" onclick="document.querySelectorAll('.volume-pill').forEach(el=>el.classList.remove('active'));this.classList.add('active');">100ml</div>
        </div>`;

const newVolumePills = `<div class="volume-pills-row">
          <div class="volume-pill active" onclick="selectVolume(this, '30 ml', 48.00, 60.00)">30 ml</div>
          <div class="volume-pill" onclick="selectVolume(this, '60 ml', 82.00, 105.00)">60 ml</div>
          <div class="volume-pill" onclick="selectVolume(this, '80 ml', 105.00, 135.00)">80 ml</div>
          <div class="volume-pill" onclick="selectVolume(this, '100 ml', 128.00, 160.00)">100 ml</div>
        </div>`;

content = content.replace(oldVolumePills, newVolumePills);

// Add Cart Drawer & Floating Switcher before </body>
const cartDrawerProductHtml = [
  '    <!-- INTERACTIVE CART DRAWER -->',
  '    <div class="cart-drawer-overlay" id="cartDrawerOverlay" onclick="closeCartDrawer()" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:9998;opacity:0;pointer-events:none;transition:opacity 0.3s ease;"></div>',
  '    <div class="cart-drawer-pane" id="cartDrawerPane" style="position:fixed;top:0;right:0;width:100%;max-width:440px;height:100vh;background:#FFFFFF;color:#1A1A1A;z-index:9999;transform:translateX(100%);transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);display:flex;flex-direction:column;box-shadow:-12px 0 40px rgba(0,0,0,0.25);border-left:1px solid #E5E5E5;">',
  '      <div style="padding:20px 24px;border-bottom:1px solid #EEEEEE;display:flex;align-items:center;justify-content:space-between;">',
  '        <h3 style="font-family:\'Poppins\',sans-serif;font-size:18px;font-weight:700;margin:0;letter-spacing:0.5px;text-transform:uppercase;color:#1A1A1A;">YOUR CART (<span id="cartDrawerCount">1</span>)</h3>',
  '        <button onclick="closeCartDrawer()" style="background:transparent;border:none;color:#666666;font-size:26px;cursor:pointer;padding:4px;line-height:1;">&times;</button>',
  '      </div>',
  '      <div style="background:#F4F8F5;padding:14px 24px;border-bottom:1px solid #E5E5E5;">',
  '        <div id="shippingNoticeText" style="font-size:12px;letter-spacing:0.02em;color:#1B3B2B;margin-bottom:6px;text-align:center;font-weight:600;">✦ Only $27.00 away from Free Express Delivery!</div>',
  '        <div style="height:6px;background:#E0ECE3;border-radius:9999px;overflow:hidden;">',
  '          <div id="shippingProgressBar" style="height:100%;width:64%;background:linear-gradient(90deg,#2D5A40,#1B3B2B);border-radius:9999px;transition:width 0.3s ease;"></div>',
  '        </div>',
  '      </div>',
  '      <div style="flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:20px;" id="cartItemsContainer">',
  '        <div style="display:flex;gap:16px;padding-bottom:20px;border-bottom:1px solid #EEEEEE;">',
  '          <div style="width:76px;height:76px;border-radius:6px;background:#F9F9F9;border:1px solid #EEEEEE;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;">',
  '            <svg viewBox="0 0 100 100" width="56" height="56" fill="none"><rect width="100" height="100" fill="#F4F8F5"/><rect x="35" y="30" width="30" height="48" rx="4" fill="#FFFFFF" stroke="#CCDCD1"/><rect x="44" y="16" width="12" height="14" rx="2" fill="#BA934E"/><text x="50" y="58" font-family="\'Poppins\', sans-serif" font-size="9" font-weight="700" fill="#1B3B2B" text-anchor="middle">SILK</text></svg>',
  '          </div>',
  '          <div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;">',
  '            <div>',
  '              <h4 style="font-family:\'Poppins\',sans-serif;font-size:15px;font-weight:700;margin:0 0 4px 0;color:#1A1A1A;">SilkSkin Botanical Serum</h4>',
  '              <div style="font-size:12px;color:#666666;margin-bottom:6px;">Volume: <span id="cartDrawerVolume">30 ml</span> &bull; In Stock</div>',
  '              <div style="font-size:15px;font-weight:700;color:#1B3B2B;" id="cartItemPrice">$48.00</div>',
  '            </div>',
  '            <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;">',
  '              <div style="display:inline-flex;align-items:center;border:1px solid #DDDDDD;border-radius:4px;background:#FFF;">',
  '                <button type="button" onclick="updateCartQty(-1)" style="background:transparent;border:none;color:#333;width:26px;height:26px;cursor:pointer;font-weight:600;">-</button>',
  '                <span id="cartItemQty" style="width:24px;text-align:center;font-size:12px;font-weight:600;">1</span>',
  '                <button type="button" onclick="updateCartQty(1)" style="background:transparent;border:none;color:#333;width:26px;height:26px;cursor:pointer;font-weight:600;">+</button>',
  '              </div>',
  '              <button type="button" onclick="removeCartItem()" style="background:transparent;border:none;color:#888888;font-size:11px;text-decoration:underline;cursor:pointer;">Remove</button>',
  '            </div>',
  '          </div>',
  '        </div>',
  '      </div>',
  '      <div style="padding:20px 24px;border-top:1px solid #EEEEEE;background:#FAFAFA;">',
  '        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:14px;color:#1A1A1A;">',
  '          <span>Subtotal</span>',
  '          <span style="font-size:18px;font-weight:700;color:#1B3B2B;" id="cartSubtotalText">$48.00</span>',
  '        </div>',
  '        <div style="font-size:11px;color:#777777;margin-bottom:14px;">Taxes and shipping calculated at checkout.</div>',
  '        <a href="/checkout" style="display:block;width:100%;padding:14px;background-color:#1B3B2B;color:#FFFFFF;border:none;border-radius:9999px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;text-align:center;text-decoration:none;">PROCEED TO CHECKOUT &rarr;</a>',
  '      </div>',
  '    </div>',
  '    <!-- FLOATING THEME SWITCHER PILL -->',
  '    <div class="floating-theme-bar" style="position:fixed;bottom:24px;right:24px;background:rgba(255,255,255,0.96);backdrop-filter:blur(12px);border:1px solid #1B3B2B;border-radius:9999px;padding:6px 10px;display:flex;align-items:center;gap:8px;box-shadow:0 12px 30px rgba(0,0,0,0.18);z-index:9990;">',
  '      <a href="/" style="padding:8px 14px;border-radius:9999px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;color:#1B3B2B;background:transparent;">🌹 Noir Velvet</a>',
  '      <a href="/terracotta" style="padding:8px 14px;border-radius:9999px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;color:#1B3B2B;background:transparent;">🏺 Terracotta</a>',
  '      <a href="/products/silkskin-botanical-serum" style="padding:8px 14px;border-radius:9999px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;color:#FFF;background:#1B3B2B;">🌿 SilkSkin Product</a>',
  '      <a href="/admin" style="padding:8px 14px;border-radius:9999px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;color:#1B3B2B;background:transparent;">⚙️ Admin</a>',
  '      <a href="/download/kayra-beauty-shopify-theme.zip" style="padding:8px 14px;border-radius:9999px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;color:#FFF;background:#BA934E;">📦 Download ZIP</a>',
  '    </div>',
  '    <script>',
  '      let currentSelectedVolume = "30 ml";',
  '      let currentSelectedPrice = 48.00;',
  '      let currentQty = 1;',
  '      const freeShippingThreshold = 75.00;',
  '      function selectVolume(el, vol, price, comparePrice) {',
  '        document.querySelectorAll(".volume-pill").forEach(p => p.classList.remove("active"));',
  '        el.classList.add("active");',
  '        currentSelectedVolume = vol;',
  '        currentSelectedPrice = price;',
  '        document.querySelector(".price-gold").textContent = "$" + price.toFixed(2);',
  '        document.querySelector(".price-compare").textContent = "$" + comparePrice.toFixed(2);',
  '      }',
  '      function addToCartFromProductPage() {',
  '        const qty = parseInt(document.getElementById("pQty").value) || 1;',
  '        currentQty = qty;',
  '        const volEl = document.getElementById("cartDrawerVolume");',
  '        if (volEl) volEl.textContent = currentSelectedVolume;',
  '        const itemPriceEl = document.getElementById("cartItemPrice");',
  '        if (itemPriceEl) itemPriceEl.textContent = "$" + currentSelectedPrice.toFixed(2);',
  '        renderCart();',
  '        openCartDrawer();',
  '      }',
  '      function toggleWishlist(btn) {',
  '        btn.classList.toggle("active");',
  '        const svg = btn.querySelector("svg");',
  '        if (btn.classList.contains("active")) {',
  '          svg.setAttribute("fill", "#E53935");',
  '          svg.setAttribute("stroke", "#E53935");',
  '        } else {',
  '          svg.setAttribute("fill", "none");',
  '          svg.setAttribute("stroke", "currentColor");',
  '        }',
  '      }',
  '      function openCartDrawer() {',
  '        document.getElementById("cartDrawerOverlay").style.opacity = "1";',
  '        document.getElementById("cartDrawerOverlay").style.pointerEvents = "auto";',
  '        document.getElementById("cartDrawerPane").style.transform = "translateX(0)";',
  '        document.body.style.overflow = "hidden";',
  '      }',
  '      function closeCartDrawer() {',
  '        document.getElementById("cartDrawerOverlay").style.opacity = "0";',
  '        document.getElementById("cartDrawerOverlay").style.pointerEvents = "none";',
  '        document.getElementById("cartDrawerPane").style.transform = "translateX(100%)";',
  '        document.body.style.overflow = "";',
  '      }',
  '      function updateCartQty(delta) {',
  '        currentQty += delta;',
  '        if (currentQty <= 0) { removeCartItem(); return; }',
  '        renderCart();',
  '      }',
  '      function removeCartItem() {',
  '        currentQty = 0;',
  '        document.getElementById("cartItemsContainer").innerHTML = \'<div style="text-align:center;padding:40px 20px;color:#777;"><div style="font-size:36px;margin-bottom:12px;">🛍</div><h4 style="font-family:Poppins,sans-serif;font-size:18px;color:#1A1A1A;margin:0 0 8px 0;">Your Bag is Empty</h4><p style="font-size:13px;margin-bottom:20px;">Explore SilkSkin Botanical Serum to restore skin vitality.</p><button type="button" style="padding:10px 22px;border-radius:9999px;background:#1B3B2B;color:#FFF;border:none;font-size:12px;font-weight:600;cursor:pointer;" onclick="closeCartDrawer()">Continue Shopping</button></div>\';',
  '        renderCart();',
  '      }',
  '      function renderCart() {',
  '        const subtotal = currentQty * currentSelectedPrice;',
  '        const badge = document.querySelector(".header-icon-badge");',
  '        if (badge) badge.textContent = currentQty;',
  '        const drawerCount = document.getElementById("cartDrawerCount");',
  '        if (drawerCount) drawerCount.textContent = currentQty;',
  '        const subtotalEl = document.getElementById("cartSubtotalText");',
  '        if (subtotalEl) subtotalEl.textContent = "$" + subtotal.toFixed(2);',
  '        const qtySpan = document.getElementById("cartItemQty");',
  '        if (qtySpan) qtySpan.textContent = currentQty;',
  '        const fillBar = document.getElementById("shippingProgressBar");',
  '        const notice = document.getElementById("shippingNoticeText");',
  '        if (subtotal >= freeShippingThreshold) {',
  '          if (fillBar) fillBar.style.width = "100%";',
  '          if (notice) { notice.textContent = "🎉 Congratulations! You unlocked Free Express Delivery!"; notice.style.color = "#2E7D32"; }',
  '        } else {',
  '          const diff = freeShippingThreshold - subtotal;',
  '          const pct = Math.max(0, Math.min(100, (subtotal / freeShippingThreshold) * 100));',
  '          if (fillBar) fillBar.style.width = pct + "%";',
  '          if (notice) { notice.textContent = "✦ Only $" + diff.toFixed(2) + " away from Free Express Delivery!"; notice.style.color = "#1B3B2B"; }',
  '        }',
  '      }',
  '    </script>'
].join('\n');

if (!content.includes('cart-drawer-pane')) {
  content = content.replace('</body>', cartDrawerProductHtml + '\n  </body>');
}

fs.writeFileSync(productScriptPath, content, 'utf8');
console.log('scripts/generate-preview-product.js updated successfully!');
