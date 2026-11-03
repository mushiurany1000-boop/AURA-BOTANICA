const fs = require('fs');

['footer-blocks', 'footer-design'].forEach(snip => {
  const c = fs.readFileSync(`shopify-theme/snippets/${snip}.liquid`, 'utf8');
  const regex = /\{%\s*render\s*['"]([^'"]+)['"]/g;
  const set = new Set();
  let m;
  while ((m = regex.exec(c)) !== null) {
    set.add(m[1]);
  }
  console.log(`Snippets in ${snip}.liquid:`);
  for (const s of set) {
    const exists = fs.existsSync(`shopify-theme/snippets/${s}.liquid`);
    console.log(`  - ${s}: exists=${exists}`);
  }
});

