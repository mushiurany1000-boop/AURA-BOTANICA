const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'shopify-theme', 'sections', 'main-product.liquid'),
  path.join(__dirname, '..', 'sections', 'main-product.liquid')
];

const cleanSchema = `{
  "name": "Product Main",
  "settings": [
    {
      "type": "checkbox",
      "id": "enable_sticky_add_to_cart",
      "label": "Enable Sticky Bottom Add-to-Cart Bar",
      "default": true
    }
  ],
  "blocks": [
    {
      "type": "@app"
    },
    {
      "type": "title",
      "name": "Title & Rating",
      "limit": 1
    },
    {
      "type": "price",
      "name": "Price & Availability",
      "limit": 1
    },
    {
      "type": "description",
      "name": "Description",
      "limit": 1
    },
    {
      "type": "variant_picker",
      "name": "Variant Picker",
      "limit": 1,
      "settings": [
        {
          "type": "select",
          "id": "picker_type",
          "label": "Selector Type",
          "options": [
            { "value": "button", "label": "Pills / Swatches" },
            { "value": "dropdown", "label": "Dropdown Select" }
          ],
          "default": "button"
        }
      ]
    },
    {
      "type": "quantity_selector",
      "name": "Quantity Selector",
      "limit": 1
    },
    {
      "type": "inventory_status",
      "name": "Inventory Status & Pulse",
      "limit": 1,
      "settings": [
        {
          "type": "range",
          "id": "urgency_threshold",
          "min": 1,
          "max": 30,
          "step": 1,
          "label": "Low Stock Threshold",
          "default": 10
        }
      ]
    },
    {
      "type": "sku",
      "name": "SKU Indicator",
      "limit": 1
    },
    {
      "type": "rating",
      "name": "Review Star Rating",
      "limit": 1
    },
    {
      "type": "share",
      "name": "Social Share Links",
      "limit": 1
    },
    {
      "type": "popup",
      "name": "Pop-up / Dosage Modal",
      "settings": [
        {
          "type": "text",
          "id": "text",
          "label": "Button Label",
          "default": "Dosage Guide & Volume Specifications"
        }
      ]
    },
    {
      "type": "trust_badges",
      "name": "Trust Badges & Guarantees",
      "limit": 1
    },
    {
      "type": "selling_plans",
      "name": "Subscriptions & Selling Plans",
      "limit": 1
    },
    {
      "type": "buy_buttons",
      "name": "Buy Buttons & Quantity",
      "limit": 1,
      "settings": [
        {
          "type": "checkbox",
          "id": "show_dynamic_checkout",
          "label": "Show Dynamic Checkout Button",
          "default": true
        }
      ]
    },
    {
      "type": "complementary_products",
      "name": "Complementary Products",
      "limit": 1,
      "settings": [
        {
          "type": "text",
          "id": "heading",
          "label": "Heading",
          "default": "Pairs Harmoniously With"
        }
      ]
    },
    {
      "type": "collapsible_tab",
      "name": "Collapsible Tab",
      "settings": [
        {
          "type": "text",
          "id": "heading",
          "label": "Heading",
          "default": "Clinical Results & Benefits"
        },
        {
          "type": "richtext",
          "id": "content",
          "label": "Content",
          "default": "<p>Formulated with biocompatible active concentrations to restore moisture barrier resilience.</p>"
        },
        {
          "type": "page",
          "id": "page",
          "label": "Content from Page"
        },
        {
          "type": "checkbox",
          "id": "open_by_default",
          "label": "Open by default",
          "default": false
        }
      ]
    }
  ],
  "default": {
    "blocks": [
      { "type": "title" },
      { "type": "price" },
      { "type": "description" },
      { "type": "variant_picker" },
      { "type": "selling_plans" },
      { "type": "buy_buttons" },
      {
        "type": "collapsible_tab",
        "settings": {
          "heading": "Clinical Efficacy & TEWL Reduction",
          "content": "<p>In a 28-day independent clinical study, 98% of subjects showed statistically significant reduction in trans-epidermal water loss (TEWL) and sustained 24-hour hydration recovery.</p>",
          "open_by_default": true
        }
      },
      {
        "type": "collapsible_tab",
        "settings": {
          "heading": "Ritual Application & Layering Guide",
          "content": "<p>Warm 3 to 4 drops between clean palms. Gently press into cleansed facial contours, neck, and chest morning and evening before sealing with lipid cream.</p>"
        }
      },
      {
        "type": "collapsible_tab",
        "settings": {
          "heading": "Full Ingredient Transparency",
          "content": "<p>Camellia Sinensis Leaf Extract, Ceramide NP, Fermented Niacinamide, Sodium Hyaluronate, Squalane, Centella Asiatica Extract, Tocopherol.</p>"
        }
      },
      {
        "type": "collapsible_tab",
        "settings": {
          "heading": "Carbon-Neutral Delivery & 30-Day Guarantee",
          "content": "<p>Every order is shipped in 100% recyclable, plastic-free packaging with carbon offset. If your skin is not visibly calmer within 30 days, receive a complete courtesy refund.</p>"
        }
      }
    ]
  }
}`;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\{%\s*schema\s*%\}[\s\S]*?\{%\s*endschema\s*%\}/, `{% schema %}\n${cleanSchema}\n{% endschema %}`);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed schema in:', file);
});

