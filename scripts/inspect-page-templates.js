const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '..', 'shopify-theme', 'templates');
const pageTemplates = fs.readdirSync(templatesDir).filter(f => f.startsWith('page.') && f.endsWith('.json'));

pageTemplates.forEach(pt => {
  const content = JSON.parse(fs.readFileSync(path.join(templatesDir, pt), 'utf8'));
  console.log(`=== ${pt} ===`);
  const sections = Object.keys(content.sections).map(k => `${k} (type: ${content.sections[k].type})`);
  console.log('  Sections:', sections.join(', '));
});

