const fs = require('fs');
const path = require('path');

const files = ['collection-list.liquid', 'collection-tabs.liquid', 'featured-collection.liquid', 'product-tabs.liquid', 'slider.liquid'];

for (const f of files) {
  const filePath = path.join(__dirname, '..', 'shopify-theme', 'sections', f);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf8');
  console.log('=== ' + f + ' ===');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('.url') && (l.includes('collection') || l.includes('button_link') || l.includes('image_link'))) {
      console.log(`  Line ${i+1}: ${l.trim().slice(0, 100)}`);
    }
  });
}

