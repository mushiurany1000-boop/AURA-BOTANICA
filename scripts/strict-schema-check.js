const fs = require('fs');
const path = require('path');

const diffDir = path.join(__dirname, 'diff_test');
const auraDir = path.join(diffDir, 'aura');
const sectionsDir = path.join(auraDir, 'sections');

const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.liquid'));
console.log('Total sections in Aura:', files.length);

let errors = 0;
files.forEach(file => {
  const content = fs.readFileSync(path.join(sectionsDir, file), 'utf8');
  const match = content.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
  if (!match) {
    console.log('No schema in:', file);
    return;
  }
  try {
    const parsed = JSON.parse(match[1]);
    if (!parsed.name) {
      console.error('Section has no name:', file);
      errors++;
    }
  } catch (e) {
    console.error('JSON parse error in section:', file, e.message);
    errors++;
  }
});

console.log('Section schema check finished with errors:', errors);

