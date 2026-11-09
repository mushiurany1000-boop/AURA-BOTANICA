const fs = require('fs');
const schema = JSON.parse(fs.readFileSync('config/settings_schema.json', 'utf8'));

let fixesCount = 0;

schema.forEach((group, gIdx) => {
  if (!group.settings) return;
  group.settings.forEach((s, sIdx) => {
    // Check label
    if (typeof s.label === 'object' && s.label !== null) {
      console.log(`Group [${group.name}] setting [${s.id}] has object label:`, s.label);
      s.label = s.label.en || s.label.default || String(Object.values(s.label)[0] || s.id);
      fixesCount++;
    }
    // Check info
    if (typeof s.info === 'object' && s.info !== null) {
      s.info = s.info.en || s.info.default || String(Object.values(s.info)[0] || '');
      fixesCount++;
    }
    // Check paragraph content
    if (s.type === 'paragraph' && !s.content) {
      console.log(`Group [${group.name}] has paragraph without content at index ${sIdx}`);
      s.content = 'Configure settings for this section.';
      fixesCount++;
    }
    // Check headers
    if (s.type === 'header' && !s.content) {
      s.content = 'General';
      fixesCount++;
    }
  });
});

console.log(`Total schema fixes made: ${fixesCount}`);
fs.writeFileSync('config/settings_schema.json', JSON.stringify(schema, null, 2));

