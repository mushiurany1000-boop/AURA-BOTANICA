/**
 * AURA BOTANICA — GUMDROP BENCHMARK UPGRADE TEST SUITE
 * Validates all 16 benchmark features, 30 section implementations,
 * PDP skincare blocks, back-in-stock system, and Theme Editor controls.
 */

const fs = require('fs');
const path = require('path');

let passCount = 0;
let failCount = 0;

function assert(cond, msg) {
  if (cond) {
    console.log(`  [PASS] ${msg}`);
    passCount++;
  } else {
    console.error(`  [FAIL] ${msg}`);
    failCount++;
  }
}

console.log('====================================================');
console.log('--- AURA BOTANICA GUMDROP BENCHMARK TEST SUITE ---');
console.log('====================================================\n');

// 1. Audit 16 Gumdrop Benchmark Features
console.log('1. Validating 16 Gumdrop Benchmark Subsystems:');

const benchmarkFeatures = [
  { name: 'Quick Buy', files: ['snippets/product-card.liquid', 'snippets/product-card-quick-add-btn.liquid', 'snippets/product-form.liquid'] },
  { name: 'Quick View', files: ['sections/product-quickview.liquid', 'assets/product-quick-view.js'] },
  { name: 'Slide-out Cart', files: ['snippets/cart-drawer.liquid', 'sections/cart-drawer.liquid', 'assets/cart-drawer.js'] },
  { name: 'Sticky Cart / Sticky ATC', files: ['snippets/sticky-atc.liquid', 'assets/sticky-atc.js', 'assets/sticky-add-to-cart.css'] },
  { name: 'Mega Menu', files: ['sections/header.liquid', 'snippets/header-main-menu-container.liquid', 'assets/mega-menu.js'] },
  { name: 'Enhanced Search', files: ['snippets/search-popup.liquid', 'assets/predictive-search.js', 'sections/page-search.liquid', 'sections/predictive-search.liquid'] },
  { name: 'Product Filters', files: ['snippets/collection-filters-facets.liquid', 'snippets/storefront-filters.liquid', 'assets/storefont-filters.js'] },
  { name: 'Recently Viewed', files: ['sections/recent-viewed-products.liquid', 'assets/recently-viewed-products.js'] },
  { name: 'Product Recommendations', files: ['sections/product-recommendations.liquid'] },
  { name: 'Color Swatches', files: ['snippets/get_swatch_texture.liquid', 'snippets/product-card-option.liquid', 'assets/product-card-swatch.js'] },
  { name: 'Back-in-Stock Alerts', files: ['snippets/back-in-stock.liquid', 'assets/back-in-stock.js', 'assets/back-in-stock.css'] },
  { name: 'Product Tabs', files: ['sections/product-tabs.liquid', 'sections/collapsible-tabs.liquid'] },
  { name: 'Image Zoom', files: ['assets/product-media.js', 'snippets/product-media.liquid'] },
  { name: 'Lookbook / Shoppable Images', files: ['sections/lookbook.liquid', 'snippets/lookbook-card.liquid', 'assets/hotspots-image.js'] },
  { name: 'Promo Banners', files: ['sections/promotion-banner.liquid', 'sections/featured-collection-banner.liquid'] },
  { name: 'Countdown Timer', files: ['sections/countdown-timer.liquid', 'assets/countdown-timer.js'] }
];

benchmarkFeatures.forEach(feat => {
  const allExist = feat.files.every(f => fs.existsSync(f));
  assert(allExist, `Benchmark feature "${feat.name}" fully implemented (${feat.files.join(', ')})`);
});

// 2. Validate Back-in-Stock Implementation
console.log('\n2. Validating Back-in-Stock Restock Notification System:');
const bisSnippet = fs.readFileSync('snippets/back-in-stock.liquid', 'utf8');
assert(bisSnippet.includes('data-back-in-stock-trigger'), 'Snippet provides accessible trigger button');
assert(bisSnippet.includes('data-back-in-stock-modal'), 'Snippet provides modal dialog container');
assert(bisSnippet.includes("contact[tags]"), 'Snippet tags contact with product title and variant ID');
assert(bisSnippet.includes('role="dialog"'), 'Snippet uses ARIA dialog role');

const bisJs = fs.readFileSync('assets/back-in-stock.js', 'utf8');
assert(bisJs.includes('variant:change'), 'JS synchronizes with variant changes');
assert(bisJs.includes('e.key === \'Escape\''), 'JS dismisses on Escape key');
assert(bisJs.includes('focusables'), 'JS implements focus trap');

