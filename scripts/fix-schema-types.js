const fs = require('fs');

console.log('=== Step 1: Fixing config/settings_schema.json ===');
const schema = JSON.parse(fs.readFileSync('config/settings_schema.json', 'utf8'));

// Fix Section 12: filter_color*.png -> type "image_picker"
let fixedImages = 0;
schema.forEach(sec => {
  if (sec.settings) {
    sec.settings.forEach(st => {
      if (st.type === 'image') {
        st.type = 'image_picker';
        fixedImages++;
      }
    });
  }
});
console.log(`Updated ${fixedImages} settings from "image" to "image_picker" in schema.`);

// Fix Section 18: free_shipping_threshold -> type "range"
let fixedCartNumber = 0;
schema.forEach(sec => {
  if (sec.settings) {
    sec.settings.forEach(st => {
      if (st.id === 'free_shipping_threshold' && st.type === 'number') {
        st.type = 'range';
        st.min = 0;
        st.max = 200;
        st.step = 5;
        st.unit = '$';
        fixedCartNumber++;
      }
    });
  }
});
console.log(`Updated ${fixedCartNumber} setting "free_shipping_threshold" to type "range" in schema.`);

fs.writeFileSync('config/settings_schema.json', JSON.stringify(schema, null, 2), 'utf8');
console.log('Saved config/settings_schema.json');

console.log('\n=== Step 2: Fixing sections/footer.liquid ===');
let footerLiquid = fs.readFileSync('sections/footer.liquid', 'utf8');
footerLiquid = footerLiquid.replace(
  /\{\s*"type"\s*:\s*"number",\s*"id"\s*:\s*"payment_icons_width",\s*"label"\s*:\s*"Image width \(px\)",\s*"default"\s*:\s*300\s*\}/g,
  JSON.stringify({
    type: "range",
    id: "payment_icons_width",
    label: "Image width (px)",
    min: 100,
    max: 600,
    step: 10,
    unit: "px",
    default: 300
  }, null, 6).replace(/\n/g, '\n    ')
);
fs.writeFileSync('sections/footer.liquid', footerLiquid, 'utf8');
console.log('Saved sections/footer.liquid');

console.log('\n=== Step 3: Fixing sections/product-reviews.liquid ===');
let reviewsLiquid = fs.readFileSync('sections/product-reviews.liquid', 'utf8');
reviewsLiquid = reviewsLiquid.replace(
  /\{\s*"type"\s*:\s*"number",\s*"id"\s*:\s*"total_reviews_count",\s*"label"\s*:\s*"Total reviews count",\s*"default"\s*:\s*24\s*\}/g,
  JSON.stringify({
    type: "range",
    id: "total_reviews_count",
    label: "Total reviews count",
    min: 1,
    max: 500,
    step: 1,
    default: 24
  }, null, 6).replace(/\n/g, '\n    ')
);
fs.writeFileSync('sections/product-reviews.liquid', reviewsLiquid, 'utf8');
console.log('Saved sections/product-reviews.liquid');

