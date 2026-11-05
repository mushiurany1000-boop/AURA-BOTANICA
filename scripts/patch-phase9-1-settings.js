/**
 * scripts/patch-phase9-1-settings.js
 * Phase 9.1: Enforce Proposed Luxury Botanical Colors and Typography Across All Schemas & Presets
 */

const fs = require('fs');
const path = require('path');

console.log('>>> Starting Phase 9.1 settings patch...');

// 1. Update config/settings_schema.json
const schemaPath = path.join(__dirname, '..', 'config', 'settings_schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const colorsGroup = schema.find(g => g.name === 'Colors');
if (colorsGroup) {
  const csg = colorsGroup.settings.find(s => s.type === 'color_scheme_group');
  if (csg && csg.definition) {
    const priAcc = csg.definition.find(d => d.id === 'primary_accent');
    if (priAcc) {
      priAcc.default = '#315B45';
      priAcc.label = 'Primary accent (Forest Green #315B45)';
    }
    const secAcc = csg.definition.find(d => d.id === 'secondary_accent');
    if (secAcc) {
      secAcc.default = '#A7B49B';
      secAcc.label = 'Secondary accent (Muted Sage #A7B49B)';
    }
    const hiAcc = csg.definition.find(d => d.id === 'highlight_accent');
    if (hiAcc) {
      hiAcc.default = '#B89A62';
      hiAcc.label = 'Highlight accent (Champagne Gold #B89A62)';
    }
  }
}

fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2) + '\n', 'utf8');
console.log('Updated config/settings_schema.json with Phase 9.1 accent colors');

// 2. Update config/settings_data.json
const dataPath = path.join(__dirname, '..', 'config', 'settings_data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

data.current.type_header_font = 'playfair_display_n7';
data.current.type_base_font = 'montserrat_n4';
data.current.btn_weight = '600';
data.current.pcard_image_ratio = '4/5';

if (data.current.color_schemes) {
  // Default scheme: Warm Ivory, Charcoal text, Forest Green CTA, Sage, Champagne Gold
  if (data.current.color_schemes.default) {
    Object.assign(data.current.color_schemes.default.settings, {
      background: '#F8F5EF',
      background_secondary: '#F0ECE1',
      background_gradient: '',
      text: '#292D28',
      subtext: '#5B6E64',
      heading_text: '#244638',
      primary_accent: '#315B45',
      secondary_accent: '#A7B49B',
      highlight_accent: '#B89A62',
      button: '#315B45',
      button_label: '#F8F5EF',
      outline_button_label: '#315B45',
      button_hover: '#244638',
      button_text_hover: '#F8F5EF',
      price_sale: '#B89A62',
      price_regular: '#292D28',
      form_field: '#FFFFFF',
      form_field_label: '#292D28',
      tooltip: '#244638',
      tooltip_label: '#F8F5EF',
      border: '#E3DDD1'
    });
  }

  // Dark scheme: Deep Botanical Green canvas
  if (data.current.color_schemes.dark) {
    Object.assign(data.current.color_schemes.dark.settings, {
      background: '#244638',
      background_secondary: '#1B352A',
      background_gradient: '',
      text: '#F8F5EF',
      subtext: '#A7B49B',
      heading_text: '#F8F5EF',
      primary_accent: '#315B45',
      secondary_accent: '#A7B49B',
      highlight_accent: '#B89A62',
      button: '#B89A62',
      button_label: '#244638',
      outline_button_label: '#F8F5EF',
      button_hover: '#D4B880',
      button_text_hover: '#1B352A',
      price_sale: '#B89A62',
      price_regular: '#F8F5EF',
      form_field: '#1B352A',
      form_field_label: '#F8F5EF',
      tooltip: '#F8F5EF',
      tooltip_label: '#244638',
      border: '#365849'
    });
  }

  // Footer scheme
  if (data.current.color_schemes.footer) {
    Object.assign(data.current.color_schemes.footer.settings, {
      background: '#244638',
      background_secondary: '#1B352A',
      background_gradient: '',
      text: '#F8F5EF',
      subtext: '#A7B49B',
      heading_text: '#F8F5EF',
      primary_accent: '#315B45',
      secondary_accent: '#A7B49B',
      highlight_accent: '#B89A62',
      button: '#B89A62',
      button_label: '#244638',
      outline_button_label: '#F8F5EF',
      button_hover: '#D4B880',
      button_text_hover: '#1B352A',
      price_sale: '#B89A62',
      price_regular: '#F8F5EF',
      form_field: '#1B352A',
      form_field_label: '#F8F5EF',
      tooltip: '#F8F5EF',
      tooltip_label: '#244638',
      border: '#365849'
    });
  }
}

// Presets
if (data.presets) {
  for (const [pKey, pVal] of Object.entries(data.presets)) {
    pVal.type_header_font = 'playfair_display_n7';
    pVal.type_base_font = 'montserrat_n4';
    pVal.btn_weight = '600';
    pVal.pcard_image_ratio = '4/5';
  }
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Updated config/settings_data.json with Phase 9.1 color tokens');
console.log('>>> Phase 9.1 settings patch complete!');