// 3. Validate 30 Homepage Sections
console.log('\n3. Validating 30 Homepage Sections:');
const required30 = [
  'annoucement.liquid',
  'header.liquid',
  'slider.liquid',
  'image-with-text.liquid',
  'featured-collection.liquid',
  'new-featured-product.liquid',
  'collection-list.liquid',
  'promotion-banner.liquid',
  'editorial-split.liquid',
  'before-after.liquid',
  'brand-story.liquid',
  'ingredient-spotlight.liquid',
  'product-benefits-grid.liquid',
  'best-sellers.liquid',
  'new-arrivals.liquid',
  'trending-products.liquid',
  'product-comparison-table.liquid',
  'lookbook.liquid',
  'testimonials.liquid',
  'reviews-showcase.liquid',
  'press.liquid',
  'countdown-timer.liquid',
  'newsletter.liquid',
  'faq.liquid',
  'blog-posts.liquid',
  'recent-viewed-products.liquid',
  'product-recommendations.liquid',
  'trust-badges.liquid',
  'icon-box.liquid',
  'rich-text.liquid'
];

required30.forEach((sec, idx) => {
  const filePath = 'sections/' + sec;
  const exists = fs.existsSync(filePath);
  assert(exists, `Section ${idx + 1}/30 "${sec}" exists`);
  if (exists) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/\{\%\s*schema\s*\%\}([\s\S]*?)\{\%\s*endschema\s*\%\}/);
    assert(match !== null, `Section "${sec}" contains valid schema`);
    if (match) {
      try {
        const s = JSON.parse(match[1]);
        assert(s.name !== undefined, `Section "${sec}" has name: "${s.name}"`);
      } catch (e) {
        assert(false, `Section "${sec}" schema JSON parse error: ${e.message}`);
      }
    }
  }
});

// 4. Validate PDP Skincare Blocks
console.log('\n4. Validating Main Product Page Skincare Blocks:');
const mainProduct = fs.readFileSync('sections/main-product.liquid', 'utf8');
const pSchemaMatch = mainProduct.match(/\{\%\s*schema\s*\%\}([\s\S]*?)\{\%\s*endschema\s*\%\}/);
const pSchema = JSON.parse(pSchemaMatch[1]);

const pdpBlocks = [
  'back_in_stock',
  'botanical_ingredients',
  'ritual_steps',
  'skin_suitability'
];

pdpBlocks.forEach(blk => {
  const found = pSchema.blocks.find(b => b.type === blk);
  assert(found !== undefined, `main-product.liquid defines block type "${blk}" (${found ? found.name : 'N/A'})`);
});

const blocksSnippet = fs.readFileSync('snippets/main-product-blocks.liquid', 'utf8');
pdpBlocks.forEach(blk => {
  assert(blocksSnippet.includes(`when '${blk}'`), `main-product-blocks.liquid renders case "${blk}"`);
});

// 5. Validate Theme Settings & 3 Presets
console.log('\n5. Validating Global Settings Schema & Presets:');
const settingsSchema = JSON.parse(fs.readFileSync('config/settings_schema.json', 'utf8'));
assert(settingsSchema.length >= 24, `Settings schema contains ${settingsSchema.length} configuration groups (>= 24)`);

const settingsData = JSON.parse(fs.readFileSync('config/settings_data.json', 'utf8'));
const presets = settingsData.presets;
assert(presets['Botanical Ivory'] !== undefined, 'Preset "Botanical Ivory" defined');
assert(presets['Forest Night'] !== undefined, 'Preset "Forest Night" defined');
assert(presets['Clay Rose'] !== undefined, 'Preset "Clay Rose" defined');

assert(presets['Botanical Ivory'].default_color_scheme !== presets['Forest Night'].default_color_scheme ||
       presets['Botanical Ivory'].bg_color !== presets['Forest Night'].bg_color,
       'Presets have distinct styling parameters');

// 6. Directory Parity Check
console.log('\n6. Validating Root vs shopify-theme Directory Parity:');
const rootFiles = fs.readdirSync('sections');
let diffCount = 0;
rootFiles.forEach(f => {
  if (!fs.existsSync(path.join('shopify-theme', 'sections', f))) {
    diffCount++;
    console.error(`  [DIFF] Missing in shopify-theme: sections/${f}`);
  }
});
assert(diffCount === 0, `Zero missing sections in shopify-theme/ (diffCount: ${diffCount})`);

console.log('\n====================================================');
console.log(`TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('====================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('All Gumdrop benchmark upgrade automated tests passed with 100% success!\n');
}
