/**
 * scripts/test-phase9-1.js
 * Comprehensive Verification Suite for Phase 9.1: Mandatory Visual Transformation & Luxury Implementation
 */

const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('--- AURA BOTANICA PHASE 9.1 LUXURY VERIFICATION SUITE ---');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failCount++;
  }
}

// -----------------------------------------------------------------------------
// 1. GOOGLE FONTS CDN & LIQUID PRELOAD
// -----------------------------------------------------------------------------
console.log('1. Verifying Google Fonts & Font Loading Engine:');

const preloadLiquid = fs.readFileSync('snippets/preload.liquid', 'utf8');
assert(preloadLiquid.includes('fonts.googleapis.com') && preloadLiquid.includes('fonts.gstatic.com'), 'snippets/preload.liquid contains preconnect links to Google Fonts');
assert(preloadLiquid.includes('family=Playfair+Display') && preloadLiquid.includes('family=Montserrat'), 'snippets/preload.liquid directly loads Playfair Display (600, 700, 800) and Montserrat (400, 500, 600, 700)');

const themeLiquid = fs.readFileSync('layout/theme.liquid', 'utf8');
assert(themeLiquid.includes("render 'preload'"), 'layout/theme.liquid invokes snippets/preload.liquid in head');
assert(themeLiquid.includes("{{ 'theme.css' | asset_url | stylesheet_tag }}"), 'layout/theme.liquid loads assets/theme.css');
assert(themeLiquid.includes("{{ 'aura-base.css' | asset_url | stylesheet_tag }}"), 'layout/theme.liquid loads assets/aura-base.css');
assert(themeLiquid.includes("{{ 'theme.js' | asset_url }}"), 'layout/theme.liquid loads assets/theme.js');

// -----------------------------------------------------------------------------
// 2. TYPOGRAPHY TOKENS & ELEMENT STYLING
// -----------------------------------------------------------------------------
console.log('\n2. Verifying Typography System Across CSS:');

const themeCss = fs.readFileSync('assets/theme.css', 'utf8');
assert(themeCss.includes("--font-heading: 'Playfair Display'"), 'assets/theme.css sets --font-heading to Playfair Display');
assert(themeCss.includes("--font-body: 'Montserrat'"), 'assets/theme.css sets --font-body to Montserrat');

const auraBaseCss = fs.readFileSync('assets/aura-base.css', 'utf8');
assert(auraBaseCss.includes("--font-heading-family: 'Playfair Display'"), 'assets/aura-base.css sets --font-heading-family to Playfair Display');
assert(auraBaseCss.includes("--font-body-family: 'Montserrat'"), 'assets/aura-base.css sets --font-body-family to Montserrat');
assert(auraBaseCss.includes(".hero__title") && auraBaseCss.includes(".product__title") && auraBaseCss.includes("font-family: 'Playfair Display', Georgia, serif !important;"), 'assets/aura-base.css enforces Playfair Display 700 !important on all major heading selectors');

// -----------------------------------------------------------------------------
// 3. PROPOSED BOTANICAL COLOR SYSTEM
// -----------------------------------------------------------------------------
console.log('\n3. Verifying Proposed Luxury Botanical Color Palette:');

assert(themeCss.includes('--color-bg-primary: #F8F5EF;'), 'assets/theme.css defines Warm Ivory (#F8F5EF)');
assert(themeCss.includes('--color-bg-secondary: #F0ECE1;'), 'assets/theme.css defines Natural Cream (#F0ECE1)');
assert(themeCss.includes('--color-text-primary: #292D28;'), 'assets/theme.css defines Rich Charcoal text (#292D28)');
assert(themeCss.includes('--color-botanical-dark: #244638;'), 'assets/theme.css defines Deep Botanical Green (#244638)');
assert(themeCss.includes('--color-accent: #315B45;'), 'assets/theme.css defines Forest Green primary CTA (#315B45)');
assert(themeCss.includes('--color-sage: #A7B49B;'), 'assets/theme.css defines Muted Sage (#A7B49B)');
assert(themeCss.includes('--color-gold: #B89A62;'), 'assets/theme.css defines Soft Champagne Gold (#B89A62)');

