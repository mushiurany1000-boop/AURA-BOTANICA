const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'shopify-theme', 'sections', 'main-product.liquid'),
  path.join(__dirname, '..', 'sections', 'main-product.liquid')
];

const newCases = `
          {%- when 'quantity_selector' -%}
            <div class="product-quantity-block" {{ block.shopify_attributes }}>
              <label for="ProductQuantity-{{ section.id }}" class="quantity-label">Quantity:</label>
              <div class="quantity-picker">
                <button type="button" class="qty-btn" data-action="decrease" aria-label="Decrease quantity">-</button>
                <input
                  type="number"
                  name="quantity"
                  id="ProductQuantity-{{ section.id }}"
                  class="qty-input"
                  value="1"
                  min="1"
                  max="99"
                  aria-label="Quantity to add to bag"
                >
                <button type="button" class="qty-btn" data-action="increase" aria-label="Increase quantity">+</button>
              </div>
            </div>

          {%- when 'inventory_status' -%}
            <div class="product-inventory-block" {{ block.shopify_attributes }}>
              {%- assign inventory_qty = product.selected_or_first_available_variant.inventory_quantity | default: 12 -%}
              {%- if product.selected_or_first_available_variant.available -%}
                <div class="inventory-status inventory-status--low">
                  <span class="pulse-dot"></span>
                  <span class="inventory-text">
                    {%- if inventory_qty < 15 -%}
                      Only <strong>{{ inventory_qty }} bottles</strong> left in this cold-pressed batch
                    {%- else -%}
                      In stock &bull; Hand-poured batch ready for immediate dispatch
                    {%- endif -%}
                  </span>
                </div>
                <div class="inventory-progress-track">
                  <div class="inventory-progress-bar" style="width: 35%;"></div>
                </div>
              {%- else -%}
                <div class="inventory-status inventory-status--soldout">
                  <span class="pulse-dot pulse-dot--soldout"></span>
                  <span class="inventory-text">Currently awaiting seasonal harvest extraction</span>
                </div>
              {%- endif -%}
            </div>

          {%- when 'sku' -%}
            <div class="product-sku-block" {{ block.shopify_attributes }}>
              <span class="sku-label">SKU:</span>
              <span class="sku-value" id="ProductSkuValue">
                {{ product.selected_or_first_available_variant.sku | default: 'AB-BOT-01' }}
              </span>
            </div>

          {%- when 'rating' -%}
            <div class="product-rating-block" {{ block.shopify_attributes }}>
              <div class="rating-stars" aria-label="5 out of 5 stars">
                {%- for i in (1..5) -%}
                  {% render 'icon-star' %}
                {%- endfor -%}
              </div>
              <a href="#ProductReviews" class="rating-anchor">4.9/5 &bull; 48 Verified Client Reviews</a>
            </div>

          {%- when 'share' -%}
            <div class="product-share-block" {{ block.shopify_attributes }}>
              <span class="share-label">Share Formulation:</span>
              <div class="share-links">
                <a href="https://pinterest.com/pin/create/button/?url={{ shop.url }}{{ product.url }}&media={{ product.featured_media | image_url }}&description={{ product.title | url_encode }}" target="_blank" rel="noopener" class="share-link">Pinterest</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u={{ shop.url }}{{ product.url }}" target="_blank" rel="noopener" class="share-link">Facebook</a>
                <a href="https://twitter.com/intent/tweet?text={{ product.title | url_encode }}&url={{ shop.url }}{{ product.url }}" target="_blank" rel="noopener" class="share-link">X</a>
              </div>
            </div>

          {%- when 'popup' -%}
            <div class="product-popup-block" {{ block.shopify_attributes }}>
              <button type="button" class="product-popup-btn" data-action="open-size-chart">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                <span>{{ block.settings.text | default: 'Dosage Guide & Volume Specifications' }}</span>
              </button>
            </div>

          {%- when 'trust_badges' -%}
            <div class="product-trust-row" {{ block.shopify_attributes }}>
              <div class="trust-item">
                <span class="trust-icon">&#127807;</span>
                <span class="trust-label">100% Clean & Vegan</span>
              </div>
              <div class="trust-item">
                <span class="trust-icon">&#128230;</span>
                <span class="trust-label">Free Express Over $65</span>
              </div>
              <div class="trust-item">
                <span class="trust-icon">&#10024;</span>
                <span class="trust-label">30-Day Glow Guarantee</span>
              </div>
            </div>

          {%- when 'complementary_products' -%}
            <div class="product-complementary-block" {{ block.shopify_attributes }}>
              <h4 class="complementary-heading">{{ block.settings.heading | default: 'Pairs Harmoniously With' }}</h4>
              <div class="complementary-items-list">
                <div class="complementary-item" style="display:flex;align-items:center;gap:12px;padding:8px 0;">
                  <img src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=120&q=80" alt="Cloud Cream" width="48" height="48" loading="lazy" style="border-radius:4px;object-fit:cover;">
                  <div style="flex:1;">
                    <div style="font-size:0.85rem;font-weight:600;">Deep Lipid Cloud Cream</div>
                    <div style="font-size:0.78rem;color:var(--color-text-secondary);">$74.00</div>
                  </div>
                  <button type="button" class="btn btn-secondary btn-sm" data-action="quick-add" data-id="102" data-title="Deep Lipid Moisture Cloud Cream" data-price="$74.00" data-image="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80">+ Add</button>
                </div>
              </div>
            </div>
`;

const newSchemaBlocks = `    {
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
`;

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert new cases before {%- endcase -%}
  const endcaseTarget = '{%- endcase -%}';
  if (!content.includes("when 'inventory_status'")) {
    const lastEndcaseIdx = content.lastIndexOf(endcaseTarget);
    if (lastEndcaseIdx !== -1) {
      content = content.slice(0, lastEndcaseIdx) + newCases + '\n          ' + content.slice(lastEndcaseIdx);
    }
  }

  // Insert new schema blocks before the closing of "blocks": [
  const schemaTarget = '"type": "collapsible_tab",';
  if (!content.includes('"type": "inventory_status"')) {
    const tabIdx = content.indexOf(schemaTarget);
    if (tabIdx !== -1) {
      // Find the end of this collapsible_tab block
      const closingBraceIdx = content.indexOf('    }', tabIdx);
      if (closingBraceIdx !== -1) {
        const insertPos = closingBraceIdx + 5; // after '    },'
        content = content.slice(0, insertPos) + '\n' + newSchemaBlocks + content.slice(insertPos);
      }
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated blocks in:', filePath);
});

