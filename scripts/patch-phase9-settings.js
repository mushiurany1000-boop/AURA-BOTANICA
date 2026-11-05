/**
 * scripts/patch-phase9-settings.js
 * Phase 9: Luxury Visual Refinement, Typography, Botanical Color System & Storefront Cleanup
 */

const fs = require('fs');
const path = require('path');

console.log('>>> Starting Phase 9 settings and template patching...');

// 1. Patch config/settings_schema.json
const schemaPath = path.join(__dirname, '..', 'config', 'settings_schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

// 1a. Update Colors group color_schemes definition
const colorsGroup = schema.find(g => g.name === 'Colors');
if (colorsGroup) {
  const csg = colorsGroup.settings.find(s => s.type === 'color_scheme_group');
  if (csg && csg.definition) {
    const hasAccents = csg.definition.some(d => d.id === 'primary_accent');
    if (!hasAccents) {
      csg.definition.push(
        {
          "type": "header",
          "content": "Botanical Accents"
        },
        {
          "type": "color",
          "id": "primary_accent",
          "label": "Primary accent (Forest)",
          "default": "#233831"
        },
        {
          "type": "color",
          "id": "secondary_accent",
          "label": "Secondary accent (Sage)",
          "default": "#5B6E64"
        },
        {
          "type": "color",
          "id": "highlight_accent",
          "label": "Highlight accent (Terracotta / Gold)",
          "default": "#B9784D"
        }
      );
      console.log('Added botanical accents to color_schemes definition in settings_schema.json');
    }
  }
}

// 1b. Update Typography group defaults
const typoGroup = schema.find(g => g.name === 'Typography');
if (typoGroup) {
  const headerFont = typoGroup.settings.find(s => s.id === 'type_header_font');
  if (headerFont) headerFont.default = 'playfair_display_n7';

  const baseFont = typoGroup.settings.find(s => s.id === 'type_base_font');
  if (baseFont) baseFont.default = 'montserrat_n4';

  const btnWeight = typoGroup.settings.find(s => s.id === 'btn_weight');
  if (btnWeight) btnWeight.default = '600';
  console.log('Updated typography defaults in settings_schema.json (Playfair Display 700, Montserrat 400, Button 600)');
}

// 1c. Update Product cards group aspect ratio options
const pcardGroup = schema.find(g => g.name === 'Product cards');
if (pcardGroup) {
  const ratioSetting = pcardGroup.settings.find(s => s.id === 'pcard_image_ratio');
  if (ratioSetting && ratioSetting.options) {
    if (!ratioSetting.options.some(o => o.value === '4/5')) {
      ratioSetting.options.splice(3, 0, {
        "value": "4/5",
        "label": "4:5 (Luxury Editorial Portrait)"
      });
      console.log('Added 4:5 aspect ratio option to pcard_image_ratio');
    }
    ratioSetting.default = '4/5';
  }
}

fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2) + '\n', 'utf8');
console.log('Saved config/settings_schema.json');

