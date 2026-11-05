const fs = require('fs');
let content = fs.readFileSync('FEATURE_PARITY.md', 'utf8');

const targetHeader = '| Feature Domain | Specific Capability | Current Implementation File(s) | v2.0 Evolution Strategy | Status |\n| :--- | :--- | :--- | :--- | :---: |';

const phase12Rows = `
| **Homepage Architecture** | Phase 12 Luxury Editorial Hero Split | \`sections/editorial-split.liquid\`, \`templates/index.json\` | Left ivory panel + Playfair Display headline + line mask + solid CTA, right full-bleed media with parallax | **IMPROVED** |
| **Homepage Architecture** | Phase 12 Benefits Strip Band | \`sections/benefits-strip.liquid\`, \`templates/index.json\` | 4 pillars (Shop, Ritual, Ingredients, Quiz) with thin-line icons, small-caps, thin vertical dividers, 2x2 mobile | **IMPROVED** |
| **Homepage Architecture** | Phase 12 Shop by Category 4-Card Grid | \`sections/collection-list.liquid\`, \`templates/index.json\` | Soft-tinted cards, product cutout image, label, subtext, hover lift + arrow slide, scroll-snap mobile | **IMPROVED** |
| **Homepage Architecture** | Phase 12 Bento Row 1 (Ritual + Spotlight) | \`sections/bento-row-1.liquid\`, \`templates/index.json\` | Two-up: Featured Ritual deep card + Ingredient Spotlight blush card with circular image | **IMPROVED** |
| **Homepage Architecture** | Phase 12 Bento Row 2 (Skin Quiz + Journal) | \`sections/bento-row-2.liquid\`, \`templates/index.json\` | Two-up: Routine Finder with texture swatch + CTA to Skin Quiz + Journal blog card | **IMPROVED** |
| **Homepage Architecture** | Phase 12 Interactive Skin Quiz Page | \`sections/skin-quiz.liquid\`, \`templates/page.skin-quiz.json\` | 3-step diagnostic wizard mapping skin focus, texture, and sensitivity to collection URLs | **IMPROVED** |
| **Homepage Architecture** | Phase 12 Subscribe & Save Banner | \`sections/subscribe-save-banner.liquid\`, \`templates/index.json\` | Full-width unboxing media + 15% discount selling-plan messaging + flexible delivery CTA | **IMPROVED** |
| **Homepage Architecture** | Phase 12 Two-Column Accordion FAQ | \`sections/faq.liquid\`, \`templates/index.json\` | Two-column desktop grid, accessible aria-expanded toggles (+/-), GSAP height animation, FAQPage schema | **IMPROVED** |
| **Product Experience** | Single Product Gallery & Controls | \`sections/main-product.liquid\`, \`snippets/product-media.liquid\` | Large rounded main image, circular green prev/next buttons, 4 thumbnails, fetchpriority high, zoom | **IMPROVED** |
| **Product Experience** | Single Product Buy Box Pills & Stepper | \`snippets/main-product-blocks.liquid\`, \`sections/main-product.liquid\` | Eyebrow, Playfair title, in-stock pill, 5-star ratings, compare-at savings badge, size/volume pills, dynamic checkout | **IMPROVED** |
| **Product Experience** | Metafield Dynamic Tabs (INCI & Ritual) | \`sections/product-details-tabs.liquid\`, \`docs/METAFIELDS.md\` | Description, Full Ingredients (INCI), How to Use, Additional Info powered by OS 2.0 metafields | **IMPROVED** |
| **Product Experience** | Product Reviews Summary & Zero-Fake-Data Empty State | \`sections/product-reviews.liquid\`, \`templates/product.json\` | 5-star breakdown bars for real data, clean 'Be the first to review' empty state when no app is installed | **IMPROVED** |`;

if (!content.includes('Phase 12 Luxury Editorial Hero Split')) {
  content = content.replace(targetHeader, targetHeader + phase12Rows);
  fs.writeFileSync('FEATURE_PARITY.md', content);
  console.log('Updated FEATURE_PARITY.md with Phase 12 capabilities');
} else {
  console.log('Phase 12 already in FEATURE_PARITY.md');
}
