const fs = require('fs');
const path = require('path');

const freeShippingMarkup = `
        {%- if settings.free_shipping_threshold > 0 -%}
          {%- assign threshold_in_cents = settings.free_shipping_threshold | times: 100 -%}
          {%- assign current_subtotal = cart.total_price -%}
          <div class="m-cart-free-shipping-goal" style="padding: 10px 14px; margin: 10px 0; border-radius: 6px; {% if current_subtotal >= threshold_in_cents %}background: rgba(185, 120, 77, 0.1); border: 1px solid #B9784D;{% else %}background: #F4EFE6; border: 1px solid #E5DFD3;{% endif %}">
            {%- if current_subtotal >= threshold_in_cents -%}
              <p class="m:text-xs m:font-medium m:text-center" style="color: #B9784D; margin: 0;">
                ✨ You have unlocked <strong>Free Carbon-Neutral Shipping</strong>!
              </p>
              <div class="m:w-full m:h-1.5 m:rounded-full m:mt-2" style="background: #E5DFD3; overflow: hidden;">
                <div style="width: 100%; height: 100%; background: #B9784D; transition: width 0.3s ease;"></div>
              </div>
            {%- else -%}
              {%- assign remaining_cents = threshold_in_cents | minus: current_subtotal -%}
              {%- assign progress_percent = current_subtotal | times: 100 | divided_by: threshold_in_cents -%}
              <p class="m:text-xs m:text-center" style="color: #18231F; margin: 0;">
                Add <strong>{{ remaining_cents | money }}</strong> more to unlock <strong>Free Shipping</strong>
              </p>
              <div class="m:w-full m:h-1.5 m:rounded-full m:mt-2" style="background: #E5DFD3; overflow: hidden;">
                <div style="width: {{ progress_percent }}%; height: 100%; background: #18231F; transition: width 0.3s ease;"></div>
              </div>
            {%- endif -%}
          </div>
        {%- endif -%}
`;

// 1. Patch cart-drawer.liquid
const drawerFiles = ['snippets/cart-drawer.liquid', 'shopify-theme/snippets/cart-drawer.liquid'];
drawerFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');
  if (!c.includes('m-cart-free-shipping-goal')) {
    c = c.replace('<foxkit-cart-goal></foxkit-cart-goal>', `<foxkit-cart-goal></foxkit-cart-goal>\n${freeShippingMarkup}`);
    fs.writeFileSync(file, c, 'utf8');
    console.log(`Added free shipping bar to ${file}`);
  }
});

// 2. Patch cart-template.liquid
const templateFiles = ['sections/cart-template.liquid', 'shopify-theme/sections/cart-template.liquid'];
templateFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');
  if (!c.includes('m-cart-free-shipping-goal')) {
    c = c.replace('<div class="m-cart__wrapper m:w-full">', `${freeShippingMarkup}\n      <div class="m-cart__wrapper m:w-full">`);
    fs.writeFileSync(file, c, 'utf8');
    console.log(`Added free shipping bar to ${file}`);
  }
});

console.log('Cart shipping bar patch complete.');
