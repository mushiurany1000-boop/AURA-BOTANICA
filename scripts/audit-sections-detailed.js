const fs = require('fs');
const path = require('path');

const sectionsDir = 'sections';
const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.liquid'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(sectionsDir, file), 'utf8');
  const match = content.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[1]);
      // Check section settings
      if (parsed.settings) {
        parsed.settings.forEach(st => {
          if (st.type === 'image') {
            console.log(`SECTION SETTING: sections/${file} -> setting "${st.id}" has type "image"!`);
          }
          if (st.type === 'number') {
            console.log(`SECTION SETTING: sections/${file} -> setting "${st.id}" has type "number"!`);
          }
        });
      }
      // Check block settings
      if (parsed.blocks) {
        parsed.blocks.forEach(b => {
          if (b.settings) {
            b.settings.forEach(st => {
              if (st.type === 'image') {
                console.log(`BLOCK SETTING: sections/${file} -> block "${b.type}" setting "${st.id}" has type "image"!`);
              }
              if (st.type === 'number') {
                console.log(`BLOCK SETTING: sections/${file} -> block "${b.type}" setting "${st.id}" has type "number"!`);
              }
            });
          }
        });
      }
    } catch (e) {
      console.log(`JSON error in sections/${file}: ${e.message}`);
    }
  }
});
console.log('Detailed section check complete.');

