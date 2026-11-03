const fs = require('fs');
const path = require('path');

const targets = [
  path.join(__dirname, '..', 'shopify-theme', 'sections'),
  path.join(__dirname, '..', 'sections')
];

const schemas = {
  'cart-drawer.liquid': { name: 'Cart Drawer', settings: [] },
  'cart-gift-wrapping.liquid': { name: 'Cart Gift Wrapping', settings: [] },
  'cart-template.liquid': { name: 'Cart Page', settings: [] },
  'country-options.liquid': { name: 'Country Options', settings: [] },
  'foxkit-json.liquid': { name: 'App JSON Data', settings: [] },
  'page-about-us.liquid': { name: 'About Us Page', settings: [] },
  'page-product-compare.liquid': { name: 'Product Compare Page', settings: [] },
  'page-wishlist.liquid': { name: 'Wishlist Page', settings: [] },
  'page.liquid': { name: 'Page Content', settings: [] },
  'pickup-availability.liquid': { name: 'Pickup Availability', settings: [] },
  'predictive-search.liquid': { name: 'Predictive Search', settings: [] },
  'product-json.liquid': { name: 'Product JSON', settings: [] },
  'product-quickview.liquid': { name: 'Product Quick View', settings: [] }
};

targets.forEach(dir => {
  if (!fs.existsSync(dir)) return;

  Object.keys(schemas).forEach(filename => {
    const filePath = path.join(dir, filename);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('{% schema %}')) {
      const schemaJson = JSON.stringify(schemas[filename], null, 2);
      content += `\n\n{% schema %}\n${schemaJson}\n{% endschema %}\n`;
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Added schema to: ${filePath}`);
    }
  });
});

console.log('All missing section schemas fixed successfully!');

