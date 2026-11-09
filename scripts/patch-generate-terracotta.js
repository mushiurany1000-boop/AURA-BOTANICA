const fs = require('fs');
const path = require('path');

const homeScriptPath = path.join(__dirname, '..', 'scripts', 'generate-preview-home.js');
let content = fs.readFileSync(homeScriptPath, 'utf8');

// Change target file to preview/terracotta.html
content = content.replace("fs.writeFileSync('preview/index.html', htmlContent);", "fs.writeFileSync('preview/terracotta.html', htmlContent);");
content = content.replace("console.log('Successfully generated preview/index.html (Reference 1 Replica)!');", "console.log('Successfully generated preview/terracotta.html (Reference 1 Replica)!');");

// Ensure cart button opens drawer
content = content.replace(/onclick="alert\('Your Cart is empty'\)"/g, "onclick=\"openCartDrawer()\"");
content = content.replace(/href="\/cart"/g, "href=\"javascript:void(0)\" onclick=\"openCartDrawer()\"");

const cartDrawerHtml = [
  '    <!-- INTERACTIVE CART DRAWER -->',
  '    <div class="cart-drawer-overlay" id="cartDrawerOverlay" onclick="closeCartDrawer()" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:9998;opacity:0;pointer-events:none;transition:opacity 0.3s ease;"></div>',
  '    <div class="cart-drawer-pane" id="cartDrawerPane" style="position:fixed;top:0;right:0;width:100%;max-width:440px;height:100vh;background:#FDF5F2;color:#3B1E18;z-index:9999;transform:translateX(100%);transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);display:flex;flex-direction:column;box-shadow:-12px 0 40px rgba(0,0,0,0.25);border-left:1px solid #E8D2C8;">',
  '      <div style="padding:20px 24px;border-bottom:1px solid #E8D2C8;display:flex;align-items:center;justify-content:space-between;">',
  '        <h3 style="font-family:\'Cormorant Garamond\',serif;font-size:22px;font-weight:600;margin:0;letter-spacing:1px;text-transform:uppercase;color:#7E3023;">YOUR SHOPPING BAG (<span id="cartDrawerCount">1</span>)</h3>',
  '        <button onclick="closeCartDrawer()" style="background:transparent;border:none;color:#7E3023;font-size:26px;cursor:pointer;padding:4px;line-height:1;">&times;</button>',
  '      </div>',
  '      <div style="background:#F6E8E2;padding:14px 24px;border-bottom:1px solid #E8D2C8;">',
  '        <div id="shippingNoticeText" style="font-size:11px;letter-spacing:0.05em;color:#7E3023;margin-bottom:6px;text-align:center;font-weight:600;">✦ Only $27.00 away from Free Express Delivery!</div>',
  '        <div style="height:6px;background:#E5D0C6;border-radius:9999px;overflow:hidden;">',
  '          <div id="shippingProgressBar" style="height:100%;width:64%;background:linear-gradient(90deg,#93422F,#843C2D);border-radius:9999px;transition:width 0.3s ease;"></div>',
  '        </div>',
  '      </div>',
  '      <div style="flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:20px;" id="cartItemsContainer">',
  '        <div style="display:flex;gap:16px;padding-bottom:20px;border-bottom:1px solid #E8D2C8;">',
  '          <div style="width:76px;height:76px;border-radius:4px;background:#FFF;border:1px solid #E8D2C8;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;">',
  '            <svg viewBox="0 0 100 100" width="56" height="56" fill="none"><rect width="100" height="100" fill="#FDF5F2"/><rect x="35" y="30" width="30" height="48" rx="4" fill="#FFFFFF" stroke="#D9BEB1"/><rect x="44" y="16" width="12" height="14" rx="2" fill="#BA934E"/><text x="50" y="58" font-family="\'Cormorant Garamond\', serif" font-size="9" font-weight="700" fill="#7E3023" text-anchor="middle">SILK</text></svg>',
  '          </div>',
  '          <div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;">',
  '            <div>',
  '              <h4 style="font-family:\'Cormorant Garamond\',serif;font-size:17px;font-weight:600;margin:0 0 4px 0;color:#3B1E18;">SilkSkin Botanical Serum</h4>',
  '              <div style="font-size:12px;color:#7A554D;margin-bottom:6px;">Volume: 30 ml &bull; Biocompatible</div>',
  '              <div style="font-size:15px;font-weight:700;color:#7E3023;" id="cartItemPrice">$48.00</div>',
  '            </div>',
  '            <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;">',
  '              <div style="display:inline-flex;align-items:center;border:1px solid #D9BEB1;border-radius:4px;background:#FFF;">',
  '                <button type="button" onclick="updateCartQty(-1)" style="background:transparent;border:none;color:#7E3023;width:26px;height:26px;cursor:pointer;font-weight:600;">-</button>',
  '                <span id="cartItemQty" style="width:24px;text-align:center;font-size:12px;font-weight:600;">1</span>',
  '                <button type="button" onclick="updateCartQty(1)" style="background:transparent;border:none;color:#7E3023;width:26px;height:26px;cursor:pointer;font-weight:600;">+</button>',
  '              </div>',
  '              <button type="button" onclick="removeCartItem()" style="background:transparent;border:none;color:#7A554D;font-size:11px;text-decoration:underline;cursor:pointer;">Remove</button>',
  '            </div>',
  '          </div>',
  '        </div>',
  '      </div>',
  '      <div style="padding:20px 24px;border-top:1px solid #E8D2C8;background:#F6E8E2;">',
  '        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:14px;color:#3B1E18;">',
  '          <span>Subtotal</span>',
  '          <span style="font-size:18px;font-weight:700;color:#7E3023;" id="cartSubtotalText">$48.00</span>',
  '        </div>',
  '        <div style="font-size:11px;color:#7A554D;margin-bottom:14px;">Taxes and shipping calculated at checkout.</div>',
  '        <a href="/checkout" style="display:block;width:100%;padding:14px;background-color:#843C2D;color:#FFFFFF;border:none;border-radius:9999px;font-size:12px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;text-align:center;text-decoration:none;">PROCEED TO CHECKOUT &rarr;</a>',
  '      </div>',
  '    </div>',
  '    <!-- FLOATING THEME SWITCHER PILL -->',
  '    <div class="floating-theme-bar" style="position:fixed;bottom:24px;right:24px;background:rgba(253,245,242,0.95);backdrop-filter:blur(12px);border:1px solid #843C2D;border-radius:9999px;padding:6px 10px;display:flex;align-items:center;gap:8px;box-shadow:0 12px 30px rgba(0,0,0,0.18);z-index:9990;">',
  '      <a href="/" style="padding:8px 14px;border-radius:9999px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;color:#7E3023;background:transparent;">🌹 Noir Velvet</a>',
  '      <a href="/terracotta" style="padding:8px 14px;border-radius:9999px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;color:#FFF;background:#843C2D;">🏺 Terracotta</a>',
  '      <a href="/products/silkskin-botanical-serum" style="padding:8px 14px;border-radius:9999px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;color:#7E3023;background:transparent;">🌿 SilkSkin Product</a>',
  '      <a href="/admin" style="padding:8px 14px;border-radius:9999px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;color:#7E3023;background:transparent;">⚙️ Admin</a>',
  '      <a href="/download/kayra-beauty-shopify-theme.zip" style="padding:8px 14px;border-radius:9999px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;text-decoration:none;color:#FFF;background:#7E3023;">📦 Download ZIP</a>',
  '    </div>',
  '    <script>',
  '      let currentQty = 1; const unitPrice = 48.00; const freeShippingThreshold = 75.00;',
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
  '        document.getElementById("cartItemsContainer").innerHTML = \'<div style="text-align:center;padding:40px 20px;color:#7A554D;"><div style="font-size:36px;margin-bottom:12px;">🛍</div><h4 style="font-family:Cormorant Garamond,serif;font-size:20px;color:#3B1E18;margin:0 0 8px 0;">Your Bag is Empty</h4><p style="font-size:13px;margin-bottom:20px;">Discover our botanical rituals to restore cellular radiance.</p><a href="/products/silkskin-botanical-serum" style="display:inline-block;padding:10px 22px;border-radius:9999px;background:#843C2D;color:#FFF;text-decoration:none;font-size:12px;font-weight:600;" onclick="closeCartDrawer()">Shop SilkSkin Serum</a></div>\';',
  '        renderCart();',
  '      }',
  '      function renderCart() {',
  '        const subtotal = currentQty * unitPrice;',
  '        const badge = document.querySelector(".cart-count-badge");',
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
  '          if (notice) { notice.textContent = "✦ Only $" + diff.toFixed(2) + " away from Free Express Delivery!"; notice.style.color = "#7E3023"; }',
  '        }',
  '      }',
  '    </script>'
].join('\n');

if (!content.includes('cart-drawer-pane')) {
  content = content.replace('</body>', cartDrawerHtml + '\n  </body>');
}

fs.writeFileSync(homeScriptPath, content, 'utf8');
console.log('scripts/generate-preview-home.js updated safely!');
