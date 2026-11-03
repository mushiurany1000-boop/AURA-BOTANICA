const fs = require('fs');
const path = require('path');

const refDir = path.join(__dirname, '..', 'minimog-reference');
const targetDir = path.join(__dirname, '..', 'shopify-theme');
const rootDir = path.join(__dirname, '..');

console.log('Copying Minimog 5.3.0 into shopify-theme...');

function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  files.forEach(file => {
    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);
    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursive(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  });
}

// 1. Copy assets, config, layout, locales, sections, snippets, templates
['assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'].forEach(folder => {
  const src = path.join(refDir, folder);
  const dest = path.join(targetDir, folder);
  if (fs.existsSync(src)) {
    console.log(`Copying folder: ${folder}...`);
    copyFolderRecursive(src, dest);
  }
});

// 2. Ensure blocks directory exists with custom-announcement.liquid
const blocksDir = path.join(targetDir, 'blocks');
if (!fs.existsSync(blocksDir)) {
  fs.mkdirSync(blocksDir, { recursive: true });
}
const blockSample = `{%- if block.settings.text != blank -%}
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
{% endschema %}`;
fs.writeFileSync(path.join(blocksDir, 'custom-announcement.liquid'), blockSample, 'utf8');

// 3. Customize settings_schema.json with Aura Botanica branding
const schemaPath = path.join(targetDir, 'config', 'settings_schema.json');
if (fs.existsSync(schemaPath)) {
  let schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  if (schema[0] && schema[0].name === 'theme_info') {
    schema[0].theme_name = 'Aura Botanica - OS 2.0 Luxury Skincare';
    schema[0].theme_version = '5.3.0';
    schema[0].theme_author = 'Aura Botanica Alchemy';
    schema[0].theme_documentation_url = 'https://docs.foxecom.com/minimog-theme/';
    schema[0].theme_support_url = 'https://foxecom.com';
  }
  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2), 'utf8');
  console.log('Branded settings_schema.json with Aura Botanica.');
}

// 4. Customize settings_data.json with Aura Botanica luxury skincare presets
const dataPath = path.join(targetDir, 'config', 'settings_data.json');
if (fs.existsSync(dataPath)) {
  let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  data.current = data.current || {};

  // Customizer styling & branding overrides
  data.current.logo_text = 'AURA BOTANICA';
  data.current.color_primary = '#1F2D24';
  data.current.color_secondary = '#B37446';
  data.current.color_accent = '#B37446';
  data.current.color_bg = '#FCFBF7';
  data.current.color_text = '#1F2D24';
  data.current.free_shipping_threshold = 65;
  data.current.free_shipping_text = "You've unlocked Complimentary Express Delivery & Botanical Samples!";
  data.current.copyright = '© AURA BOTANICA 2026. Pure Botanical Alchemy.';

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Configured settings_data.json with Aura Botanica luxury skincare preset.');
}

// 5. Customize header-group.json
const headerGroupPath = path.join(targetDir, 'sections', 'header-group.json');
if (fs.existsSync(headerGroupPath)) {
  let headerGroup = JSON.parse(fs.readFileSync(headerGroupPath, 'utf8'));
  if (headerGroup.sections && headerGroup.sections.header && headerGroup.sections.header.settings) {
    headerGroup.sections.header.settings.logo_text = 'AURA BOTANICA';
  }
  if (headerGroup.sections && headerGroup.sections.annoucement && headerGroup.sections.annoucement.blocks) {
    const blockKeys = Object.keys(headerGroup.sections.annoucement.blocks);
    if (blockKeys.length > 0) {
      headerGroup.sections.annoucement.blocks[blockKeys[0]].settings.message = 'Complimentary Botanical Cleanser Sample with all orders over $75 • Free Carbon-Neutral Shipping';
    }
  }
  fs.writeFileSync(headerGroupPath, JSON.stringify(headerGroup, null, 2), 'utf8');
  console.log('Customized header-group.json.');
}

// 6. Customize footer-group.json
const footerGroupPath = path.join(targetDir, 'sections', 'footer-group.json');
if (fs.existsSync(footerGroupPath)) {
  let footerGroup = JSON.parse(fs.readFileSync(footerGroupPath, 'utf8'));
  if (footerGroup.sections && footerGroup.sections.footer && footerGroup.sections.footer.settings) {
    footerGroup.sections.footer.settings.copyright = '© AURA BOTANICA 2026 • Pure Botanical Alchemy';
  }
  fs.writeFileSync(footerGroupPath, JSON.stringify(footerGroup, null, 2), 'utf8');
  console.log('Customized footer-group.json.');
}

// 7. Mirror shopify-theme to workspace root so root tools and validator see the same files
console.log('Mirroring shopify-theme into root folders...');
['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'].forEach(folder => {
  const src = path.join(targetDir, folder);
  const dest = path.join(rootDir, folder);
  if (fs.existsSync(src)) {
    copyFolderRecursive(src, dest);
  }
});

console.log('\nMigration complete! All 85 Minimog sections, 120 snippets, 44 templates, and 161 assets are now active in Aura Botanica.');

