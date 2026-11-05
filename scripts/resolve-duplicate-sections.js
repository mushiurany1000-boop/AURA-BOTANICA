const fs = require('fs');
const path = require('path');

const retired = [
  'announcement-bar.liquid',
  'featured-product.liquid',
  'slideshow.liquid',
  'promotional-banner.liquid',
  'spacer-divider.liquid'
];

const deprecatedDir = path.join(__dirname, '..', '_deprecated', 'sections');
if (!fs.existsSync(deprecatedDir)) {
  fs.mkdirSync(deprecatedDir, { recursive: true });
}

retired.forEach(fileName => {
  const rootSrc = path.join(__dirname, '..', 'sections', fileName);
  const themeSrc = path.join(__dirname, '..', 'shopify-theme', 'sections', fileName);
  const dest = path.join(deprecatedDir, fileName);

  if (fs.existsSync(rootSrc)) {
    // Copy to _deprecated
    fs.copyFileSync(rootSrc, dest);
    // Remove from active sections
    fs.unlinkSync(rootSrc);
    console.log(`[RETIRED] sections/${fileName} -> _deprecated/sections/${fileName}`);
  }

  if (fs.existsSync(themeSrc)) {
    fs.unlinkSync(themeSrc);
    console.log(`[REMOVED] shopify-theme/sections/${fileName}`);
  }
});

console.log('Duplicate sections migration complete.');

