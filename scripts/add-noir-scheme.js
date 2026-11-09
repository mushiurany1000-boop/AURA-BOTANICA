const fs = require('fs');

const data = JSON.parse(fs.readFileSync('config/settings_data.json', 'utf8'));

// 1. Add scheme-noir-velvet to color_schemes
data.current.color_schemes['scheme-noir-velvet'] = {
  "settings": {
    "background": "#1A070B",
    "background_secondary": "#280B12",
    "background_gradient": "linear-gradient(180deg, #1A070B 0%, #24090F 100%)",
    "text": "#FFF8F5",
    "subtext": "#C5A59E",
    "heading_text": "#FFFFFF",
    "button": "#8B2838",
    "button_label": "#FFFFFF",
    "outline_button_label": "#E2B7A8",
    "button_hover": "#6D1D2B",
    "button_text_hover": "#FFFFFF",
    "price_sale": "#E2B7A8",
    "price_regular": "#FFF8F5",
    "form_field": "#280B12",
    "form_field_label": "#C5A59E",
    "tooltip": "#E2B7A8",
    "tooltip_label": "#1A070B",
    "border": "#3E151F",
    "primary_accent": "#E2B7A8",
    "secondary_accent": "#C58372",
    "highlight_accent": "#DEBC8C"
  }
};

// 2. Add 'Noir Velvet & Rose Gold' preset
data.presets['Noir Velvet & Rose Gold'] = {
  "default_color_scheme": "scheme-noir-velvet",
  "brand_wordmark": "KAYRA",
  "brand_tagline": "BEAUTY",
  "page_width": 1400,
  "btn_border_radius": 9999,
  "btn_uppercase_text": true,
  "color_bg_primary": "#1A070B",
  "color_bg_secondary": "#280B12",
  "color_accent": "#E2B7A8",
  "color_border": "#3E151F",
  "color_text_primary": "#FFF8F5"
};

fs.writeFileSync('config/settings_data.json', JSON.stringify(data, null, 2));
console.log('Successfully added scheme-noir-velvet to config/settings_data.json!');

