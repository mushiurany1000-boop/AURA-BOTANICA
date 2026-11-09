const fs = require('fs');

const schema = JSON.parse(fs.readFileSync('config/settings_schema.json', 'utf8'));

const validTypes = new Set([
  'text', 'textarea', 'image_picker', 'radio', 'select', 'checkbox', 'range',
  'color', 'color_background', 'font_picker', 'collection', 'product', 'blog',
  'page', 'link_list', 'url', 'video_url', 'richtext', 'html', 'article',
  'header', 'paragraph', 'color_scheme_group', 'color_scheme'
]);

let errors = [];
schema.forEach((section, sIdx) => {
  if (section.settings) {
    section.settings.forEach((setting, stIdx) => {
      if (!validTypes.has(setting.type)) {
        errors.push({
          sectionIndex: sIdx,
          sectionName: section.name,
          settingIndex: stIdx,
          id: setting.id,
          type: setting.type
        });
      }
    });
  }
});

console.log('Total invalid settings in config/settings_schema.json:', errors.length);
errors.forEach(e => {
  console.log(`Section [${e.sectionIndex}] "${e.sectionName}" -> id: "${e.id}", type: "${e.type}"`);
});
