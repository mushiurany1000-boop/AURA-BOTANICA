/**
 * Shopify OS 2.0 Theme Validation Test Suite
 * Validates JSON templates, Liquid section schemas, section groups, snippets, config, and assets.
 */

const fs = require('fs');
const path = require('path');

const THEME_DIR = path.join(__dirname, '..', 'shopify-theme');

const results = {
  passed: 0,
  failed: 0,
  errors: []
};

function pass(msg) {
  results.passed++;
  console.log(`  [PASS] ${msg}`);
}

function fail(msg, err) {
  results.failed++;
  results.errors.push(`${msg} -> ${err ? err.message || err : ''}`);
  console.error(`  [FAIL] ${msg}: ${err ? err.message || err : ''}`);
}

console.log('====================================================');
console.log('--- AURA BOTANICA SHOPIFY OS 2.0 THEME VALIDATOR ---');
console.log('====================================================\n');

// 1. Verify Directory Structure
console.log('1. Checking Theme Directory Structure:');
const requiredDirs = ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];
for (const dir of requiredDirs) {
  const fullPath = path.join(THEME_DIR, dir);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    pass(`Directory '${dir}' exists`);
  } else {
    fail(`Missing required directory '${dir}'`);
  }
}

// 2. Check layout/theme.liquid
console.log('\n2. Validating layout/theme.liquid:');
const themeLiquidPath = path.join(THEME_DIR, 'layout', 'theme.liquid');
if (fs.existsSync(themeLiquidPath)) {
  const content = fs.readFileSync(themeLiquidPath, 'utf8');
  if (content.includes('content_for_header')) {
    pass("Contains '{{ content_for_header }}'");
  } else {
    fail("Missing '{{ content_for_header }}' in theme.liquid");
  }

  if (content.includes('content_for_layout')) {
    pass("Contains '{{ content_for_layout }}'");
  } else {
    fail("Missing '{{ content_for_layout }}' in theme.liquid");
  }

  if (content.includes("sections 'header-group'")) {
    pass("Contains section group '{% sections \\'header-group\\' %}'");
  } else {
    fail("Missing '{% sections \\'header-group\\' %}' in theme.liquid");
  }

  if (content.includes("sections 'footer-group'")) {
    pass("Contains section group '{% sections \\'footer-group\\' %}'");
  } else {
    fail("Missing '{% sections \\'footer-group\\' %}' in theme.liquid");
  }

  if (content.includes('theme.css') && content.includes('theme.js')) {
    pass("Links 'theme.css' and 'theme.js' via asset_url");
  } else {
    fail("Missing theme.css or theme.js assets in theme.liquid");
  }
} else {
  fail('Missing layout/theme.liquid');
}

// 3. Validate Section Groups
console.log('\n3. Validating Section Groups (OS 2.0):');
const sectionGroups = ['header-group.json', 'footer-group.json'];
for (const sg of sectionGroups) {
  const sgPath = path.join(THEME_DIR, 'sections', sg);
  if (fs.existsSync(sgPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(sgPath, 'utf8'));
      if (parsed.type && parsed.sections && Array.isArray(parsed.order)) {
        pass(`Section group '${sg}' has valid JSON structure (type: ${parsed.type})`);
      } else {
        fail(`Section group '${sg}' missing required OS 2.0 fields (type, sections, order)`);
      }
    } catch (e) {
      fail(`Section group '${sg}' invalid JSON`, e);
    }
  } else {
    fail(`Missing section group '${sg}'`);
  }
}

// 4. Validate All Liquid Section Schemas
console.log('\n4. Validating Sections & {% schema %} blocks:');
const sectionsDir = path.join(THEME_DIR, 'sections');
const sectionFiles = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.liquid'));
const sectionSchemas = {};

for (const sf of sectionFiles) {
  const content = fs.readFileSync(path.join(sectionsDir, sf), 'utf8');
  const schemaMatch = content.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
  if (schemaMatch) {
    try {
      const parsed = JSON.parse(schemaMatch[1].trim());
      sectionSchemas[sf.replace('.liquid', '')] = parsed;
      pass(`Section '${sf}' contains valid JSON schema (name: "${parsed.name}")`);
    } catch (e) {
      fail(`Section '${sf}' schema parse error`, e);
    }
  } else {
    fail(`Section '${sf}' missing {% schema %} block`);
  }
}

