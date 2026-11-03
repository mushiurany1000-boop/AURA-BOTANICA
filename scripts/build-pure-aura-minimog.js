const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const minimogZip = 'C:/Users/Mushiur Rahman Any/.gemini/antigravity/brain/57665344-da44-4768-a19e-c303725227c7/.user_uploaded/media_1793680500291_92aee2e1.zip';
const targetDir = path.join(__dirname, '..', 'shopify-theme');
const rootDir = path.join(__dirname, '..');

console.log('1. Cleaning shopify-theme directory for fresh, pure deployment...');
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDir, { recursive: true });

console.log('2. Unpacking genuine Minimog 5.3.0 into shopify-theme...');
execSync(`tar.exe -xf "${minimogZip}" -C "${targetDir}"`);
console.log('Minimog 5.3.0 extracted cleanly.');

// Check extracted folders
const folders = fs.readdirSync(targetDir);
console.log('Extracted top-level entries:', folders);

// 3. Customize settings_schema.json safely
const schemaFile = path.join(targetDir, 'config', 'settings_schema.json');
let schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));

// Update theme_info
if (schema[0] && schema[0].name === 'theme_info') {
  schema[0].theme_name = 'Aura Botanica - OS 2.0 Luxury Skincare';
  schema[0].theme_author = 'Aura Botanica Alchemy';
  schema[0].theme_version = '5.3.0';
  schema[0].theme_documentation_url = 'https://docs.foxecom.com/minimog-theme/';
  schema[0].theme_support_url = 'https://foxecom.com';
}
fs.writeFileSync(schemaFile, JSON.stringify(schema, null, 2), 'utf8');
console.log('3. Updated settings_schema.json theme_info.');

// 4. Customize settings_data.json safely - STRICTLY inside schema boundaries!
const dataFile = path.join(targetDir, 'config', 'settings_data.json');
let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// Configure color_schemes.default with Aura Botanica Luxury Palette
if (data.current && data.current.color_schemes && data.current.color_schemes.default) {
  const def = data.current.color_schemes.default.settings;
  def.background = '#FCFBF7';           // Warm Ivory
  def.background_secondary = '#F4EFE6'; // Soft Sand
  def.text = '#18231F';                 // Forest Green
  def.subtext = '#5C6B61';              // Muted Sage
  def.heading_text = '#18231F';         // Forest Green Heading
  def.button = '#18231F';               // Forest Green Button
  def.button_label = '#FCFBF7';         // Ivory Button Text
  def.outline_button_label = '#18231F'; // Forest Green Outline
  def.button_hover = '#B9784D';         // Copper Hover
  def.button_text_hover = '#FFFFFF';
  def.price_sale = '#B9784D';           // Copper Sale Price
  def.price_regular = '#18231F';
  def.form_field = '#FFFFFF';
  def.form_field_label = '#18231F';
  def.border = '#E5DFD3';
  console.log('4. Configured color_schemes.default with Aura Botanica Luxury Skincare tokens.');
}

// Also configure badge-sale to use Copper
if (data.current && data.current.color_schemes && data.current.color_schemes['badge-sale']) {
  data.current.color_schemes['badge-sale'].settings.background = '#B9784D';
  data.current.color_schemes['badge-sale'].settings.text = '#FFFFFF';
}

fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
console.log('4. Saved settings_data.json without any illegal root keys.');

// 5. Customize header-group.json with Aura Botanica branding
const hgFile = path.join(targetDir, 'sections', 'header-group.json');
if (fs.existsSync(hgFile)) {
  let hg = JSON.parse(fs.readFileSync(hgFile, 'utf8'));
  
  // Set logo text
  if (hg.sections && hg.sections.header && hg.sections.header.settings) {
    hg.sections.header.settings.logo_text = 'AURA BOTANICA';
  }
  
  // Set announcement bar message
  if (hg.sections && hg.sections.annoucement && hg.sections.annoucement.blocks) {
    const blocks = hg.sections.annoucement.blocks;
    const firstBlockId = Object.keys(blocks)[0];
    if (firstBlockId && blocks[firstBlockId].settings) {
      blocks[firstBlockId].settings.message = 'Complimentary Botanical Cleanser Sample with all orders over $75 • Free Carbon-Neutral Shipping';
    }
  }
  
  fs.writeFileSync(hgFile, JSON.stringify(hg, null, 2), 'utf8');
  console.log('5. Customized header-group.json with AURA BOTANICA branding and announcement.');
}

