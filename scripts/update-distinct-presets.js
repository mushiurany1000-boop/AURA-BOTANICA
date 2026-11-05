const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const shopifyThemeDir = path.join(rootDir, 'shopify-theme');

function updatePresetsWithDistinctColors(baseDir) {
  const filePath = path.join(baseDir, 'config', 'settings_data.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!data.presets) {
    data.presets = {};
  }

  // 1. Botanical Ivory (Default Light Luxury)
  const botanicalIvoryDefaultScheme = {
    background: "#FCFBF7",
    background_secondary: "#F4EFE6",
    background_gradient: "",
    text: "#18231F",
    subtext: "#5C6B61",
    heading_text: "#18231F",
    button: "#18231F",
    button_label: "#FCFBF7",
    outline_button_label: "#18231F",
    button_hover: "#B9784D",
    button_text_hover: "#FCFBF7",
    price_sale: "#B9784D",
    price_regular: "#18231F",
    form_field: "#FFFFFF",
    form_field_label: "#5C6B61",
    tooltip: "#18231F",
    tooltip_label: "#FCFBF7",
    border: "#E8E1D7"
  };

  // 2. Forest Night (Deep Nocturne / Botanical Dark Mode)
  const forestNightDefaultScheme = {
    background: "#121A17",
    background_secondary: "#18231F",
    background_gradient: "",
    text: "#EDE8DF",
    subtext: "#9EACA3",
    heading_text: "#FCFBF7",
    button: "#B9784D",
    button_label: "#FCFBF7",
    outline_button_label: "#B9784D",
    button_hover: "#D4AF37",
    button_text_hover: "#121A17",
    price_sale: "#E2B293",
    price_regular: "#FCFBF7",
    form_field: "#18231F",
    form_field_label: "#9EACA3",
    tooltip: "#FCFBF7",
    tooltip_label: "#121A17",
    border: "#263630"
  };

  // 3. Clay Rose (Earthy Terracotta / Mineral Rose)
  const clayRoseDefaultScheme = {
    background: "#FBF6F2",
    background_secondary: "#F2E7DF",
    background_gradient: "",
    text: "#2B1D19",
    subtext: "#7A635B",
    heading_text: "#2B1D19",
    button: "#9E5E47",
    button_label: "#FFFFFF",
    outline_button_label: "#9E5E47",
    button_hover: "#7D4734",
    button_text_hover: "#FFFFFF",
    price_sale: "#9E5E47",
    price_regular: "#2B1D19",
    form_field: "#FAF2EC",
    form_field_label: "#7A635B",
    tooltip: "#2B1D19",
    tooltip_label: "#FFFFFF",
    border: "#E5D5CB"
  };

  // Ensure presets exist and inherit from current
  ['Botanical Ivory', 'Forest Night', 'Clay Rose'].forEach(pName => {
    if (!data.presets[pName]) {
      data.presets[pName] = JSON.parse(JSON.stringify(data.current));
    }
  });

  // Assign distinct schemes
  data.presets['Botanical Ivory'].color_schemes.default.settings = botanicalIvoryDefaultScheme;
  data.presets['Forest Night'].color_schemes.default.settings = forestNightDefaultScheme;
  data.presets['Clay Rose'].color_schemes.default.settings = clayRoseDefaultScheme;

  // Also adjust primary colors in root settings of each preset for theme compatibility
  data.presets['Botanical Ivory'].color_body_bg = "#FCFBF7";
  data.presets['Botanical Ivory'].color_body_text = "#18231F";
  data.presets['Botanical Ivory'].color_primary = "#18231F";

  data.presets['Forest Night'].color_body_bg = "#121A17";
  data.presets['Forest Night'].color_body_text = "#EDE8DF";
  data.presets['Forest Night'].color_primary = "#B9784D";

  data.presets['Clay Rose'].color_body_bg = "#FBF6F2";
  data.presets['Clay Rose'].color_body_text = "#2B1D19";
  data.presets['Clay Rose'].color_primary = "#9E5E47";

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`[PASS] Updated 3 distinctive color presets in ${filePath}`);
}

[rootDir, shopifyThemeDir].forEach(dir => {
  updatePresetsWithDistinctColors(dir);
});

console.log('Finished updating presets across root and shopify-theme.');

