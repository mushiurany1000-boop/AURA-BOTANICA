const fs = require('fs');
const path = require('path');

const THEME_DIR = path.join(__dirname, '..', 'shopify-theme');

console.log('======================================================');
console.log('🧪 AURA BOTANICA — DEEP THEME EDITOR COMPATIBILITY TEST');
console.log('======================================================\n');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function check(label, condition, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✓ [PASS] ${label}`);
  } else {
    failedChecks++;
    console.log(`  ✗ [FAIL] ${label}${details ? ' -> ' + details : ''}`);
  }
}

// 1. Settings Schema & Data Validation
console.log('1. Validating Global Settings Registration & Presets:');
const schemaPath = path.join(THEME_DIR, 'config', 'settings_schema.json');
const dataPath = path.join(THEME_DIR, 'config', 'settings_data.json');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

check('settings_schema.json is valid JSON array', Array.isArray(schema));
check('settings_data.json is valid JSON object with current', !!data.current && typeof data.current === 'object');

const schemaCategories = schema.filter(s => s.name && s.name !== 'theme_info');
check(`Schema contains 24 configuration categories (${schemaCategories.length} found)`, schemaCategories.length === 24);

// Check all schema settings against settings_data.json
const declaredSettings = [];
schema.forEach(cat => {
  if (Array.isArray(cat.settings)) {
    cat.settings.forEach(s => {
      if (s.id && s.type !== 'header' && s.type !== 'paragraph') {
        declaredSettings.push(s);
      }
    });
  }
});

let missingInCurrent = [];
declaredSettings.forEach(s => {
  if (!(s.id in data.current)) {
    missingInCurrent.push(s.id);
  }
});
check(`All ${declaredSettings.length} declared settings have values in current`, missingInCurrent.length === 0, `Missing: ${missingInCurrent.join(', ')}`);

// Check color schemes
const colorSchemeGroup = declaredSettings.find(s => s.type === 'color_scheme_group');
check('color_scheme_group is registered with id "color_schemes"', !!colorSchemeGroup && colorSchemeGroup.id === 'color_schemes');

const csDefinition = colorSchemeGroup.definition.filter(d => d.type !== 'header').map(d => d.id);
const colorSchemes = data.current.color_schemes || {};
const schemeIds = Object.keys(colorSchemes);
check(`color_schemes in settings_data has schemes defined (${schemeIds.length} schemes)`, schemeIds.length >= 6);

let incompleteSchemes = [];
schemeIds.forEach(id => {
  const schemeSettings = colorSchemes[id].settings || {};
  const missingTokens = csDefinition.filter(t => !(t in schemeSettings));
  if (missingTokens.length > 0) incompleteSchemes.push(`${id}: missing ${missingTokens.join(',')}`);
});
check('Every color scheme possesses all 18 mandatory definition tokens', incompleteSchemes.length === 0, incompleteSchemes.join('; '));

// 2. Section Groups (Header & Footer) Compatibility
console.log('\n2. Validating Header & Footer Section Groups:');
const headerGroupPath = path.join(THEME_DIR, 'sections', 'header-group.json');
const footerGroupPath = path.join(THEME_DIR, 'sections', 'footer-group.json');

const headerGroup = JSON.parse(fs.readFileSync(headerGroupPath, 'utf8'));
const footerGroup = JSON.parse(fs.readFileSync(footerGroupPath, 'utf8'));

check('header-group.json has type="header"', headerGroup.type === 'header');
check('footer-group.json has type="footer"', footerGroup.type === 'footer');

for (const [sKey, sVal] of Object.entries(headerGroup.sections)) {
  const sFile = path.join(THEME_DIR, 'sections', `${sVal.type}.liquid`);
  check(`Header section "${sKey}" (type: ${sVal.type}) exists on disk`, fs.existsSync(sFile));
}

for (const [sKey, sVal] of Object.entries(footerGroup.sections)) {
  const sFile = path.join(THEME_DIR, 'sections', `${sVal.type}.liquid`);
  check(`Footer section "${sKey}" (type: ${sVal.type}) exists on disk`, fs.existsSync(sFile));
}

// 3. Section Schema Validity & Block Definitions across ALL sections
console.log('\n3. Validating All Section Schemas & Dynamic Capability:');
const sectionFiles = fs.readdirSync(path.join(THEME_DIR, 'sections')).filter(f => f.endsWith('.liquid'));
let validSchemas = 0;
let sectionsWithPresets = 0;
let sectionsWithBlocks = 0;

sectionFiles.forEach(file => {
  const content = fs.readFileSync(path.join(THEME_DIR, 'sections', file), 'utf8');
  const schemaMatch = content.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
  if (schemaMatch) {
    try {
      const parsed = JSON.parse(schemaMatch[1]);
      validSchemas++;
      if (parsed.presets && parsed.presets.length > 0) sectionsWithPresets++;
      if (parsed.blocks && parsed.blocks.length > 0) sectionsWithBlocks++;
    } catch (e) {
      console.log(`    Error parsing schema in ${file}: ${e.message}`);
    }
  }
});

check(`All ${sectionFiles.length} section files contain valid JSON schemas`, validSchemas === sectionFiles.length);
check(`Theme includes customizable block-enabled sections (${sectionsWithBlocks} sections)`, sectionsWithBlocks >= 30);
check(`Theme includes insertable preset sections (${sectionsWithPresets} sections)`, sectionsWithPresets >= 40);

// 4. Liquid Template Resolution
console.log('\n4. Validating JSON Templates section type resolution:');
const templateFiles = fs.readdirSync(path.join(THEME_DIR, 'templates')).filter(f => f.endsWith('.json'));
let totalTemplateSections = 0;
let missingTemplateSections = [];

templateFiles.forEach(tf => {
  try {
    const tContent = JSON.parse(fs.readFileSync(path.join(THEME_DIR, 'templates', tf), 'utf8'));
    if (tContent.sections) {
      for (const [secKey, secObj] of Object.entries(tContent.sections)) {
        totalTemplateSections++;
        const expectedFile = path.join(THEME_DIR, 'sections', `${secObj.type}.liquid`);
        if (!fs.existsSync(expectedFile)) {
          missingTemplateSections.push(`${tf} -> [${secKey}: ${secObj.type}]`);
        }
      }
    }
  } catch (e) {
    console.log(`    Error reading template ${tf}: ${e.message}`);
  }
});

check(`All ${totalTemplateSections} section instances across ${templateFiles.length} JSON templates resolve to real files`, missingTemplateSections.length === 0, missingTemplateSections.join(', '));

// 5. Dynamic Theme Setting Effects in Liquid & CSS
console.log('\n5. Validating Dynamic Theme Setting Output in Code:');
const styleTags = fs.readFileSync(path.join(THEME_DIR, 'snippets', 'style-tags.liquid'), 'utf8');
const themeLiquid = fs.readFileSync(path.join(THEME_DIR, 'layout', 'theme.liquid'), 'utf8');

check('style-tags.liquid outputs dynamic CSS variables for all color_schemes', styleTags.includes('for scheme in settings.color_schemes') && styleTags.includes('--color-background:'));
check('style-tags.liquid outputs typography variables from settings', styleTags.includes('--font-base-size: {{ font_body_base }}') && styleTags.includes('--font-h1-desktop: {{ h1_font_size }}'));
check('style-tags.liquid outputs container layout width from settings', styleTags.includes('--container-width: {{ settings.container_width }}px'));
check('style-tags.liquid outputs custom CSS setting', styleTags.includes('custom_css != blank') && styleTags.includes('{{ custom_css | strip_newlines }}'));
check('theme.liquid applies dynamic body class using settings.default_color_scheme', themeLiquid.includes('settings.default_color_scheme'));
check('theme.liquid supports page transition setting toggle', themeLiquid.includes('settings.page_transition'));

console.log('\n======================================================');
console.log(`THEME EDITOR TEST SUMMARY: ${passedChecks}/${totalChecks} CHECKS PASSED (${Math.round(passedChecks/totalChecks*100)}%)`);
console.log('======================================================\n');

process.exit(failedChecks === 0 ? 0 : 1);

