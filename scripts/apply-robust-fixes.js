const fs = require('fs');
const path = require('path');

console.log('=== Step 1: Inlining theme-data into layout/theme.liquid ===');
const themeDataSnippet = fs.readFileSync('snippets/theme-data.liquid', 'utf8');
let themeLiquid = fs.readFileSync('layout/theme.liquid', 'utf8');

// Replace {% render 'theme-data' %} with inlined code
if (themeLiquid.includes("{% render 'theme-data' %}")) {
  themeLiquid = themeLiquid.replace(
    "{% render 'theme-data' %}",
    `{%- comment -%} Inlined Theme Data Configuration {%- endcomment -%}\n${themeDataSnippet}`
  );
  fs.writeFileSync('layout/theme.liquid', themeLiquid, 'utf8');
  console.log('Successfully inlined theme-data into layout/theme.liquid');
} else {
  console.log('theme-data was not found in layout/theme.liquid or already inlined');
}

console.log('\n=== Step 2: Cleaning color_scheme_group in config/settings_schema.json ===');
const schema = JSON.parse(fs.readFileSync('config/settings_schema.json', 'utf8'));

schema.forEach(sec => {
  if (sec.settings) {
    sec.settings.forEach(st => {
      if (st.type === 'color_scheme_group') {
        // Filter out headers from definition (only input settings allowed)
        st.definition = st.definition.filter(d => d.type !== 'header');
        
        // Clean role to only valid Shopify role keys
        st.role = {
          text: 'text',
          background: {
            solid: 'background',
            gradient: 'background_gradient'
          },
          links: 'outline_button_label',
          icons: 'text'
        };

        // Add default schemes to schema
        st.default = [
          {
            id: 'scheme-1',
            name: 'Scheme 1',
            settings: {
              background: '#fcfbf7',
              background_secondary: '#f7f4ed',
              background_gradient: '',
              text: '#222222',
              subtext: '#666666',
              heading_text: '#222222',
              button: '#315B45',
              button_label: '#FFFFFF',
              outline_button_label: '#315B45',
              button_hover: '#224031',
              button_text_hover: '#ffffff',
              price_sale: '#DA3F3F',
              price_regular: '#666666',
              form_field: '#FFFFFF',
              form_field_label: '#222222',
              tooltip: '#222222',
              tooltip_label: '#FFFFFF',
              border: '#E8E8E8',
              primary_accent: '#315B45',
              secondary_accent: '#A7B49B',
              highlight_accent: '#B89A62'
            }
          },
          {
            id: 'scheme-2',
            name: 'Scheme 2',
            settings: {
              background: '#1A070B',
              background_secondary: '#24090F',
              background_gradient: '',
              text: '#FFF8F5',
              subtext: '#E2B7A8',
              heading_text: '#FFFFFF',
              button: '#9E3245',
              button_label: '#FFFFFF',
              outline_button_label: '#E2B7A8',
              button_hover: '#7A2234',
              button_text_hover: '#FFFFFF',
              price_sale: '#E2B7A8',
              price_regular: '#C5A59E',
              form_field: '#24090F',
              form_field_label: '#FFF8F5',
              tooltip: '#FFF8F5',
              tooltip_label: '#1A070B',
              border: '#3B131E',
              primary_accent: '#9E3245',
              secondary_accent: '#D48D9B',
              highlight_accent: '#D4AF37'
            }
          }
        ];
      }
    });
  }
});

fs.writeFileSync('config/settings_schema.json', JSON.stringify(schema, null, 2), 'utf8');
console.log('Successfully cleaned color_scheme_group in config/settings_schema.json');

console.log('\n=== Step 3: Adding scheme-1 through scheme-5 aliases in config/settings_data.json ===');
const data = JSON.parse(fs.readFileSync('config/settings_data.json', 'utf8'));

function injectSchemeAliases(schemesObj) {
  if (!schemesObj) return;
  // scheme-1 = default light
  schemesObj['scheme-1'] = JSON.parse(JSON.stringify(schemesObj['default'] || schemesObj[Object.keys(schemesObj)[0]]));
  // scheme-2 = terracotta atelier
  if (schemesObj['scheme-terracotta-atelier']) {
    schemesObj['scheme-2'] = JSON.parse(JSON.stringify(schemesObj['scheme-terracotta-atelier']));
  } else {
    schemesObj['scheme-2'] = JSON.parse(JSON.stringify(schemesObj['scheme-1']));
  }
  // scheme-3 = dark
  if (schemesObj['dark']) {
    schemesObj['scheme-3'] = JSON.parse(JSON.stringify(schemesObj['dark']));
  } else {
    schemesObj['scheme-3'] = JSON.parse(JSON.stringify(schemesObj['scheme-1']));
  }
  // scheme-4 = forest gold
  if (schemesObj['scheme-forest-gold']) {
    schemesObj['scheme-4'] = JSON.parse(JSON.stringify(schemesObj['scheme-forest-gold']));
  } else {
    schemesObj['scheme-4'] = JSON.parse(JSON.stringify(schemesObj['scheme-1']));
  }
  // scheme-5 = noir velvet
  if (schemesObj['scheme-noir-velvet']) {
    schemesObj['scheme-5'] = JSON.parse(JSON.stringify(schemesObj['scheme-noir-velvet']));
  } else {
    schemesObj['scheme-5'] = JSON.parse(JSON.stringify(schemesObj['scheme-1']));
  }
}

injectSchemeAliases(data.current.color_schemes);
for (const pObj of Object.values(data.presets)) {
  injectSchemeAliases(pObj.color_schemes);
}

fs.writeFileSync('config/settings_data.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully added scheme-1..5 to current and presets in settings_data.json');
