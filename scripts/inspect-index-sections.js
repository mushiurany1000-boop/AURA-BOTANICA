const fs = require('fs');
const path = require('path');

const index = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'shopify-theme', 'templates', 'index.json'), 'utf8'));

console.log('Sections count in index.json:', Object.keys(index.sections).length);

for (const [id, s] of Object.entries(index.sections)) {
  console.log(`\nSection [${id}] - Type: ${s.type}`);
  if (s.settings) {
    const keys = Object.keys(s.settings).filter(k => k.includes('link') || k.includes('collection') || k.includes('heading') || k.includes('title'));
    keys.forEach(k => console.log(`  setting: ${k} = "${s.settings[k]}"`));
  }
  if (s.blocks) {
    for (const [bid, b] of Object.entries(s.blocks)) {
      const bkeys = Object.keys(b.settings || {}).filter(k => k.includes('link') || k.includes('collection') || k.includes('title') || k.includes('heading'));
      if (bkeys.length > 0) {
        console.log(`    Block [${bid}] (${b.type}):`);
        bkeys.forEach(k => console.log(`      ${k} = "${b.settings[k]}"`));
      }
    }
  }
}