// 5. Validate Templates and Referenced Sections
console.log('\n5. Validating Templates (OS 2.0 JSON) & Section References:');
const templatesDir = path.join(THEME_DIR, 'templates');
const templateFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.json'));

const requiredTemplates = [
  'index.json',
  'product.json',
  'collection.json',
  'cart.json',
  'search.json',
  'page.json',
  'page.contact.json',
  '404.json'
];

for (const req of requiredTemplates) {
  if (templateFiles.includes(req)) {
    pass(`Required template '${req}' exists`);
  } else {
    fail(`Missing required template '${req}'`);
  }
}

for (const tf of templateFiles) {
  try {
    const raw = fs.readFileSync(path.join(templatesDir, tf), 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed.sections || !Array.isArray(parsed.order)) {
      fail(`Template '${tf}' missing 'sections' object or 'order' array`);
      continue;
    }

    let allSectionsExist = true;
    for (const [secKey, secVal] of Object.entries(parsed.sections)) {
      const secType = secVal.type;
      const secFile = path.join(sectionsDir, `${secType}.liquid`);
      if (!fs.existsSync(secFile)) {
        fail(`Template '${tf}' references non-existent section '${secType}.liquid' (key: ${secKey})`);
        allSectionsExist = false;
      }
    }

    if (allSectionsExist) {
      pass(`Template '${tf}' parsed successfully with valid section references (${parsed.order.length} sections)`);
    }
  } catch (e) {
    fail(`Template '${tf}' JSON parse error`, e);
  }
}

// 6. Validate Config & Locales
console.log('\n6. Validating Config & Locales:');
const configFiles = ['settings_schema.json', 'settings_data.json'];
for (const cf of configFiles) {
  const cfPath = path.join(THEME_DIR, 'config', cf);
  if (fs.existsSync(cfPath)) {
    try {
      JSON.parse(fs.readFileSync(cfPath, 'utf8'));
      pass(`Config '${cf}' parsed successfully`);
    } catch (e) {
      fail(`Config '${cf}' JSON parse error`, e);
    }
  } else {
    fail(`Missing config '${cf}'`);
  }
}

const localePath = path.join(THEME_DIR, 'locales', 'en.default.json');
if (fs.existsSync(localePath)) {
  try {
    JSON.parse(fs.readFileSync(localePath, 'utf8'));
    pass("Locale 'en.default.json' parsed successfully");
  } catch (e) {
    fail("Locale 'en.default.json' JSON parse error", e);
  }
} else {
  fail("Missing locales/en.default.json");
}

// 7. Validate Assets
console.log('\n7. Validating Assets:');
const requiredAssets = ['theme.css', 'theme.js', 'matcha-world.ttf', 'matcha-world.otf'];
for (const asset of requiredAssets) {
  const assetPath = path.join(THEME_DIR, 'assets', asset);
  if (fs.existsSync(assetPath) && fs.statSync(assetPath).size > 0) {
    const sizeKb = (fs.statSync(assetPath).size / 1024).toFixed(1);
    pass(`Asset '${asset}' exists (${sizeKb} KB)`);
  } else {
    fail(`Missing or empty asset '${asset}'`);
  }
}

// 8. Validate Snippets
console.log('\n8. Validating Snippets:');
const requiredSnippets = [
  'responsive-image.liquid',
  'product-card.liquid',
  'price.liquid',
  'cart-drawer.liquid',
  'icon-cart.liquid',
  'icon-search.liquid',
  'icon-star.liquid',
  'icon-leaf.liquid',
  'icon-close.liquid'
];
for (const snip of requiredSnippets) {
  const snipPath = path.join(THEME_DIR, 'snippets', snip);
  if (fs.existsSync(snipPath)) {
    pass(`Snippet '${snip}' exists`);
  } else {
    fail(`Missing snippet '${snip}'`);
  }
}

// Summary Report
console.log('\n====================================================');
console.log(`VALIDATION SUMMARY: ${results.passed} PASSED, ${results.failed} FAILED`);
console.log('====================================================');

if (results.failed > 0) {
  console.error('\nFailures:');
  results.errors.forEach(err => console.error(` - ${err}`));
  process.exit(1);
} else {
  console.log('\nAll Shopify OS 2.0 theme verification checks passed with 100% success!');
  process.exit(0);
}

