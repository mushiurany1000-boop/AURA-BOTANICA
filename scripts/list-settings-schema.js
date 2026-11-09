const fs = require('fs');
const schema = JSON.parse(fs.readFileSync('config/settings_schema.json', 'utf8'));

schema.forEach((group, idx) => {
  if (idx === 0) return; // theme_info
  console.log(`\n=== [${group.name}] (Settings: ${group.settings ? group.settings.length : 0}) ===`);
  if (group.settings) {
    group.settings.forEach(s => {
      if (s.type === 'header') {
        console.log(`  --- HEADER: ${s.content} ---`);
      } else {
        console.log(`  - ${s.id} (${s.type}): ${s.label}`);
      }
    });
  }
});

