const fs = require('fs');
const path = require('path');

const pairs = [
  ['sections/collection-list.liquid', 'shopify-theme/sections/collection-list.liquid'],
  ['sections/product-tabs.liquid', 'shopify-theme/sections/product-tabs.liquid'],
  ['sections/collection-showcase.liquid', 'shopify-theme/sections/collection-showcase.liquid'],
  ['sections/featured-collection.liquid', 'shopify-theme/sections/featured-collection.liquid'],
  ['snippets/collection-card.liquid', 'shopify-theme/snippets/collection-card.liquid'],
  ['snippets/cascade-collection-card.liquid', 'shopify-theme/snippets/cascade-collection-card.liquid']
];

pairs.forEach(([f1, f2]) => {
  [f1, f2].forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. col.url | default: '#' -> col.url | default: routes.all_products_collection_url
    content = content.replace(/col\.url\s*\|\s*default:\s*['"]#['"]/g, 'col.url | default: routes.all_products_collection_url');

    // 2. collection.url | default: "#" -> collection.url | default: routes.all_products_collection_url
    content = content.replace(/collection\.url\s*\|\s*default:\s*['"]#['"]/g, 'collection.url | default: routes.all_products_collection_url');

    // 3. In product-tabs:
    // data-url="{{ current_collection.url }}" -> data-url="{{ current_collection.url | default: routes.all_products_collection_url }}"
    content = content.replace(/data-url=["']\{\{\s*current_collection\.url\s*\}\}["']/g, 'data-url="{{ current_collection.url | default: routes.all_products_collection_url }}"');
    // href="{{ current_collection.url }}" -> href="{{ current_collection.url | default: routes.all_products_collection_url }}"
    content = content.replace(/href=["']\{\{\s*current_collection\.url\s*\}\}["']/g, 'href="{{ current_collection.url | default: routes.all_products_collection_url }}"');

    // 4. In featured-collection & collection-showcase:
    // href="{{ collection.url }}" -> href="{{ collection.url | default: routes.all_products_collection_url }}"
    content = content.replace(/href=["']\{\{\s*collection\.url\s*\}\}["']/g, 'href="{{ collection.url | default: routes.all_products_collection_url }}"');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated collection fallbacks in: ${file}`);
    } else {
      console.log(`No changes needed in: ${file}`);
    }
  });
});

console.log('Collection fallbacks patch completed.');

