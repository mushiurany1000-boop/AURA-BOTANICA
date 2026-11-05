/**
 * scripts/test-phase9-design.js
 * Automated Verification Suite for Phase 9: Luxury Visual Refinement & Theme Customization
 */

const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('--- AURA BOTANICA PHASE 9 LUXURY DESIGN & CUSTOMIZATION TEST ---');
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
// 1. TYPOGRAPHY SYSTEM
// -----------------------------------------------------------------------------
console.log('1. Verifying Typography System:');

const settingsData = JSON.parse(fs.readFileSync('config/settings_data.json', 'utf8'));
const settingsSchema = JSON.parse(fs.readFileSync('config/settings_schema.json', 'utf8'));

assert(settingsData.current.type_header_font === 'playfair_display_n7', 'Current header font is Playfair Display Bold 700 (playfair_display_n7)');
assert(settingsData.current.type_base_font === 'montserrat_n4', 'Current base font is Montserrat Regular 400 (montserrat_n4)');
assert(settingsData.current.btn_weight === '600', 'Current button font weight is 600 Semi-bold');

let allPresetsHaveFonts = true;
if (settingsData.presets) {
  for (const [name, p] of Object.entries(settingsData.presets)) {
    if (p.type_header_font !== 'playfair_display_n7' || p.type_base_font !== 'montserrat_n4' || p.btn_weight !== '600') {
      allPresetsHaveFonts = false;
    }
  }
}
assert(allPresetsHaveFonts, 'All settings presets (Botanical Ivory, Forest Night, Clay Rose, Default) configured with Playfair Display & Montserrat');

const typoGroup = settingsSchema.find(g => g.name === 'Typography');
const headerDefault = typoGroup.settings.find(s => s.id === 'type_header_font').default;
const baseDefault = typoGroup.settings.find(s => s.id === 'type_base_font').default;
const btnWeightDefault = typoGroup.settings.find(s => s.id === 'btn_weight').default;
assert(headerDefault === 'playfair_display_n7', 'Typography schema default header font is playfair_display_n7');
assert(baseDefault === 'montserrat_n4', 'Typography schema default base font is montserrat_n4');
assert(btnWeightDefault === '600', 'Typography schema default button weight is 600');

const fontFaceLiquid = fs.readFileSync('snippets/font-face.liquid', 'utf8');
assert(fontFaceLiquid.includes("font_display: 'swap'"), "snippets/font-face.liquid applies font_display: 'swap' to eliminate layout shifts");
assert(fontFaceLiquid.includes("base_font_500") && fontFaceLiquid.includes("base_font_600"), "snippets/font-face.liquid loads Montserrat 500 (nav) and 600 (buttons)");
assert(fontFaceLiquid.includes("--font-stack-header") && fontFaceLiquid.includes("--font-stack-body"), "snippets/font-face.liquid exports --font-stack-header and --font-stack-body CSS variables");

const auraBaseCss = fs.readFileSync('assets/aura-base.css', 'utf8');
assert(auraBaseCss.includes("Playfair Display"), "assets/aura-base.css references Playfair Display in --font-heading-family");
assert(auraBaseCss.includes("Montserrat"), "assets/aura-base.css references Montserrat in --font-body-family");
assert(auraBaseCss.includes("--font-weight-heading: 700;"), "assets/aura-base.css sets --font-weight-heading: 700");
assert(auraBaseCss.includes("--font-weight-btn: 600;"), "assets/aura-base.css sets --font-weight-btn: 600");

// -----------------------------------------------------------------------------
// 2. BOTANICAL COLOR SYSTEM & THEME CUSTOMIZATION
// -----------------------------------------------------------------------------
console.log('\n2. Verifying Botanical Color System:');

const colorsGroup = settingsSchema.find(g => g.name === 'Colors');
const csg = colorsGroup.settings.find(s => s.type === 'color_scheme_group');
const hasPriAccent = csg.definition.some(d => d.id === 'primary_accent');
const hasSecAccent = csg.definition.some(d => d.id === 'secondary_accent');
const hasHiAccent = csg.definition.some(d => d.id === 'highlight_accent');
assert(hasPriAccent && hasSecAccent && hasHiAccent, 'settings_schema.json color_schemes definition includes primary_accent, secondary_accent, and highlight_accent');

const defScheme = settingsData.current.color_schemes.default.settings;
assert(defScheme.background.toUpperCase() === '#FCFBF7', 'Default background is Warm Ivory (#FCFBF7)');
assert(defScheme.background_secondary.toUpperCase() === '#F8F6F0', 'Default secondary background is Natural Cream (#F8F6F0)');
assert(defScheme.text.toUpperCase() === '#18231F', 'Default text is Deep Botanical Charcoal (#18231F)');
assert(defScheme.button.toUpperCase() === '#233831', 'Default primary button is Forest Green (#233831)');
assert(defScheme.primary_accent.toUpperCase() === '#233831', 'Default primary accent is Forest Green (#233831)');
assert(defScheme.secondary_accent.toUpperCase() === '#5B6E64', 'Default secondary accent is Muted Sage (#5B6E64)');
assert(defScheme.highlight_accent.toUpperCase() === '#B9784D', 'Default highlight accent is Warm Terracotta (#B9784D)');
assert(defScheme.border.toUpperCase() === '#E5DFD3', 'Default border is Natural Stone (#E5DFD3)');

