const fs = require('fs');
const path = require('path');

const dirs = ['shopify-theme/sections', 'sections', 'shopify-theme/snippets', 'snippets'];
const results = {};

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).filter(f => f.endsWith('.liquid')).forEach(f => {
    const full = path.join(dir, f);
    const content = fs.readFileSync(full, 'utf8');
    const regex = /href\s*=\s*["']([^"']*\bcol(lection)?\.url[^"']*)["']/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
      results[f] = results[f] || [];
      results[f].push(m[1]);
    }
  });
});

console.log('Files with col.url or collection.url in href:');
Object.entries(results).forEach(([f, matches]) => {
  console.log(`- ${f}: ${matches.length} matches`);
  matches.forEach(m => console.log(`    ${m}`));
});
