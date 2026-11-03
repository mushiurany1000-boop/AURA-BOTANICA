const fs = require('fs');

const c = fs.readFileSync('shopify-theme/sections/header.liquid', 'utf8');
const regex = /\{%\s*render\s*['"]([^'"]+)['"]/g;
const set = new Set();
let m;
while ((m = regex.exec(c)) !== null) {
  set.add(m[1]);
}
console.log('Snippets rendered in header.liquid:');
for (const s of set) {
  const existsTheme = fs.existsSync(`shopify-theme/snippets/${s}.liquid`);
  const existsRoot = fs.existsSync(`snippets/${s}.liquid`);
  console.log(`  - ${s}: theme=${existsTheme}, root=${existsRoot}`);
}

