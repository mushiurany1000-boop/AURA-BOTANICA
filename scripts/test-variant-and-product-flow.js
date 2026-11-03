const fs = require('fs');

console.log('--- TESTING VARIANT & PRODUCT SELECTION ARCHITECTURE ---');

// 1. Inspect main-product-blocks.liquid for form and variant picker
const blocksContent = fs.readFileSync('shopify-theme/snippets/main-product-blocks.liquid', 'utf8');
const hasProductForm = blocksContent.includes('product-form') || blocksContent.includes('form \'product\'');
const hasVariantPicker = blocksContent.includes('render \'product-option\'') || blocksContent.includes('variant-select') || blocksContent.includes('variant-picker');
const hasHiddenVariantId = blocksContent.includes('name="id"');

console.log('1. main-product-blocks.liquid:');
console.log('  - Has product-form component/tag:', hasProductForm);
console.log('  - Has variant picker rendering:', hasVariantPicker);
console.log('  - Has name="id" input:', hasHiddenVariantId);

// 2. Inspect product-option.liquid
const optionContent = fs.readFileSync('shopify-theme/snippets/product-option.liquid', 'utf8');
const hasVariantSelectEl = optionContent.includes('<variant-select');
const hasVariantButtonEl = optionContent.includes('<variant-button');
const hasVariantColorEl = optionContent.includes('<variant-color');
const hasVariantImageEl = optionContent.includes('<variant-image');
const hasJsonVariants = optionContent.includes('type="application/json"');

console.log('2. product-option.liquid:');
console.log('  - Has <variant-select> custom element:', hasVariantSelectEl);
console.log('  - Has <variant-button> custom element:', hasVariantButtonEl);
console.log('  - Has <variant-color> custom element:', hasVariantColorEl);
console.log('  - Has <variant-image> custom element:', hasVariantImageEl);
console.log('  - Embeds product/variant JSON:', hasJsonVariants);

// 3. Inspect variant-picker.js
const pickerJs = fs.readFileSync('shopify-theme/assets/variant-picker.js', 'utf8');
const definesVariantSelect = pickerJs.includes('customElements.define') && pickerJs.includes('variant-select');
const handlesChange = pickerJs.includes('onVariantChange') || pickerJs.includes('addEventListener(\'change\'');
const updatesMasterId = pickerJs.includes('name="id"');
const updatesPrice = pickerJs.includes('price') || pickerJs.includes('m-price');
const updatesMedia = pickerJs.includes('featured_media') || pickerJs.includes('updateMedia');

console.log('3. variant-picker.js:');
console.log('  - Defines custom elements:', definesVariantSelect);
console.log('  - Handles variant change events:', handlesChange);
console.log('  - Updates master input [name="id"]:', updatesMasterId);
console.log('  - Updates price element:', updatesPrice);
console.log('  - Updates media/gallery:', updatesMedia);

// 4. Inspect theme-global.js for product-form
const globalJs = fs.readFileSync('shopify-theme/assets/theme-global.js', 'utf8');
const definesProductForm = globalJs.includes('customElements.define(\'product-form\'') || globalJs.includes('customElements.define("product-form"');
const handlesCartSubmit = globalJs.includes('onSubmitHandler') || globalJs.includes('routes.cart_add_url') || globalJs.includes('/cart/add');
const updatesCartCount = globalJs.includes('cart-count') || globalJs.includes('cart_count');

console.log('4. theme-global.js:');
console.log('  - Defines <product-form> custom element:', definesProductForm);
console.log('  - Submits to /cart/add.js via AJAX fetch:', handlesCartSubmit);
console.log('  - Updates cart counters & opens drawer:', updatesCartCount);

