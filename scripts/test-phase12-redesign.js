const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('--- AURA BOTANICA PHASE 12 LUXURY HOMEPAGE & PRODUCT SUITE ---');
console.log('================================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

// 1. Verifying Part A Sections & Schemas
console.log('1. Verifying Homepage Sections & Templates:');
const requiredSections = [
  'editorial-split',
  'benefits-strip',
  'collection-list',
  'bento-row-1',
  'bento-row-2',
  'subscribe-save-banner',
  'faq',
  'skin-quiz'
];

requiredSections.forEach(sec => {
  const filePath = path.join('sections', `${sec}.liquid`);
  assert(fs.existsSync(filePath), `Section '${sec}.liquid' exists`);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
    assert(match !== null, `Section '${sec}.liquid' contains {% schema %}`);
    if (match) {
      try {
        JSON.parse(match[1]);
        assert(true, `Section '${sec}.liquid' schema is valid JSON`);
      } catch (e) {
        assert(false, `Section '${sec}.liquid' schema JSON error: ${e.message}`);
      }
    }
  }
});

// 2. Verifying templates/index.json
console.log('\n2. Verifying templates/index.json Structure:');
const indexRaw = fs.readFileSync('templates/index.json', 'utf8');
try {
  const indexJson = JSON.parse(indexRaw);
  assert(true, "templates/index.json is valid JSON");
  const expectedOrder = [
    'hero_split',
    'benefits_strip',
    'shop_by_category',
    'bento_row_1',
    'bento_row_2',
    'subscribe_save',
    'faq',
    'best_sellers',
    'testimonials',
    'newsletter',
    'instagram'
  ];
  const actualOrder = indexJson.order;
  assert(
    JSON.stringify(actualOrder) === JSON.stringify(expectedOrder),
    `templates/index.json matches exact requested 11-section ordered sequence`
  );
  assert(indexJson.sections.hero_split.type === 'editorial-split', 'hero_split is editorial-split');
  assert(indexJson.sections.benefits_strip.type === 'benefits-strip', 'benefits_strip is benefits-strip');
  assert(indexJson.sections.shop_by_category.type === 'collection-list', 'shop_by_category is collection-list');
  assert(indexJson.sections.bento_row_1.type === 'bento-row-1', 'bento_row_1 is bento-row-1');
  assert(indexJson.sections.bento_row_2.type === 'bento-row-2', 'bento_row_2 is bento-row-2');
  assert(indexJson.sections.subscribe_save.type === 'subscribe-save-banner', 'subscribe_save is subscribe-save-banner');
  assert(indexJson.sections.faq.type === 'faq', 'faq is faq');
} catch (e) {
  assert(false, `templates/index.json error: ${e.message}`);
}

// 3. Verifying templates/page.skin-quiz.json
console.log('\n3. Verifying Skin Quiz Page Template:');
assert(fs.existsSync('templates/page.skin-quiz.json'), 'templates/page.skin-quiz.json exists');
try {
  const quizJson = JSON.parse(fs.readFileSync('templates/page.skin-quiz.json', 'utf8'));
  assert(quizJson.sections.main.type === 'skin-quiz', 'page.skin-quiz.json references skin-quiz section');
} catch (e) {
  assert(false, `page.skin-quiz.json error: ${e.message}`);
}

// 4. Verifying Part B Product Template & Metafields
console.log('\n4. Verifying Single Product Page & Metafields:');
const prodRaw = fs.readFileSync('templates/product.json', 'utf8');
try {
  const prodJson = JSON.parse(prodRaw);
  assert(true, 'templates/product.json is valid JSON');
  assert(prodJson.sections.main.type === 'main-product', 'Product template has main-product section');
  assert(prodJson.sections.product_details_tabs.type === 'product-details-tabs', 'Product template has product-details-tabs');
  assert(prodJson.sections.product_reviews.type === 'product-reviews', 'Product template has product-reviews');
  assert(prodJson.sections.product_recommendations.type === 'product-recommendations', 'Product template has product-recommendations');
  assert(prodJson.sections.recent_viewed_products.type === 'recent-viewed-products', 'Product template has recent-viewed-products');
} catch (e) {
  assert(false, `templates/product.json error: ${e.message}`);
}

assert(fs.existsSync('docs/METAFIELDS.md'), 'docs/METAFIELDS.md documentation exists');
const metaDoc = fs.readFileSync('docs/METAFIELDS.md', 'utf8');
assert(metaDoc.includes('custom.ingredients'), 'docs/METAFIELDS.md documents custom.ingredients');
assert(metaDoc.includes('custom.how_to_use'), 'docs/METAFIELDS.md documents custom.how_to_use');
assert(metaDoc.includes('reviews.rating'), 'docs/METAFIELDS.md documents reviews.rating');

// 5. Verifying Color Schemes & Tokens
console.log('\n5. Verifying Clay Rose Scheme & CSS System:');
const settingsData = JSON.parse(fs.readFileSync('config/settings_data.json', 'utf8'));
assert(settingsData.current.color_schemes['scheme-clay-rose'] !== undefined, "settings_data.json defines 'scheme-clay-rose'");
assert(settingsData.current.color_schemes['scheme-clay-rose'].settings.button === '#8B3A2F', "'scheme-clay-rose' has rust button #8B3A2F");
assert(settingsData.current.color_schemes['scheme-clay-rose'].settings.background === '#F3E3DC', "'scheme-clay-rose' has blush background #F3E3DC");

const auraCss = fs.readFileSync('assets/aura-base.css', 'utf8');
assert(auraCss.includes('.aura-eyebrow'), 'assets/aura-base.css defines .aura-eyebrow');
assert(auraCss.includes('.aura-card-luxury'), 'assets/aura-base.css defines .aura-card-luxury');
assert(auraCss.includes('.aura-benefits-item'), 'assets/aura-base.css defines .aura-benefits-item');
assert(auraCss.includes('.aura-category-card'), 'assets/aura-base.css defines .aura-category-card');
assert(auraCss.includes('.aura-stock-pill--in-stock'), 'assets/aura-base.css defines .aura-stock-pill--in-stock');

// 6. Verifying Directory Parity (Root vs shopify-theme/)
console.log('\n6. Verifying Directory Parity:');
const dirsToCompare = ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];
let mismatches = 0;

dirsToCompare.forEach(dir => {
  const rootFiles = fs.readdirSync(dir);
  rootFiles.forEach(file => {
    const rootPath = path.join(dir, file);
    const themePath = path.join('shopify-theme', dir, file);
    if (fs.statSync(rootPath).isFile()) {
      if (!fs.existsSync(themePath)) {
        mismatches++;
        console.error(`  [MISMATCH] Missing in theme: ${themePath}`);
      } else {
        const rootBuf = fs.readFileSync(rootPath);
        const themeBuf = fs.readFileSync(themePath);
        if (!rootBuf.equals(themeBuf)) {
          mismatches++;
          console.error(`  [MISMATCH] Content mismatch: ${rootPath} vs ${themePath}`);
        }
      }
    }
  });
});

assert(mismatches === 0, `Root and shopify-theme/ are in 100% byte parity (0 mismatches)`);

console.log('\n================================================================');
console.log(`PHASE 12 SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log('================================================================\n');

process.exit(failed > 0 ? 1 : 0);

