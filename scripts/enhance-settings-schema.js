const fs = require('fs');
const schema = JSON.parse(fs.readFileSync('config/settings_schema.json', 'utf8'));
const data = JSON.parse(fs.readFileSync('config/settings_data.json', 'utf8'));

// 1. Upgrade Branding group
const brandingIdx = schema.findIndex(x => x.name === 'Branding');
if (brandingIdx !== -1) {
  const currentBranding = schema[brandingIdx];
  const newBrandingSettings = [
    {
      "type": "header",
      "content": "Store Logo"
    },
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Primary logo (Desktop)",
      "info": "Recommended: Transparent SVG or PNG, 400x120px"
    },
    {
      "type": "image_picker",
      "id": "logo_transparent",
      "label": "Inverted / transparent header logo",
      "info": "Displayed on top of dark or transparent heroes"
    },
    {
      "type": "image_picker",
      "id": "logo_mobile",
      "label": "Mobile logo",
      "info": "Optional override for mobile viewports"
    },
    {
      "type": "range",
      "id": "logo_width",
      "label": "Desktop logo width",
      "min": 60,
      "max": 350,
      "step": 5,
      "unit": "px",
      "default": 160
    },
    {
      "type": "range",
      "id": "logo_width_mobile",
      "label": "Mobile logo width",
      "min": 50,
      "max": 200,
      "step": 5,
      "unit": "px",
      "default": 110
    },
    {
      "type": "text",
      "id": "brand_wordmark",
      "label": "Brand wordmark (Text fallback)",
      "default": "KAYRA"
    },
    {
      "type": "text",
      "id": "brand_tagline",
      "label": "Brand tagline / subtitle",
      "default": "BEAUTY"
    },
    ...currentBranding.settings
  ];

  // Remove duplicates by id if any
  const seenIds = new Set();
  const filtered = [];
  for (let s of newBrandingSettings) {
    if (s.id) {
      if (seenIds.has(s.id)) continue;
      seenIds.add(s.id);
    }
    filtered.push(s);
  }
  schema[brandingIdx].settings = filtered;
}

// 2. Add/Upgrade Product Page Settings Group
let prodPageIdx = schema.findIndex(x => x.name === 'Product page' || x.name === 'Single product');
if (prodPageIdx === -1) {
  const newProductGroup = {
    "name": "Product page",
    "settings": [
      {
        "type": "header",
        "content": "Media & Gallery"
      },
      {
        "type": "select",
        "id": "product_media_layout",
        "label": "Desktop gallery layout",
        "options": [
          { "value": "layout-4", "label": "Thumbnail slider with circular controls" },
          { "value": "layout-1", "label": "Vertical thumbnails left" },
          { "value": "layout-2", "label": "Stacked 1-column" },
          { "value": "layout-3", "label": "2-column grid" }
        ],
        "default": "layout-4"
      },
      {
        "type": "select",
        "id": "product_media_aspect_ratio",
        "label": "Media aspect ratio",
        "options": [
          { "value": "square", "label": "Square (1:1)" },
          { "value": "portrait", "label": "Portrait (3:4)" },
          { "value": "natural", "label": "Natural" }
        ],
        "default": "square"
      },
      {
        "type": "checkbox",
        "id": "enable_product_zoom",
        "label": "Enable click-to-zoom (Photoswipe)",
        "default": true
      },
      {
        "type": "header",
        "content": "Buy Box & Actions"
      },
      {
        "type": "checkbox",
        "id": "show_stock_badge",
        "label": "Show 'In Stock' pill badge",
        "default": true
      },
      {
        "type": "checkbox",
        "id": "show_sku",
        "label": "Show SKU code",
        "default": true
      },
      {
        "type": "checkbox",
        "id": "show_product_tags",
        "label": "Show product tags",
        "default": true
      },
      {
        "type": "checkbox",
        "id": "show_share_buttons",
        "label": "Show social sharing icons",
        "default": true
      },
      {
        "type": "header",
        "content": "Reviews & Ratings"
      },
      {
        "type": "color",
        "id": "review_star_color",
        "label": "Rating stars color",
        "default": "#E2C25D"
      },
      {
        "type": "header",
        "content": "Tabs & Collapsibles"
      },
      {
        "type": "select",
        "id": "product_tabs_style",
        "label": "Tabs indicator style",
        "options": [
          { "value": "underline", "label": "Active underline bar (Reference style)" },
          { "value": "pills", "label": "Pill buttons" },
          { "value": "minimal", "label": "Minimalist fade" }
        ],
        "default": "underline"
      }
    ]
  };
  // Insert before 'Drawer & popup' or near Product cards
  const pcardsIdx = schema.findIndex(x => x.name === 'Product cards');
  if (pcardsIdx !== -1) {
    schema.splice(pcardsIdx + 1, 0, newProductGroup);
  } else {
    schema.push(newProductGroup);
  }
}

// 3. Make sure settings_data.json has these defaults
if (!data.current.brand_wordmark) data.current.brand_wordmark = "KAYRA";
if (!data.current.brand_tagline) data.current.brand_tagline = "BEAUTY";
if (!data.current.logo_width) data.current.logo_width = 160;
if (!data.current.logo_width_mobile) data.current.logo_width_mobile = 110;
if (!data.current.product_media_layout) data.current.product_media_layout = "layout-4";
if (!data.current.product_media_aspect_ratio) data.current.product_media_aspect_ratio = "square";
if (!data.current.enable_product_zoom) data.current.enable_product_zoom = true;
if (!data.current.show_stock_badge) data.current.show_stock_badge = true;
if (!data.current.show_sku) data.current.show_sku = true;
if (!data.current.show_product_tags) data.current.show_product_tags = true;
if (!data.current.show_share_buttons) data.current.show_share_buttons = true;
if (!data.current.review_star_color) data.current.review_star_color = "#E2C25D";
if (!data.current.product_tabs_style) data.current.product_tabs_style = "underline";

fs.writeFileSync('config/settings_schema.json', JSON.stringify(schema, null, 2));
fs.writeFileSync('config/settings_data.json', JSON.stringify(data, null, 2));
console.log('Successfully upgraded settings_schema.json and settings_data.json!');
