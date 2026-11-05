const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const shopifyThemeDir = path.join(rootDir, 'shopify-theme');

// 1. Update locales with cart strings
function patchLocales(baseDir) {
  const filePath = path.join(baseDir, 'locales', 'en.default.json');
  let json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.cart) json.cart = {};
  if (!json.cart.general) json.cart.general = {};
  json.cart.general.free_shipping_unlocked = "Complimentary Carbon-Neutral Shipping unlocked!";
  json.cart.general.free_shipping_remaining_html = "Add <strong>{{ remaining }}</strong> more to unlock <strong>Complimentary Shipping</strong>";

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log(`[PASS] Updated cart locales in ${filePath}`);
}

// 2. Patch snippets/cart-drawer.liquid
function patchCartDrawerLiquid(baseDir) {
  const filePath = path.join(baseDir, 'snippets', 'cart-drawer.liquid');
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace close button with accessible button
  content = content.replace(
    '<button class="m-cart-drawer__close" aria-label="Close">',
    '<button type="button" class="m-cart-drawer__close" aria-label="{{ \'general.accessibility.close\' | t }}">'
  );

  // Replace hardcoded inline-styled shipping goal with token-based markup
  const oldGoalRegex = /{%- if settings\.free_shipping_threshold > 0 -%}[\s\S]*?{%- endif -%}\s*<\/div>/;
  const newGoalMarkup = `{%- if settings.free_shipping_threshold > 0 -%}
          {%- assign threshold_in_cents = settings.free_shipping_threshold | times: 100 -%}
          {%- assign current_subtotal = cart.total_price -%}
          <div class="m-cart-free-shipping-goal{% if current_subtotal >= threshold_in_cents %} is-unlocked{% endif %}">
            {%- if current_subtotal >= threshold_in_cents -%}
              <p class="m-cart-free-shipping__text m:text-xs m:font-medium m:text-center">
                <span class="m-cart-free-shipping__icon">✦</span> {{ 'cart.general.free_shipping_unlocked' | t }}
              </p>
              <div class="m-cart-free-shipping__bar m:w-full m:rounded-full m:mt-2">
                <div class="m-cart-free-shipping__progress is-full"></div>
              </div>
            {%- else -%}
              {%- assign remaining_cents = threshold_in_cents | minus: current_subtotal -%}
              {%- assign progress_percent = current_subtotal | times: 100 | divided_by: threshold_in_cents -%}
              {%- capture remaining_money -%}{{ remaining_cents | money }}{%- endcapture -%}
              <p class="m-cart-free-shipping__text m:text-xs m:text-center">
                {{ 'cart.general.free_shipping_remaining_html' | t: remaining: remaining_money }}
              </p>
              <div class="m-cart-free-shipping__bar m:w-full m:rounded-full m:mt-2">
                <div class="m-cart-free-shipping__progress" style="--shipping-progress: {{ progress_percent }}%;"></div>
              </div>
            {%- endif -%}
          </div>
        {%- endif -%}
      </div>`;

  if (oldGoalRegex.test(content)) {
    content = content.replace(oldGoalRegex, newGoalMarkup);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Patched free shipping goal in ${filePath}`);
  }
}

// 3. Append luxury styles & accessible focus rings to assets/cart.css
function patchCartCss(baseDir) {
  const filePath = path.join(baseDir, 'assets', 'cart.css');
  let content = fs.readFileSync(filePath, 'utf8');

  const cartEnhancements = `
/* ==========================================================================
   AURA BOTANICA — LUXURY CART DRAWER ENHANCEMENTS (Phase 2)
   ========================================================================== */
.m-cart-drawer__inner {
  background-color: rgb(var(--color-background));
  color: rgb(var(--color-foreground));
  box-shadow: -8px 0 32px rgba(24, 35, 31, 0.12);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.m-cart-drawer__close {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: rgb(var(--color-foreground));
  border-radius: var(--aura-radius-xs, 4px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.m-cart-drawer__close:hover {
  opacity: 0.7;
  transform: scale(1.05);
}

.m-cart-drawer__close:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 2px;
}

.m-cart-free-shipping-goal {
  padding: 12px 16px;
  margin: 12px 0;
  border-radius: var(--aura-radius-sm, 6px);
  background-color: var(--color-aura-bg-subtle, #F7F5F0);
  border: 1px solid var(--color-aura-border, #E8E1D7);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.m-cart-free-shipping-goal.is-unlocked {
  background-color: rgba(185, 120, 77, 0.08);
  border-color: var(--color-aura-copper, #B9784D);
}

.m-cart-free-shipping__text {
  color: rgb(var(--color-foreground));
  margin: 0;
}

.m-cart-free-shipping-goal.is-unlocked .m-cart-free-shipping__text {
  color: var(--color-aura-copper, #B9784D);
}

.m-cart-free-shipping__icon {
  margin-right: 4px;
}

.m-cart-free-shipping__bar {
  height: 6px;
  background-color: var(--color-aura-border, #E8E1D7);
  overflow: hidden;
}

.m-cart-free-shipping__progress {
  width: var(--shipping-progress, 0%);
  height: 100%;
  background-color: var(--color-aura-forest, #18231F);
  transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.m-cart-free-shipping__progress.is-full {
  width: 100%;
  background-color: var(--color-aura-copper, #B9784D);
}

.m-cart-item__quantity button {
  min-width: 40px;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}

.m-cart-item__quantity button:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 1px;
}

.m-cart-checkout-btn,
.m-cart__checkout-button {
  min-height: 48px;
  border-radius: var(--aura-radius-xs, 4px);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  transition: background-color 0.25s ease, opacity 0.25s ease, transform 0.25s ease;
}

.m-cart-checkout-btn:focus-visible,
.m-cart__checkout-button:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .m-cart-drawer__inner,
  .m-cart-drawer__close,
  .m-cart-free-shipping-goal,
  .m-cart-free-shipping__progress,
  .m-cart-checkout-btn,
  .m-cart__checkout-button {
    transition: none !important;
    animation: none !important;
  }
}
`;

  if (!content.includes('AURA BOTANICA — LUXURY CART DRAWER')) {
    content += cartEnhancements;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Injected cart enhancements in ${filePath}`);
  }
}

// 4. Enhance assets/cart-drawer.js for focus trap and ESC key closing
function patchCartDrawerJs(baseDir) {
  const filePath = path.join(baseDir, 'assets', 'cart-drawer.js');
  let content = fs.readFileSync(filePath, 'utf8');

  // Enhance open method to trap focus & add ESC listener
  const oldOpenTarget = 'this.classList.add("m-cart-drawer--active");';
  const newOpenTarget = `this.classList.add("m-cart-drawer--active");
    this.escHandler = (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    };
    document.addEventListener("keydown", this.escHandler);
    setTimeout(() => {
      if (this.cartDrawerCloseIcon) this.cartDrawerCloseIcon.focus();
    }, 150);`;

  // Enhance close method to remove ESC listener & return focus
  const oldCloseTarget = 'document.documentElement.classList.remove("prevent-scroll");';
  const newCloseTarget = `document.documentElement.classList.remove("prevent-scroll");
      if (this.escHandler) {
        document.removeEventListener("keydown", this.escHandler);
      }
      if (this.activeElement) {
        this.activeElement.focus();
      }`;

  if (content.includes(oldOpenTarget) && !content.includes('this.escHandler')) {
    content = content.replace(oldOpenTarget, newOpenTarget);
  }
  if (content.includes(oldCloseTarget) && !content.includes('if (this.escHandler)')) {
    content = content.replace(oldCloseTarget, newCloseTarget);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[PASS] Patched cart-drawer.js in ${filePath}`);
}

[rootDir, shopifyThemeDir].forEach(dir => {
  patchLocales(dir);
  patchCartDrawerLiquid(dir);
  patchCartCss(dir);
  patchCartDrawerJs(dir);
});

console.log('Phase 2 Step 4 (Cart Drawer) patched successfully.');

