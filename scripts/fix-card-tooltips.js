const fs = require('fs');
const path = require('path');

const dirs = ['snippets', 'shopify-theme/snippets'];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  for (let i = 1; i <= 5; i++) {
    const file = path.join(dir, `product-card-${i}.liquid`);
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace if [settings_key] with if settings[settings_key]
    content = content.replace(/\{\%\-\s*if\s+\[settings_key\]\s*\-\%\}/g, '{%- if settings[settings_key] -%}');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated tooltip settings lookup in: ${file}`);
    } else {
      console.log(`No changes needed in: ${file}`);
    }
  }
});

console.log('Tooltip settings fix complete.');