// 6. Customize footer-group.json with Aura Botanica copyright
const fgFile = path.join(targetDir, 'sections', 'footer-group.json');
if (fs.existsSync(fgFile)) {
  let fg = JSON.parse(fs.readFileSync(fgFile, 'utf8'));
  if (fg.sections && fg.sections.footer && fg.sections.footer.settings) {
    fg.sections.footer.settings.copyright = '© AURA BOTANICA 2026 • Pure Botanical Alchemy';
  }
  fs.writeFileSync(fgFile, JSON.stringify(fg, null, 2), 'utf8');
  console.log('6. Customized footer-group.json with AURA BOTANICA copyright.');
}

// 7. Inject blocks/custom-announcement.liquid for Shopify OS 2.0 block support
const blocksDir = path.join(targetDir, 'blocks');
if (!fs.existsSync(blocksDir)) {
  fs.mkdirSync(blocksDir, { recursive: true });
}
fs.writeFileSync(path.join(blocksDir, 'custom-announcement.liquid'), `{%- if block.settings.text != blank -%}
  <div class="custom-announcement-block" {{ block.shopify_attributes }}>
    <span>{{ block.settings.text }}</span>
  </div>
{%- endif -%}

{% schema %}
{
  "name": "Custom Announcement",
  "target": "section",
  "settings": [
    {
      "type": "text",
      "id": "text",
      "label": "Announcement Text",
      "default": "Complimentary Shipping & Samples on all orders over $65"
    }
  ]
}
{% endschema %}`, 'utf8');

// 8. Add Aura Botanica custom font and styling to assets
const auraCss = `
/* AURA BOTANICA — Luxury Botanical Skincare Custom Design Overrides */
:root {
  --color-aura-ivory: #FCFBF7;
  --color-aura-forest: #18231F;
  --color-aura-copper: #B9784D;
  --color-aura-sand: #D9C9B8;
  --font-heading-family: 'Cormorant Garamond', Georgia, serif;
}

.m-header__logo-text {
  font-family: var(--font-heading-family), 'Cormorant Garamond', Georgia, serif !important;
  letter-spacing: 0.18em !important;
  font-weight: 500 !important;
  text-transform: uppercase !important;
  color: var(--color-aura-forest) !important;
}

.m-announcement-bar {
  background-color: var(--color-aura-forest) !important;
  color: var(--color-aura-ivory) !important;
  font-size: 13px !important;
  letter-spacing: 0.05em !important;
}

.m-announcement-bar a {
  color: #E2B293 !important;
  text-decoration: underline !important;
}
`;

fs.writeFileSync(path.join(targetDir, 'assets', 'aura-custom.css'), auraCss, 'utf8');

// 9. Include aura-custom.css in layout/theme.liquid right before </head>
const themeLiquidFile = path.join(targetDir, 'layout', 'theme.liquid');
let themeLiquid = fs.readFileSync(themeLiquidFile, 'utf8');
if (!themeLiquid.includes('aura-custom.css')) {
  themeLiquid = themeLiquid.replace('</head>', `  {{ 'aura-custom.css' | asset_url | stylesheet_tag }}\n</head>`);
  fs.writeFileSync(themeLiquidFile, themeLiquid, 'utf8');
  console.log('9. Injected aura-custom.css into layout/theme.liquid.');
}

console.log('Pure Minimog 5.3.0 + Aura Botanica setup completed!');

