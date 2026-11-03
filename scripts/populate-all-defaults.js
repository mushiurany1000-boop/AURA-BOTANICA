const fs = require('fs');
const path = require('path');

const targetFiles = [
  path.join(__dirname, '..', 'shopify-theme', 'config', 'settings_data.json'),
  path.join(__dirname, '..', 'config', 'settings_data.json')
];

const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'shopify-theme', 'config', 'settings_schema.json'), 'utf8'));

targetFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.current = data.current || {};

  let added = 0;
  schema.forEach(sec => {
    if (!sec.settings) return;
    sec.settings.forEach(s => {
      if (s.id && s.default !== undefined && !(s.id in data.current)) {
        data.current[s.id] = s.default;
        added++;
      }
    });
  });

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Added ${added} default settings to ${file}`);
});

