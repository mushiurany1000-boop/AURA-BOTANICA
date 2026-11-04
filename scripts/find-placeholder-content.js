const fs = require('fs');
const path = require('path');

const templates = fs.readdirSync('templates').filter(f => f.endsWith('.json'));

console.log('Searching for external or placeholder URLs in templates:\n');

templates.forEach(file => {
  const filePath = path.join('templates', file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check for external shopify CDN links from old themes
  const cdnMatches = content.match(/https?:\/\/cdn\.shopify\.com\/s\/files\/[0-9\/]+/g);
  if (cdnMatches) {
    console.log(`[EXTERNAL CDN URL] in ${file}:`);
    const unique = [...new Set(cdnMatches)];
    unique.forEach(u => console.log(`  - ${u}`));
  }

  // Check for lorem ipsum
  if (content.toLowerCase().includes('lorem ipsum')) {
    console.log(`[LOREM IPSUM] in ${file}`);
  }
});

