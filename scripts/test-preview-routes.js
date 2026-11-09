const fs = require('fs');
const path = require('path');

let totalChecks = 0;
let passedChecks = 0;

function assert(label, condition, detail = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✓ [PASS] ${label}`);
  } else {
    console.error(`  ✗ [FAIL] ${label}${detail ? ' -> ' + detail : ''}`);
  }
}

console.log('======================================================');
console.log('🧪 KAYRA BEAUTY — COMPREHENSIVE STOREFRONT & PREVIEW SUITE');
console.log('======================================================\n');

// 1. Test preview/index.html (Noir Velvet & Rose Champagne - Reference 6/3)
console.log('--- 1. Testing preview/index.html (Noir Velvet & Rose Champagne) ---');
const indexHtml = fs.readFileSync('preview/index.html', 'utf8');
assert('Brand name KAYRA present in header', indexHtml.includes('KAYRA'));
assert('Hero massive headline with script intent present', indexHtml.includes('BEAUTY') && indexHtml.includes('INTENT'));
assert('Neo-classical Arch Portal Frame present', indexHtml.includes('hero-arch-window'));
assert('Floating circular monogram seal present', indexHtml.includes('hero-circular-seal') && indexHtml.includes('KB'));
assert('4-Column credentials strip with Kayra Atelier signature present', indexHtml.includes('ATELIER ORIGIN') && indexHtml.includes('Kayra Atelier'));
assert('3 wide blush cards for featured formulations present', indexHtml.includes('featured-cards-grid') && indexHtml.includes('LUMINA'));
assert('5-Step Approach / Ritual numbered columns present', indexHtml.includes('approach-grid') && indexHtml.includes('01') && indexHtml.includes('DISCOVER'));
assert('Clinical proof / case studies present', indexHtml.includes('cases-grid') && indexHtml.includes('LUMINA CLINICAL TRIAL'));
assert('What We Formulate 4-pillar cards present', indexHtml.includes('pillars-grid') && indexHtml.includes('BIOCOMPATIBLE ACTIVE SCIENCE'));
assert('Grand CTA Noir Footer with velvet floral arch present', indexHtml.includes('footer-arch-window') && indexHtml.includes('atelier@kayrabeauty.com'));
assert('Slide-out Cart Drawer present in index.html', indexHtml.includes('cart-drawer-pane') && indexHtml.includes('shippingProgressBar'));
assert('Floating theme switcher pill present in index.html', indexHtml.includes('floating-theme-bar'));

// 2. Test preview/terracotta.html (Terracotta Atelier - Reference 1/4)
console.log('\n--- 2. Testing preview/terracotta.html (Terracotta Atelier) ---');
const terraHtml = fs.readFileSync('preview/terracotta.html', 'utf8');
assert('Terracotta hero split present', terraHtml.includes('hero-split-grid') && terraHtml.includes('PREMIUM SKINCARE BRAND'));
assert('Benefits strip present', terraHtml.includes('benefits-strip-grid') && terraHtml.includes('SKIN QUIZ'));
assert('Category cards present', terraHtml.includes('category-grid') && terraHtml.includes('CLEANSERS'));
assert('Bento Row 1 ritual & squalane spotlight present', terraHtml.includes('bento-card-ritual') && terraHtml.includes('bento-card-ingredient'));
assert('Bento Row 2 routine finder & journal present', terraHtml.includes('bento-card-routine') && terraHtml.includes('bento-card-journal'));
assert('Subscribe & Save banner present', terraHtml.includes('subscribe-banner-card') && terraHtml.includes('NEVER RUN LOW'));
assert('FAQ accordion present', terraHtml.includes('faq-grid-2col'));
assert('Slide-out Cart Drawer present in terracotta.html', terraHtml.includes('cart-drawer-pane'));
assert('Floating theme switcher pill present in terracotta.html', terraHtml.includes('floating-theme-bar'));

// 3. Test preview/product.html (SilkSkin Serum - Reference 2/5)
console.log('\n--- 3. Testing preview/product.html (SilkSkin Serum Product Page) ---');
const productHtml = fs.readFileSync('preview/product.html', 'utf8');
assert('Brand name KAYRA present in header', productHtml.includes('KAYRA Beauty'));
assert('Green top announcement bar present', productHtml.includes('announcement-bar-ref2') && productHtml.includes('Call Us: +123-456-789'));
assert('Breadcrumb navigation present', productHtml.includes('breadcrumb-band') && productHtml.includes('Shop'));
assert('SilkSkin Serum product title present', productHtml.includes('SilkSkin Serum'));
assert('In-stock badge present', productHtml.includes('badge-in-stock') && productHtml.includes('In Stock'));
assert('4.8 star rating and review count present', productHtml.includes('4.8') && productHtml.includes('245 Review'));
assert('Regular and strike-through pricing present', productHtml.includes('$48.00') && productHtml.includes('$60.00'));
assert('Volume pill buttons (30ml, 60ml, 80ml, 100ml) present', productHtml.includes('30 ml') && (productHtml.includes('100 ml') || productHtml.includes('100ml')));
assert('Add To Cart and Buy Now pill buttons present', productHtml.includes('btn-atc-pill') && productHtml.includes('btn-buynow-pill'));
assert('Add To Cart triggers cart drawer rather than raw alert', productHtml.includes('addToCartFromProductPage()'));
assert('Review breakdown score and 5-to-1 star progress bars present', productHtml.includes('review-breakdown-card') && productHtml.includes('5 Star'));
assert('Customer review cards with verified buyer tags present', productHtml.includes('Kristin Watson') && productHtml.includes('Jenny Wilson'));
assert('Slide-out Cart Drawer present in product.html', productHtml.includes('cart-drawer-pane'));
assert('Floating theme switcher pill present in product.html', productHtml.includes('floating-theme-bar'));

// 4. Test preview/admin.html (Merchant Admin Portal)
console.log('\n--- 4. Testing preview/admin.html (Merchant Admin Portal) ---');
const adminHtml = fs.readFileSync('preview/admin.html', 'utf8');
assert('Zero NaN values in orders table calculation', !adminHtml.includes('Number(o.total)') || adminHtml.includes('Number(o.total || o.total_price || 0)'));
assert('Theme Settings management tab present', adminHtml.includes('tab-theme-all'));
assert('Orders list tab present', adminHtml.includes('tab-orders'));
assert('KAYRA brand logo in admin header', adminHtml.includes('KAYRA'));
assert('Download theme zip links point to kayra-beauty-shopify-theme.zip', adminHtml.includes('kayra-beauty-shopify-theme.zip'));

// 5. Test ZIP file integrity
console.log('\n--- 5. Testing Installable Theme ZIP Archives ---');
const zipPrimary = path.join(__dirname, '..', 'kayra-beauty-shopify-theme.zip');
assert('kayra-beauty-shopify-theme.zip exists', fs.existsSync(zipPrimary));
if (fs.existsSync(zipPrimary)) {
  const stat = fs.statSync(zipPrimary);
  assert('kayra-beauty-shopify-theme.zip is valid non-empty archive (> 1MB)', stat.size > 1000000, `Size: ${(stat.size/1024).toFixed(1)} KB`);
}

console.log('\n======================================================');
console.log(`PREVIEW SUITE SUMMARY: ${passedChecks}/${totalChecks} CHECKS PASSED (${((passedChecks/totalChecks)*100).toFixed(1)}%)`);
console.log('======================================================\n');

process.exit(passedChecks === totalChecks ? 0 : 1);