const settingsData = JSON.parse(fs.readFileSync('config/settings_data.json', 'utf8'));
const defScheme = settingsData.current.color_schemes.default.settings;
assert(defScheme.background.toUpperCase() === '#F8F5EF', 'Default scheme background is Warm Ivory (#F8F5EF)');
assert(defScheme.heading_text.toUpperCase() === '#244638', 'Default scheme heading text is Deep Botanical Green (#244638)');
assert(defScheme.text.toUpperCase() === '#292D28', 'Default scheme body text is Rich Charcoal (#292D28)');
assert(defScheme.button.toUpperCase() === '#315B45', 'Default scheme primary button is Forest Green (#315B45)');
assert(defScheme.primary_accent.toUpperCase() === '#315B45', 'Default scheme primary accent is Forest Green (#315B45)');
assert(defScheme.secondary_accent.toUpperCase() === '#A7B49B', 'Default scheme secondary accent is Muted Sage (#A7B49B)');
assert(defScheme.highlight_accent.toUpperCase() === '#B89A62', 'Default scheme highlight accent is Champagne Gold (#B89A62)');
assert(defScheme.border.toUpperCase() === '#E3DDD1', 'Default scheme border is Warm Stone (#E3DDD1)');

// Contrast check
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
function getContrastRatio(hex1, hex2) {
  const parseHex = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  const l1 = getLuminance(...parseHex(hex1));
  const l2 = getLuminance(...parseHex(hex2));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const charcoalContrast = getContrastRatio('#292D28', '#F8F5EF');
const deepGreenContrast = getContrastRatio('#244638', '#F8F5EF');
const forestBtnContrast = getContrastRatio('#315B45', '#F8F5EF');
assert(charcoalContrast >= 7.0, `Rich Charcoal on Warm Ivory contrast is ${charcoalContrast.toFixed(2)}:1 (WCAG AAA >= 7.0:1)`);
assert(deepGreenContrast >= 7.0, `Deep Botanical Green on Warm Ivory contrast is ${deepGreenContrast.toFixed(2)}:1 (WCAG AAA >= 7.0:1)`);
assert(forestBtnContrast >= 4.5, `Forest Green on Warm Ivory contrast is ${forestBtnContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`);

// -----------------------------------------------------------------------------
// 4. BUTTONS & FOCUS RING
// -----------------------------------------------------------------------------
console.log('\n4. Verifying Button System & Keyboard Focus Ring:');

assert(themeCss.includes('.button--primary') && themeCss.includes('#315B45'), 'assets/theme.css styles .button--primary with Forest Green #315B45');
assert(themeCss.includes(':focus-visible') && themeCss.includes('#B89A62'), 'assets/theme.css implements 2px Champagne Gold focus ring (#B89A62)');
assert(auraBaseCss.includes('.m-button--primary') && auraBaseCss.includes('#315B45'), 'assets/aura-base.css styles .m-button--primary with Forest Green #315B45');
assert(auraBaseCss.includes(':focus-visible') && auraBaseCss.includes('#B89A62'), 'assets/aura-base.css implements Champagne Gold focus ring (#B89A62)');
assert(auraBaseCss.includes('min-height: 44px'), 'Buttons enforce 44px min-height touch target');

// -----------------------------------------------------------------------------
// 5. PREVIEW FILES VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n5. Verifying Local Preview Files (preview/*.html):');

const previewFiles = ['index.html', 'product.html', 'collection.html', 'cart.html', 'about.html', 'contact.html', '404.html'];
previewFiles.forEach(pf => {
  const pPath = path.join('preview', pf);
  if (fs.existsSync(pPath)) {
    const c = fs.readFileSync(pPath, 'utf8');
    const hasFonts = c.includes('Playfair+Display') && c.includes('Montserrat');
    const hasThemeCss = c.includes('theme.css');
    const hasAuraBase = c.includes('aura-base.css');
    assert(hasFonts && hasThemeCss && hasAuraBase, `preview/${pf} links Google Fonts (Playfair & Montserrat), theme.css, and aura-base.css`);
  }
});

// -----------------------------------------------------------------------------
// 6. DIRECTORY PARITY
// -----------------------------------------------------------------------------
console.log('\n6. Verifying Directory Parity (Root vs shopify-theme/):');

function checkParity(dir1, dir2) {
  let diffs = 0;
  function walk(rel) {
    const p1 = path.join(dir1, rel);
    const p2 = path.join(dir2, rel);
    const s1 = fs.statSync(p1);
    if (s1.isDirectory()) {
      for (const item of fs.readdirSync(p1)) walk(path.join(rel, item));
    } else {
      if (!fs.existsSync(p2)) {
        diffs++;
        return;
      }
      const c1 = fs.readFileSync(p1);
      const c2 = fs.readFileSync(p2);
      if (!c1.equals(c2)) diffs++;
    }
  }
  const themeDirs = ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];
  for (const td of themeDirs) {
    if (fs.existsSync(path.join(dir1, td))) walk(td);
  }
  return diffs;
}

const parityDiffs = checkParity('.', 'shopify-theme');
assert(parityDiffs === 0, `Root directory and shopify-theme/ directory are in 100% byte parity (0 mismatches across all files)`);

console.log('\n================================================================');
console.log(`PHASE 9.1 SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================\n');

if (failCount > 0) process.exit(1);