const styleTagsLiquid = fs.readFileSync('snippets/style-tags.liquid', 'utf8');
assert(styleTagsLiquid.includes('--color-primary-accent') && styleTagsLiquid.includes('--color-secondary-accent') && styleTagsLiquid.includes('--color-highlight-accent'), 'snippets/style-tags.liquid exports RGB variables for botanical accents');

// Contrast calculations
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
  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (brighter + 0.05) / (darker + 0.05);
}

const textContrast = getContrastRatio('#18231F', '#FCFBF7');
const forestContrast = getContrastRatio('#233831', '#FCFBF7');
const btnTextContrast = getContrastRatio('#FCFBF7', '#233831');
assert(textContrast >= 7.0, `Primary Charcoal on Warm Ivory contrast is ${textContrast.toFixed(2)}:1 (exceeds WCAG AAA 7:1)`);
assert(forestContrast >= 7.0, `Forest Green on Warm Ivory contrast is ${forestContrast.toFixed(2)}:1 (exceeds WCAG AAA 7:1)`);
assert(btnTextContrast >= 7.0, `Warm Ivory text on Forest Green button contrast is ${btnTextContrast.toFixed(2)}:1 (exceeds WCAG AAA 7:1)`);

// -----------------------------------------------------------------------------
// 3. BUTTONS, FOCUS STATES & PRODUCT CARDS
// -----------------------------------------------------------------------------
console.log('\n3. Verifying Buttons, Focus States & Product Cards:');

assert(auraBaseCss.includes(".m-button--primary"), 'aura-base.css implements .m-button--primary styling');
assert(auraBaseCss.includes(".m-button--secondary"), 'aura-base.css implements .m-button--secondary outline styling');
assert(auraBaseCss.includes("outline: 2px solid var(--color-aura-copper"), 'aura-base.css implements 2px accessible focus ring on :focus-visible');
assert(auraBaseCss.includes("min-height: 44px;"), 'Buttons enforce 44px minimum touch target height for mobile a11y');

assert(settingsData.current.pcard_image_ratio === '4/5', 'settings_data.json configures pcard_image_ratio to 4/5');
assert(auraBaseCss.includes("aspect-ratio: var(--aspect-ratio, 4/5);"), 'Product cards enforce uniform 4:5 aspect ratio in CSS');
assert(auraBaseCss.includes("object-fit: cover;"), 'Product card images use object-fit: cover to prevent image distortion');

// -----------------------------------------------------------------------------
// 4. REALISTIC CONTENT & REMOVAL OF APPAREL RESIDUE
// -----------------------------------------------------------------------------
console.log('\n4. Verifying Realistic Storefront Copy & Cleanliness:');

const indexJson = fs.readFileSync('templates/index.json', 'utf8');
const listColJson = fs.readFileSync('templates/list-collections.json', 'utf8');
const gridMixJson = fs.readFileSync('templates/product.grid-mix-columns.json', 'utf8');

assert(!indexJson.includes('The ReCotton Tee'), 'templates/index.json free of apparel string "The ReCotton Tee"');
assert(!indexJson.includes('upgrade your wardrobe'), 'templates/index.json free of apparel string "upgrade your wardrobe"');
assert(!indexJson.includes('@minimog'), 'templates/index.json free of brand string "@minimog"');
assert(!listColJson.includes('upgrade your wardrobe'), 'templates/list-collections.json free of "upgrade your wardrobe"');
assert(!gridMixJson.includes('@minimog'), 'templates/product.grid-mix-columns.json free of "@minimog"');

// -----------------------------------------------------------------------------
// 5. RESPONSIVE DESIGN & OVERFLOW SAFETY
// -----------------------------------------------------------------------------
console.log('\n5. Verifying Responsive Architecture:');

assert(auraBaseCss.includes("overflow-x: hidden;"), 'assets/aura-base.css guards against horizontal overflow on html/body');
assert(auraBaseCss.includes("--font-size-hero: clamp("), 'Fluid clamp typography declared for hero');
assert(auraBaseCss.includes("--font-size-h1: clamp("), 'Fluid clamp typography declared for h1');
assert(auraBaseCss.includes("--font-size-h2: clamp("), 'Fluid clamp typography declared for h2');
assert(auraBaseCss.includes("--font-size-h3: clamp("), 'Fluid clamp typography declared for h3');
assert(auraBaseCss.includes("--space-md: clamp("), 'Fluid clamp spacing declared for responsive layouts');
assert(auraBaseCss.includes("@media (prefers-reduced-motion: reduce)"), 'Full reduced motion accessibility overrides active');

// -----------------------------------------------------------------------------
// 6. ROOT VS SHOPIFY-THEME DIRECTORY PARITY
// -----------------------------------------------------------------------------
console.log('\n6. Verifying Bit-for-Bit Parity (Root vs shopify-theme/):');

function checkParity(dir1, dir2) {
  let diffs = 0;
  function walk(rel) {
    const p1 = path.join(dir1, rel);
    const p2 = path.join(dir2, rel);
    const s1 = fs.statSync(p1);
    if (s1.isDirectory()) {
      for (const item of fs.readdirSync(p1)) {
        walk(path.join(rel, item));
      }
    } else {
      if (!fs.existsSync(p2)) {
        diffs++;
        return;
      }
      const c1 = fs.readFileSync(p1);
      const c2 = fs.readFileSync(p2);
      if (!c1.equals(c2)) {
        diffs++;
      }
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
console.log(`SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================\n');

if (failCount > 0) {
  process.exit(1);
}
