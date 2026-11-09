const fs = require('fs');
const path = require('path');

const validTypes = new Set([
  'text', 'textarea', 'image_picker', 'radio', 'select', 'checkbox', 'range',
  'color', 'color_background', 'font_picker', 'collection', 'product', 'blog',
  'page', 'link_list', 'url', 'video_url', 'richtext', 'html', 'article',
  'header', 'paragraph', 'color_scheme_group', 'color_scheme'
]);

function checkSchema(schemaObj, fileContext) {
  let errors = [];
  if (schemaObj.settings) {
    schemaObj.settings.forEach(st => {
      if (!validTypes.has(st.type)) {
        errors.push(`${fileContext} -> setting id: "${st.id}", invalid type: "${st.type}"`);
      }
    });
  }
  if (schemaObj.blocks) {
    schemaObj.blocks.forEach(b => {
      if (b.settings) {
        b.settings.forEach(st => {
          if (!validTypes.has(st.type)) {
            errors.push(`${fileContext} -> block "${b.type}" setting id: "${st.id}", invalid type: "${st.type}"`);
          }
        });
      }
    });
  }
  return errors;
}

const dir = 'sections';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.liquid'));
let allErrors = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const match = content.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[1]);
      const errs = checkSchema(parsed, `sections/${file}`);
      allErrors.push(...errs);
    } catch (e) {
      allErrors.push(`sections/${file} -> JSON parse error: ${e.message}`);
    }
  }
});

console.log('Total invalid section settings:', allErrors.length);
allErrors.forEach(e => console.log(e));
