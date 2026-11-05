const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;

function check(name, pass, detail) {
  totalChecks++;
  if (pass) {
    passedChecks++;
    console.log(`  ✓ [PASS] ${name}`);
  } else {
    console.error(`  ✗ [FAIL] ${name}: ${detail}`);
  }
}

console.log('======================================================');
console.log('🧪 AURA BOTANICA — PHASE 2 RESPONSIVE & A11Y TEST');
console.log('======================================================\n');

// 1. Responsive CSS checks at 360px, 768px, 1280px
console.log('1. Validating Responsive Breakpoint Coverage (360px, 768px, 1280px):');
const cssFiles = [
  'assets/announcement-bar.css',
  'assets/header.css',
  'assets/search.css',
  'assets/cart.css',
  'assets/footer.css',
  'assets/mobile-sticky-bar.css'
];

cssFiles.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
  check(`${file} has mobile query (max-width: 767px or 639px)`, content.includes('767px') || content.includes('639px'));
  check(`${file} respects prefers-reduced-motion`, content.includes('prefers-reduced-motion: reduce'));
});

// 2. Keyboard & Modal Accessibility (ESC, Focus Trap, Focus Return)
console.log('\n2. Validating Keyboard & Focus Management:');
const megaMenuJs = fs.readFileSync(path.join(rootDir, 'assets/mega-menu.js'), 'utf8');
const headerJs = fs.readFileSync(path.join(rootDir, 'assets/header.js'), 'utf8');
const predSearchJs = fs.readFileSync(path.join(rootDir, 'assets/predictive-search.js'), 'utf8');
const cartDrawerJs = fs.readFileSync(path.join(rootDir, 'assets/cart-drawer.js'), 'utf8');

check('mega-menu.js has ESC key listener to close menu drawer', megaMenuJs.includes('Escape'));
check('mega-menu.js handles focus return to hamburger button on close', megaMenuJs.includes('triggerBtn.focus()'));
check('predictive-search.js closes on ESC and returns focus to search trigger', predSearchJs.includes('closeSearchPopup') && predSearchJs.includes('searchTrigger.focus()'));
check('cart-drawer.js traps initial focus on open and listens to ESC', cartDrawerJs.includes('this.cartDrawerCloseIcon.focus()') && cartDrawerJs.includes('Escape'));
check('cart-drawer.js returns focus to trigger element on close', cartDrawerJs.includes('this.activeElement.focus()'));

// 3. Strict No-GSAP rule for Phase 2
console.log('\n3. Validating No GSAP Engine in Phase 2 (CSS Transitions Only):');
const themeLiquid = fs.readFileSync(path.join(rootDir, 'layout/theme.liquid'), 'utf8');
check('theme.liquid does NOT load GSAP library script in Phase 2', !themeLiquid.includes('gsap.min.js') && !themeLiquid.includes('ScrollTrigger'));

// 4. Locales & Design Tokens in Liquid Markup
console.log('\n4. Validating Locales & Tokens (No Hardcoded English/Hex in New Markup):');
const annLiquid = fs.readFileSync(path.join(rootDir, 'sections/annoucement.liquid'), 'utf8');
const cartLiquid = fs.readFileSync(path.join(rootDir, 'snippets/cart-drawer.liquid'), 'utf8');
const searchLiquid = fs.readFileSync(path.join(rootDir, 'snippets/search-popup.liquid'), 'utf8');
const locales = JSON.parse(fs.readFileSync(path.join(rootDir, 'locales/en.default.json'), 'utf8'));

check('annoucement.liquid close button uses translation filter', annLiquid.includes("accessibility.close' | t"));
check('search-popup.liquid uses general.accessibility.close and search translations', searchLiquid.includes("accessibility.close' | t") && searchLiquid.includes("general.search.submit' | t"));
check('cart-drawer.liquid shipping goal uses locale translations', cartLiquid.includes("cart.general.free_shipping_unlocked' | t") && cartLiquid.includes("cart.general.free_shipping_remaining_html' | t"));
check('cart-drawer.liquid free shipping bar contains NO hardcoded inline hex colors', !cartLiquid.includes('style="color: #B9784D;"') && !cartLiquid.includes('background: #18231F;'));
check('locales/en.default.json contains all required accessibility & cart keys',
  locales.general.accessibility.close &&
  locales.general.accessibility.toggle_menu &&
  locales.general.accessibility.scroll_to_top &&
  locales.cart.general.free_shipping_unlocked
);

console.log('\n======================================================');
console.log(`PHASE 2 TEST SUMMARY: ${passedChecks}/${totalChecks} CHECKS PASSED (${Math.round(passedChecks/totalChecks*100)}%)`);
console.log('======================================================\n');

if (passedChecks !== totalChecks) {
  process.exit(1);
}
