const fs = require('fs');

// Check that files exist and contain key reference tokens
const indexHtml = fs.readFileSync('preview/index.html', 'utf8');
const productHtml = fs.readFileSync('preview/product.html', 'utf8');
const adminHtml = fs.readFileSync('preview/admin.html', 'utf8');

console.log('--- Testing preview/index.html (Reference 1 Replica) ---');
console.log('Contains KAYRA:', indexHtml.includes('KAYRA'));
console.log('Contains hero split:', indexHtml.includes('hero-split-grid') && indexHtml.includes('PREMIUM SKINCARE BRAND'));
console.log('Contains benefits strip:', indexHtml.includes('benefits-strip-grid') && indexHtml.includes('SKIN QUIZ'));
console.log('Contains category cards:', indexHtml.includes('category-grid') && indexHtml.includes('CLEANSERS'));
console.log('Contains Bento Row 1:', indexHtml.includes('bento-card-ritual') && indexHtml.includes('bento-card-ingredient'));
console.log('Contains Bento Row 2:', indexHtml.includes('bento-card-routine') && indexHtml.includes('bento-card-journal'));
console.log('Contains Subscribe & Save:', indexHtml.includes('subscribe-banner-card') && indexHtml.includes('NEVER RUN LOW'));
console.log('Contains FAQ:', indexHtml.includes('faq-grid-2col') && indexHtml.includes('Are your products suitable for sensitive skin?'));

console.log('\n--- Testing preview/product.html (Reference 2 Replica) ---');
console.log('Contains KAYRA Beauty:', productHtml.includes('KAYRA Beauty'));
console.log('Contains Green Announcement Bar:', productHtml.includes('announcement-bar-ref2') && productHtml.includes('Call Us: +123-456-789'));
console.log('Contains Breadcrumb Shop:', productHtml.includes('breadcrumb-band') && productHtml.includes('Shop'));
console.log('Contains SilkSkin Serum:', productHtml.includes('SilkSkin Serum') && productHtml.includes('In Stock'));
console.log('Contains 4.8 Rating & Gold Stars:', productHtml.includes('4.8') && productHtml.includes('245 Review'));
console.log('Contains $48.00 Price:', productHtml.includes('$48.00') && productHtml.includes('$60.00'));
console.log('Contains Volume Pills:', productHtml.includes('30 ml') && productHtml.includes('100ml'));
console.log('Contains Pill Buttons:', productHtml.includes('btn-atc-pill') && productHtml.includes('btn-buynow-pill'));
console.log('Contains Review Breakdown:', productHtml.includes('review-breakdown-card') && productHtml.includes('5 Star'));
console.log('Contains Review List:', productHtml.includes('Kristin Watson') && productHtml.includes('Jenny Wilson'));

console.log('\n--- Testing preview/admin.html (Merchant Admin) ---');
console.log('No NaN in total:', !adminHtml.includes('Number(o.total)'));
console.log('Contains Theme Settings:', adminHtml.includes('tab-theme-all'));
console.log('Contains Orders:', adminHtml.includes('tab-orders'));
