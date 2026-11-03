const fs = require('fs');
const path = require('path');

const targetSchemas = [
  'config/settings_schema.json',
  'shopify-theme/config/settings_schema.json'
];

targetSchemas.forEach(file => {
  if (!fs.existsSync(file)) return;
  const schema = JSON.parse(fs.readFileSync(file, 'utf8'));
  const cartCat = schema.find(c => c.name === 'Cart settings');
  if (cartCat) {
    const hasThreshold = cartCat.settings.some(s => s.id === 'free_shipping_threshold');
    if (!hasThreshold) {
      cartCat.settings.splice(2, 0, {
        type: 'number',
        id: 'free_shipping_threshold',
        label: 'Free shipping goal threshold ($)',
        info: 'Set to 0 to disable. Example: 75 for free shipping on orders over $75.',
        default: 75
      });
      fs.writeFileSync(file, JSON.stringify(schema, null, 2), 'utf8');
      console.log(`Added free_shipping_threshold to ${file}`);
    }
  }
});

const targetData = [
  'config/settings_data.json',
  'shopify-theme/config/settings_data.json'
];

targetData.forEach(file => {
  if (!fs.existsSync(file)) return;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (data.current) {
    data.current.free_shipping_threshold = 75;
  }
  if (data.presets && data.presets.Default) {
    data.presets.Default.free_shipping_threshold = 75;
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Added free_shipping_threshold to ${file}`);
});

