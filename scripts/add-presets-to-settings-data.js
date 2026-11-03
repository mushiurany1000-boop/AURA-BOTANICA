const fs = require('fs');
const path = require('path');

const targetFiles = [
  path.join(__dirname, '..', 'shopify-theme', 'config', 'settings_data.json'),
  path.join(__dirname, '..', 'config', 'settings_data.json')
];

targetFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  // Deep clone current into presets.Default
  data.presets = data.presets || {};
  data.presets.Default = JSON.parse(JSON.stringify(data.current));

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated presets in: ${file}`);
});

console.log('Presets successfully added to settings_data.json');

