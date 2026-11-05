const fs = require('fs');
const path = require('path');

console.log('>>> Rebranding store from "Aura Botanica" to "KAYRA Beauty"...');

// Helper to replace in file
function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  for (const [target, replacement] of replacements) {
    if (typeof target === 'string') {
      content = content.split(target).join(replacement);
    } else if (target instanceof RegExp) {
      content = content.replace(target, replacement);
    }
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Updated: ${filePath}`);
  }
}

// 1. Config: settings_data.json
replaceInFile('config/settings_data.json', [
  ['"logo_text": "AURA BOTANICA"', '"logo_text": "KAYRA BEAUTY"'],
  ['/* Aura Botanica: Scoped Brand Overrides */', '/* KAYRA Beauty: Scoped Brand Overrides */'],
  ['Aura Botanica', 'KAYRA Beauty'],
  ['AURA BOTANICA', 'KAYRA BEAUTY']
]);

// 2. Config: settings_schema.json
replaceInFile('config/settings_schema.json', [
  ['Aura Botanica', 'KAYRA Beauty'],
  ['AURA BOTANICA', 'KAYRA BEAUTY']
]);

// 3. Sections: header-group.json & footer-group.json
replaceInFile('sections/header-group.json', [
  ['"logo_text": "AURA BOTANICA"', '"logo_text": "KAYRA BEAUTY"'],
  ['AURA BOTANICA', 'KAYRA BEAUTY'],
  ['Aura Botanica', 'KAYRA Beauty']
]);

replaceInFile('sections/footer-group.json', [
  ['© AURA BOTANICA 2026 • Pure Botanical Alchemy', '© 2026 KAYRA Beauty • Refined Skincare Alchemy'],
  ['AURA BOTANICA', 'KAYRA BEAUTY'],
  ['Aura Botanica', 'KAYRA Beauty']
]);

// 4. Liquid layout & snippets
replaceInFile('layout/theme.liquid', [
  ['Aura Botanica Global Config', 'KAYRA Beauty Global Config'],
  ['Aura Botanica v2.0 Design System', 'KAYRA Beauty v2.0 Design System'],
  ['Aura Botanica v2.0 Creative Motion', 'KAYRA Beauty v2.0 Creative Motion']
]);

replaceInFile('snippets/preload.liquid', [
  ['Aura Botanica Luxury Font Engine', 'KAYRA Beauty Luxury Font Engine'],
  ['Aura Botanica prefetch resources', 'KAYRA Beauty prefetch resources']
]);

replaceInFile('snippets/theme-data.liquid', [
  ['Aura Botanica', 'KAYRA Beauty'],
  ['AURA BOTANICA', 'KAYRA BEAUTY']
]);

replaceInFile('snippets/theme-info.liquid', [
  ['Aura Botanica v2.0.0 — Luxury Botanical Clinical Skincare', 'KAYRA Beauty v2.0.0 — Refined Skincare & Modern Alchemy']
]);

replaceInFile('snippets/back-in-stock.liquid', [
  ['Aura Botanica', 'KAYRA Beauty'],
  ['AURA BOTANICA', 'KAYRA BEAUTY']
]);

// 5. Sections liquid files
const sectionFiles = [
  'sections/benefits-strip.liquid',
  'sections/bento-row-1.liquid',
  'sections/bento-row-2.liquid',
  'sections/best-sellers.liquid',
  'sections/brand-story.liquid',
  'sections/collection-list.liquid',
  'sections/editorial-split.liquid',
  'sections/faq.liquid',
  'sections/new-arrivals.liquid',
  'sections/product-benefits-grid.liquid',
  'sections/product-comparison-table.liquid',
  'sections/product-reviews.liquid',
  'sections/reviews-showcase.liquid',
  'sections/skin-quiz.liquid',
  'sections/slideshow.liquid',
  'sections/subscribe-save-banner.liquid',
  'sections/trending-products.liquid',
  'sections/trust-badges.liquid'
];

sectionFiles.forEach(file => {
  replaceInFile(file, [
    ['The Aura Botanica Standard', 'The KAYRA Beauty Standard'],
    ['Aura Botanica Formulations', 'KAYRA Beauty Formulations'],
    ['Aura Botanica', 'KAYRA Beauty'],
    ['AURA BOTANICA', 'KAYRA BEAUTY']
  ]);
});

// 6. Templates JSON files
const templateFiles = [
  'templates/page.about-us.json',
  'templates/page.faqs.json',
  'templates/404.json',
  'templates/collection.filter-by-tags.json',
  'templates/product.grid-2-columns.json',
  'templates/index.json'
];

templateFiles.forEach(file => {
  replaceInFile(file, [
    ['Aura Botanica was founded', 'KAYRA Beauty was founded'],
    ['Aura Botanica Client Care', 'KAYRA Beauty Client Care'],
    ['Aura Botanica formulations', 'KAYRA Beauty formulations'],
    ['Aura Botanica is certified', 'KAYRA Beauty is certified'],
    ['Why Aura Botanica?', 'Why KAYRA Beauty?'],
    ['Aura Botanica', 'KAYRA Beauty'],
    ['AURA BOTANICA', 'KAYRA BEAUTY']
  ]);
});

// 7. Preview HTML files
const previewFiles = fs.readdirSync('preview').filter(f => f.endsWith('.html'));
previewFiles.forEach(f => {
  const full = path.join('preview', f);
  replaceInFile(full, [
    ['AURA BOTANICA', 'KAYRA BEAUTY'],
    ['Aura Botanica', 'KAYRA Beauty'],
    ['aura botanica', 'kayra beauty']
  ]);
});

// 8. Package.json & dev-server.js
replaceInFile('package.json', [
  ['"name": "aura-botanica-skincare-theme"', '"name": "kayra-beauty-skincare-theme"'],
  ['"description": "Modern Luxury Skincare Shopify Online Store 2.0 Theme"', '"description": "KAYRA Beauty Luxury Skincare Shopify Online Store 2.0 Theme"']
]);

replaceInFile('dev-server.js', [
  ['Aura Botanica', 'KAYRA Beauty'],
  ['AURA BOTANICA', 'KAYRA BEAUTY']
]);

// 9. Update header logo rendering in snippets/header-logo.liquid & sections/header.liquid
let headerLogo = fs.readFileSync('snippets/header-logo.liquid', 'utf8');
if (!headerLogo.includes('kayra-brand-logo')) {
  headerLogo = headerLogo.replace(
    '<strong>{{ header_settings.logo_text | default: shop.name }}</strong>',
    `{% if header_settings.logo_text contains 'KAYRA' %}
      <span class="kayra-brand-logo">
        <span class="kayra-brand-logo__wordmark">KAYRA</span>
        <span class="kayra-brand-logo__subtitle">BEAUTY</span>
      </span>
    {% else %}
      <strong>{{ header_settings.logo_text | default: shop.name }}</strong>
    {% endif %}`
  );
  fs.writeFileSync('snippets/header-logo.liquid', headerLogo);
  console.log('✓ Updated snippets/header-logo.liquid with KAYRA Beauty stacked wordmark');
}

let headerSection = fs.readFileSync('sections/header.liquid', 'utf8');
if (!headerSection.includes('kayra-brand-logo')) {
  headerSection = headerSection.replace(
    '<strong>{{ logo_text | default: shop.name }}</strong>',
    `{% if logo_text contains 'KAYRA' %}
      <span class="kayra-brand-logo">
        <span class="kayra-brand-logo__wordmark">KAYRA</span>
        <span class="kayra-brand-logo__subtitle">BEAUTY</span>
      </span>
    {% else %}
      <strong>{{ logo_text | default: shop.name }}</strong>
    {% endif %}`
  );
  fs.writeFileSync('sections/header.liquid', headerSection);
  console.log('✓ Updated sections/header.liquid with KAYRA Beauty stacked wordmark');
}

// 10. Update assets/aura-base.css with .kayra-brand-logo styling
let auraCss = fs.readFileSync('assets/aura-base.css', 'utf8');
if (!auraCss.includes('kayra-brand-logo')) {
  const logoCss = `
/* ==========================================================================
   KAYRA BEAUTY BRAND LOGO WORDMARK
   ========================================================================== */
.kayra-brand-logo {
  display: inline-flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  text-decoration: none !important;
  line-height: 1 !important;
  vertical-align: middle;
}

.kayra-brand-logo__wordmark {
  font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif !important;
  font-size: clamp(1.6rem, 2.2vw + 0.8rem, 2.25rem) !important;
  font-weight: 600 !important;
  letter-spacing: 0.12em !important;
  color: var(--color-aura-forest, var(--color-heading, #1E4123)) !important;
  line-height: 1 !important;
  text-transform: uppercase !important;
}

.kayra-brand-logo__subtitle {
  font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: clamp(0.55rem, 0.15vw + 0.45rem, 0.675rem) !important;
  font-weight: 500 !important;
  letter-spacing: 0.35em !important;
  color: var(--color-aura-muted, var(--color-foreground-secondary, #7A5248)) !important;
  line-height: 1 !important;
  text-transform: uppercase !important;
  margin-top: 3px !important;
  padding-left: 0.35em !important;
}
`;
  auraCss += '\n' + logoCss;
  fs.writeFileSync('assets/aura-base.css', auraCss);
  console.log('✓ Added .kayra-brand-logo styling in assets/aura-base.css');
}

console.log('>>> Rebranding to KAYRA Beauty completed successfully!');
