const fs = require('fs');
const path = require('path');

function updateSchema(relPath) {
  const filePath = path.join(__dirname, '..', relPath);
  if (!fs.existsSync(filePath)) return;

  const schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 1. Update theme_info
  if (schema[0] && schema[0].name === 'theme_info') {
    schema[0].theme_name = 'Aura Botanica';
    schema[0].theme_version = '2.0.0';
    schema[0].theme_author = 'Aura Botanica Alchemy';
  }

  // 2. Align Category Names for clean Theme Editor UX
  schema.forEach(cat => {
    if (cat.name === 'General settings') {
      cat.name = 'Branding';
    } else if (cat.name === 'GDPR settings') {
      cat.name = 'Cookie & Compliance';
    } else if (cat.name === 'Product card') {
      cat.name = 'Product cards';
    } else if (cat.name === 'Cart settings') {
      cat.name = 'Cart';
    } else if (cat.name === 'Social sharing') {
      cat.name = 'Social';
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(schema, null, 2), 'utf8');
  console.log(`[SCHEMA UPDATED] ${relPath}`);
}

updateSchema('config/settings_schema.json');
updateSchema('shopify-theme/config/settings_schema.json');

