const fs = require('fs');
const path = require('path');

const requiredSections = [
  'announcement-bar',
  'header',
  'banner-with-slider',
  'image-with-text-1',
  'rich-text',
  'featured-collection',
  'featured-product',
  'product-recommendations',
  'main-product',
  'collection-page-header',
  'collection-template',
  'testimonials-1',
  'image-gallery',
  'video',
  'video-hero',
  'multicolumn',
  'newsletter',
  'faq',
  'collapsible-tabs',
  'brands-list',
  'promotion-banner',
  'footer',
  'recently-viewed'
];

console.log('Checking core sections required by Phase 7:\n');

requiredSections.forEach(name => {
  const filePath = path.join('sections', name + '.liquid');
  const exists = fs.existsSync(filePath);
  if (!exists) {
    // Check if there are alternate names
    const matches = fs.readdirSync('sections').filter(f => f.startsWith(name) || f.includes(name));
    console.log(`[MISSING] ${name}.liquid (Found similar: ${matches.join(', ') || 'none'})`);
  } else {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').length;
    console.log(`[EXISTS] ${name}.liquid (${lines} lines)`);
  }
});