// 2. Patch config/settings_data.json
const dataPath = path.join(__dirname, '..', 'config', 'settings_data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 2a. Update current typography, buttons, and cards
data.current.type_header_font = 'playfair_display_n7';
data.current.type_base_font = 'montserrat_n4';
data.current.btn_weight = '600';
data.current.btn_base_size = 15;
data.current.btn_border_radius = 4;
data.current.btn_uppercase_text = false;
data.current.pcard_image_ratio = '4/5';

// 2b. Update color schemes in current
if (data.current.color_schemes) {
  // Default scheme (Warm Ivory & Deep Forest Charcoal)
  if (data.current.color_schemes.default) {
    Object.assign(data.current.color_schemes.default.settings, {
      background: '#FCFBF7',
      background_secondary: '#F8F6F0',
      background_gradient: '',
      text: '#18231F',
      subtext: '#5B6E64',
      heading_text: '#18231F',
      primary_accent: '#233831',
      secondary_accent: '#5B6E64',
      highlight_accent: '#B9784D',
      button: '#233831',
      button_label: '#FCFBF7',
      outline_button_label: '#233831',
      button_hover: '#18231F',
      button_text_hover: '#FCFBF7',
      price_sale: '#B9784D',
      price_regular: '#18231F',
      form_field: '#FFFFFF',
      form_field_label: '#18231F',
      tooltip: '#18231F',
      tooltip_label: '#FCFBF7',
      border: '#E5DFD3'
    });
  }

  // Dark scheme (Deep Botanical Forest)
  if (data.current.color_schemes.dark) {
    Object.assign(data.current.color_schemes.dark.settings, {
      background: '#18231F',
      background_secondary: '#1F2D24',
      background_gradient: '',
      text: '#FCFBF7',
      subtext: '#A3B2A7',
      heading_text: '#FCFBF7',
      primary_accent: '#233831',
      secondary_accent: '#708276',
      highlight_accent: '#B9784D',
      button: '#B9784D',
      button_label: '#FCFBF7',
      outline_button_label: '#FCFBF7',
      button_hover: '#D4956C',
      button_text_hover: '#18231F',
      price_sale: '#B9784D',
      price_regular: '#FCFBF7',
      form_field: '#1F2D24',
      form_field_label: '#FCFBF7',
      tooltip: '#FCFBF7',
      tooltip_label: '#18231F',
      border: '#2C3C32'
    });
  }

  // Footer scheme
  if (data.current.color_schemes.footer) {
    Object.assign(data.current.color_schemes.footer.settings, {
      background: '#18231F',
      background_secondary: '#1F2D24',
      background_gradient: '',
      text: '#FCFBF7',
      subtext: '#A3B2A7',
      heading_text: '#FCFBF7',
      primary_accent: '#233831',
      secondary_accent: '#708276',
      highlight_accent: '#B9784D',
      button: '#B9784D',
      button_label: '#FCFBF7',
      outline_button_label: '#FCFBF7',
      button_hover: '#D4956C',
      button_text_hover: '#18231F',
      price_sale: '#B9784D',
      price_regular: '#FCFBF7',
      form_field: '#1F2D24',
      form_field_label: '#FCFBF7',
      tooltip: '#FCFBF7',
      tooltip_label: '#18231F',
      border: '#2C3C32'
    });
  }
}

// 2c. Update presets
if (data.presets) {
  for (const [pKey, pVal] of Object.entries(data.presets)) {
    pVal.type_header_font = 'playfair_display_n7';
    pVal.type_base_font = 'montserrat_n4';
    pVal.btn_weight = '600';
    pVal.pcard_image_ratio = '4/5';
  }
  console.log('Updated presets in settings_data.json with Playfair Display and Montserrat');
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Saved config/settings_data.json');

// 3. Patch templates/index.json
const indexPath = path.join(__dirname, '..', 'templates', 'index.json');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace leftover apparel copy
indexContent = indexContent.replace(/"The ReCotton Tee"/g, '"Restorative Botanical Barrier Elixir"');
indexContent = indexContent.replace(
  /"text": "<p>Here is your chance to upgrade your wardrobe <br\/>with a variation of styles and fits that are both\.<\/p>"/g,
  '"text": "<p>Elevate your daily ritual with cold-pressed botanical extracts and clinical bio-ferments tailored to soothe, nourish, and protect your skin barrier.</p>"'
);
indexContent = indexContent.replace(
  /Tag <span class=\\"text-black\\">@minimog<\/span> in your Instagram photos for a chance to be featured here\.<br>\\nFind more inspiration on <a href=\\"#\\">our Instagram\.<\/a>/g,
  'Tag <span class=\\"text-black\\">@aurabotanica</span> in your daily rituals for a chance to be featured in our botanical gallery.<br>\\nFind mindful skincare inspiration on <a href=\\"#\\">our Instagram.</a>'
);
indexContent = indexContent.replace(
  /"profile": "https:\/\/www\.instagram\.com\/minimog\.trendy\/"/g,
  '"profile": "https://www.instagram.com/aurabotanica/"'
);
indexContent = indexContent.replace(/"heading": "Check out mix & match"/g, '"heading": "Curated Daily Botanical Rituals"');
indexContent = indexContent.replace(/"subheading": "Mix & Match"/g, '"subheading": "Active Botanicals"');
indexContent = indexContent.replace(/"button_label": "Shop Mix & Match"/g, '"button_label": "Explore Clinical Rituals"');

const indexObj = JSON.parse(indexContent);
// Hide the t-shirt footer in slider blocks
if (indexObj.sections && indexObj.sections['1621243260e1af0c20'] && indexObj.sections['1621243260e1af0c20'].blocks) {
  for (const b of Object.values(indexObj.sections['1621243260e1af0c20'].blocks)) {
    if (b.settings) {
      b.settings.show_footer = false;
      b.settings.footer_text = 'Restorative Botanical Barrier Elixir';
    }
  }
}

fs.writeFileSync(indexPath, JSON.stringify(indexObj, null, 2) + '\n', 'utf8');
console.log('Saved templates/index.json');

// 4. Patch templates/list-collections.json
const listColPath = path.join(__dirname, '..', 'templates', 'list-collections.json');
let listColContent = fs.readFileSync(listColPath, 'utf8');
listColContent = listColContent.replace(
  /<p>Here is your chance to upgrade your wardrobe <br\\\/?>with a variation of styles and fits that are both feminine and relaxed\.<\/p>/g,
  '<p>Explore our complete apothecary of bio-fermented serums, nutrient barrier creams, and restorative botanicals.</p>'
);
fs.writeFileSync(listColPath, listColContent, 'utf8');
console.log('Saved templates/list-collections.json');

// 5. Patch templates/product.grid-mix-columns.json
const gridMixPath = path.join(__dirname, '..', 'templates', 'product.grid-mix-columns.json');
let gridMixContent = fs.readFileSync(gridMixPath, 'utf8');
gridMixContent = gridMixContent.replace(/@minimog/g, '@aurabotanica');
fs.writeFileSync(gridMixPath, gridMixContent, 'utf8');
console.log('Saved templates/product.grid-mix-columns.json');

console.log('>>> Phase 9 settings and templates successfully patched!');

