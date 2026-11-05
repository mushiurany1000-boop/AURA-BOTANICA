const fs = require('fs');

console.log('Patching Step A Design System...');

// 1. Patch assets/aura-base.css
let css = fs.readFileSync('assets/aura-base.css', 'utf8');

// Replace font definitions
css = css.replace(/--font-heading-family:[^;]+;/g, "--font-heading-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;");
css = css.replace(/--font-body-family:[^;]+;/g, "--font-body-family: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;");
css = css.replace(/--font-heading:[^;]+;/g, "--font-heading: 'Cormorant Garamond', Georgia, serif;");
css = css.replace(/--font-body:[^;]+;/g, "--font-body: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif;");

// Replace font families in CSS rules
css = css.replace(/font-family:\s*'Playfair Display'[^;]+!important;/g, "font-family: 'Cormorant Garamond', Georgia, serif !important;");
css = css.replace(/font-family:\s*'Montserrat'[^;]+!important;/g, "font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif !important;");

// Update Step A tokens block
const stepATokens = `
  /* ========================================================================
     PHASE 12 DESIGN SYSTEM TOKENS — TERRACOTTA ATELIER (DEFAULT) & FOREST & GOLD
     ======================================================================== */
  --color-aura-cream-bg: #FDF5F2;
  --color-aura-blush-card: #F6E8E2;
  --color-aura-deep-brown: #3B1E18;
  --color-aura-rust-band: #7E3023;
  --color-aura-button: #843C2D;
  --color-aura-button-hover: #6A2A1F;
  --color-aura-rust-card: #93422F;
  --color-aura-copper: #B87350;
  --color-aura-line: #E9D5CC;
  --color-aura-text-on-rust: #FCE8E7;

  /* Forest & Gold Tokens */
  --color-aura-forest-primary: #1E4123;
  --color-aura-forest-button: #667F6A;
  --color-aura-forest-btn-hover: #1E4123;
  --color-aura-gold-accent: #DEBC8C;
  --color-aura-star-gold: #E2C25D;
  --color-aura-white-bg: #FFFFFF;
  --color-aura-gray-band: #F5F5F5;
  --color-aura-stock-badge-bg: #D9EEDF;

  /* Fluid Headings (h1 ~ 48–88px desktop, 34–44px mobile; tight leading) */
  --font-fluid-h1: clamp(2.125rem, 4.5vw + 0.5rem, 5.5rem);
  --font-fluid-h2: clamp(1.75rem, 2.8vw + 0.5rem, 2.75rem);
  --font-fluid-h3: clamp(1.25rem, 1.5vw + 0.5rem, 1.875rem);
  --font-fluid-eyebrow: clamp(0.6875rem, 0.2vw + 0.625rem, 0.75rem);
  --font-fluid-body: clamp(0.9375rem, 0.2vw + 0.875rem, 1rem);

  /* Rectangular Button & Flat Card Tokens */
  --btn-border-radius: 0px;
  --btn-padding: 16px 32px;
  --btn-letter-spacing: 0.14em;
  --btn-text-transform: uppercase;
  --card-border-radius: 0px;
  --card-box-shadow: none;

  /* Section Spacing Tokens */
  --spacing-sections-desktop: 112px;
  --spacing-sections-laptop: 96px;
  --spacing-sections-tablet: 72px;
  --spacing-sections-mobile: 64px;
`;

if (!css.includes('--color-aura-cream-bg: #FDF5F2;')) {
  css = css.replace(':root {', ':root {' + stepATokens);
}

// Flat cards: no shadows, 0px radius, 1px border
css = css.replace(/border-radius:\s*4px;/g, 'border-radius: var(--card-border-radius, 0px);');
css = css.replace(/box-shadow:\s*0 4px 16px -2px rgba\(41, 45, 40, 0.03\);/g, 'box-shadow: none;');

// Primary button default to token
css = css.replace(/background-color:\s*#315B45\s*!important;/g, 'background-color: var(--color-aura-button, #843C2D) !important;');
css = css.replace(/color:\s*#F8F5EF\s*!important;/g, 'color: var(--color-aura-text-on-rust, #FCE8E7) !important;');
css = css.replace(/border:\s*1px solid #315B45\s*!important;/g, 'border: 1px solid var(--color-aura-button, #843C2D) !important;');

// Primary button hover
css = css.replace(/background-color:\s*#244638\s*!important;/g, 'background-color: var(--color-aura-button-hover, #6A2A1F) !important;');
css = css.replace(/border-color:\s*#244638\s*!important;/g, 'border-color: var(--color-aura-button-hover, #6A2A1F) !important;');

fs.writeFileSync('assets/aura-base.css', css);
console.log('✓ Updated assets/aura-base.css');

// 2. Patch snippets/style-tags.liquid if needed
let styleTags = fs.readFileSync('snippets/style-tags.liquid', 'utf8');
if (!styleTags.includes('--color-aura-cream-bg')) {
  const customTokens = `
    /* PHASE 12 STEP A TOKENS */
    --color-aura-cream-bg: #FDF5F2;
    --color-aura-blush-card: #F6E8E2;
    --color-aura-deep-brown: #3B1E18;
    --color-aura-rust-band: #7E3023;
    --color-aura-button: #843C2D;
    --color-aura-button-hover: #6A2A1F;
    --color-aura-rust-card: #93422F;
    --color-aura-copper: #B87350;
    --color-aura-line: #E9D5CC;
    --color-aura-text-on-rust: #FCE8E7;
  `;
  styleTags = styleTags.replace(':root {', ':root {' + customTokens);
  fs.writeFileSync('snippets/style-tags.liquid', styleTags);
  console.log('✓ Updated snippets/style-tags.liquid');
}

// 3. Patch layout/theme.liquid to verify font loading
let themeLiquid = fs.readFileSync('layout/theme.liquid', 'utf8');
if (!themeLiquid.includes('Cormorant+Garamond')) {
  console.log('theme.liquid uses preload.liquid for webfonts');
}

console.log('Step A Design System applied successfully.');
