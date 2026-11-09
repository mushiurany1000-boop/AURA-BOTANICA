const fs = require('fs');

const data = JSON.parse(fs.readFileSync('config/settings_data.json', 'utf8'));

if (!data.current.color_schemes) {
  data.current.color_schemes = {};
}

data.current.color_schemes['scheme-clay-rose'] = {
  "settings": {
    "background": "#F3E3DC",
    "background_secondary": "#F8F5EF",
    "background_gradient": "",
    "text": "#3A231F",
    "subtext": "#7A5248",
    "heading_text": "#8B3A2F",
    "button": "#8B3A2F",
    "button_label": "#FAF7F2",
    "outline_button_label": "#8B3A2F",
    "button_hover": "#6F2C23",
    "button_text_hover": "#FAF7F2",
    "price_sale": "#8B3A2F",
    "price_regular": "#3A231F",
    "form_field": "#FAF7F2",
    "form_field_label": "#7A5248",
    "tooltip": "#8B3A2F",
    "tooltip_label": "#FAF7F2",
    "border": "#E5D0C5",
    "primary_accent": "#8B3A2F",
    "secondary_accent": "#F3E3DC",
    "highlight_accent": "#B9784D"
  }
};

data.current.color_schemes['scheme-terracotta-atelier'] = {
  "settings": {
    "background": "#FDF5F2",
    "background_secondary": "#F6E8E2",
    "background_gradient": "",
    "text": "#3B1E18",
    "subtext": "#7A5248",
    "heading_text": "#3B1E18",
    "button": "#843C2D",
    "button_label": "#FCE8E7",
    "outline_button_label": "#843C2D",
    "button_hover": "#6A2A1F",
    "button_text_hover": "#FCE8E7",
    "price_sale": "#7E3023",
    "price_regular": "#3B1E18",
    "form_field": "#FDF5F2",
    "form_field_label": "#7A5248",
    "tooltip": "#843C2D",
    "tooltip_label": "#FCE8E7",
    "border": "#E9D5CC",
    "primary_accent": "#7E3023",
    "secondary_accent": "#93422F",
    "highlight_accent": "#B87350"
  }
};

data.current.color_schemes['scheme-forest-gold'] = {
  "settings": {
    "background": "#FFFFFF",
    "background_secondary": "#F5F5F5",
    "background_gradient": "",
    "text": "#222222",
    "subtext": "#777777",
    "heading_text": "#1E4123",
    "button": "#667F6A",
    "button_label": "#FFFFFF",
    "outline_button_label": "#1E4123",
    "button_hover": "#1E4123",
    "button_text_hover": "#FFFFFF",
    "price_sale": "#DEBC8C",
    "price_regular": "#222222",
    "form_field": "#FFFFFF",
    "form_field_label": "#777777",
    "tooltip": "#1E4123",
    "tooltip_label": "#FFFFFF",
    "border": "#DDDDDD",
    "primary_accent": "#1E4123",
    "secondary_accent": "#DEBC8C",
    "highlight_accent": "#E2C25D"
  }
};

fs.writeFileSync('config/settings_data.json', JSON.stringify(data, null, 2));
console.log('Restored color schemes in config/settings_data.json');

