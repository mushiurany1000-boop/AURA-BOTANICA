const fs = require('fs');
const path = require('path');

const targetTheme = path.join(__dirname, '..', 'shopify-theme');

console.log('--- AUDITING SHOPIFY THEME ARCHITECTURE ---');

// 1. Directory Structure Check
const requiredDirs = [
  'assets',
  'blocks',
  'config',
  'layout',
  'locales',
  'sections',
  'snippets',
  'templates',
  'templates/customers'
];

const dirResults = {};
requiredDirs.forEach(dir => {
  const p = path.join(targetTheme, dir);
  dirResults[dir] = fs.existsSync(p);
});
console.log('Directory Results:', dirResults);

// 2. Required Core Files
const requiredFiles = [
  'layout/theme.liquid',
  'config/settings_schema.json',
  'config/settings_data.json',
  'locales/en.default.json',
  'sections/header-group.json',
  'sections/footer-group.json',
  'templates/index.json',
  'templates/product.json',
  'templates/collection.json',
  'templates/cart.json',
  'templates/search.json',
  'templates/page.json',
  'templates/page.contact.json',
  'templates/blog.json',
  'templates/article.json',
  'templates/404.json'
];

const fileResults = {};
requiredFiles.forEach(file => {
  const p = path.join(targetTheme, file);
  fileResults[file] = fs.existsSync(p);
});
console.log('Core File Results:', fileResults);

// 3. Check requested Rule 6 section types
const rule6Sections = [
  'slideshow',
  'image-banner',
  'image-with-text',
  'video-with-text',
  'rich-text',
  'multicolumn',
  'logo-list',
  'featured-collection',
  'collection-list',
  'featured-product',
  'product-tabs',
  'product-comparison',
  'faq',
  'testimonials',
  'newsletter',
  'blog-posts',
  'lookbook',
  'editorial-split',
  'ingredient-spotlight',
  'ritual-steps',
  'before-after',
  'announcement-bar',
  'promotional-banner',
  'marquee',
  'contact-form',
  'custom-liquid',
  'spacer-divider'
];

const sectionsDir = path.join(targetTheme, 'sections');
const availableSections = fs.existsSync(sectionsDir) ? fs.readdirSync(sectionsDir).map(f => f.replace('.liquid', '')) : [];

const sectionCoverage = {};
rule6Sections.forEach(sec => {
  const match = availableSections.find(s => s === sec || s.includes(sec) || sec.includes(s));
  sectionCoverage[sec] = match || 'MISSING';
});
console.log('Rule 6 Section Coverage:', sectionCoverage);

// 4. Check settings_schema.json groups
const schemaPath = path.join(targetTheme, 'config', 'settings_schema.json');
let schemaGroups = [];
if (fs.existsSync(schemaPath)) {
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  schemaGroups = schema.map(s => s.name);
}
console.log('Schema Groups in settings_schema.json:', schemaGroups);

// 5. Check settings_data.json
const dataPath = path.join(targetTheme, 'config', 'settings_data.json');
let dataStatus = {};
if (fs.existsSync(dataPath)) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  dataStatus = {
    hasCurrent: !!data.current,
    currentKeysCount: data.current ? Object.keys(data.current).length : 0,
    hasPresets: !!data.presets,
    presetsCount: data.presets ? Object.keys(data.presets).length : 0,
    hasColorSchemes: !!(data.current && data.current.color_schemes),
    colorSchemesCount: data.current && data.current.color_schemes ? Object.keys(data.current.color_schemes).length : 0
  };
}
console.log('Settings Data Status:', dataStatus);

