const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const shopifyThemeDir = path.join(rootDir, 'shopify-theme');

// 1. Refine templates/index.json
function refineIndexJson(baseDir) {
  const filePath = path.join(baseDir, 'templates', 'index.json');
  let content = fs.readFileSync(filePath, 'utf8');
  let data = JSON.parse(content);

  // Check and update headings in promo / collage banners
  for (const [secKey, sec] of Object.entries(data.sections || {})) {
    for (const [blkKey, blk] of Object.entries(sec.blocks || {})) {
      if (blk.settings && blk.settings.heading === 'The Bomber Jackets') {
        blk.settings.heading = 'Active Botanical Serums';
      }
      if (blk.settings && blk.settings.heading === 'Corduroy Shirts') {
        blk.settings.heading = 'Restorative Lipid Creams';
      }
      if (blk.settings && blk.settings.subheading === 'Minimog Store') {
        blk.settings.subheading = 'Aura Botanica Atelier';
      }
    }
    if (sec.settings) {
      if (sec.settings.subheading === 'Minimog Store') {
        sec.settings.subheading = 'Aura Botanica Atelier';
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`[PASS] Refined templates/index.json in ${baseDir}`);
}

// 2. Refine templates/product.grid-mix-columns.json
function refineProductGridMix(baseDir) {
  const filePath = path.join(baseDir, 'templates', 'product.grid-mix-columns.json');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);
    for (const [secKey, sec] of Object.entries(data.sections || {})) {
      if (sec.settings) {
        if (sec.settings.title && sec.settings.title.includes('Dresses')) {
          sec.settings.title = "Formulations you'll turn<br> to again and again.";
        }
        if (sec.settings.sub_title && sec.settings.sub_title.includes('Dress Edit')) {
          sec.settings.sub_title = "The Botanical Edit";
        }
      }
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`[PASS] Refined product.grid-mix-columns.json in ${baseDir}`);
  }
}

// 3. Update assets/aura-base.css with fluid type, fluid spacing, and easing & duration tokens
function refineAuraBaseCss(baseDir) {
  const filePath = path.join(baseDir, 'assets', 'aura-base.css');
  let content = fs.readFileSync(filePath, 'utf8');

  const tokensToAdd = `
  /* ========================================================================
     FLUID TYPOGRAPHY TOKENS (Phase 1 Refinement)
     ======================================================================== */
  --font-size-hero: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  --font-size-h1: clamp(2rem, 3.5vw + 0.5rem, 3.25rem);
  --font-size-h2: clamp(1.625rem, 2.5vw + 0.5rem, 2.5rem);
  --font-size-h3: clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem);
  --font-size-body: clamp(0.9375rem, 0.25vw + 0.875rem, 1.0625rem);

  /* ========================================================================
     FLUID SPACING TOKENS (Phase 1 Refinement)
     ======================================================================== */
  --space-xs: clamp(0.5rem, 0.5vw + 0.25rem, 0.75rem);
  --space-sm: clamp(0.75rem, 1vw + 0.5rem, 1.25rem);
  --space-md: clamp(1.25rem, 2vw + 0.75rem, 2rem);
  --space-lg: clamp(2rem, 3.5vw + 1rem, 3.5rem);
  --space-xl: clamp(3rem, 5vw + 1.5rem, 5.5rem);

  /* ========================================================================
     EASING & DURATION MOTION TOKENS (Phase 1 Refinement)
     ======================================================================== */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
`;

  if (!content.includes('--font-size-hero')) {
    content = content.replace('--aura-transition-slow: 0.6s cubic-bezier(0.16, 1, 0.3, 1);', '--aura-transition-slow: 0.6s cubic-bezier(0.16, 1, 0.3, 1);' + tokensToAdd);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Injected fluid typography, spacing & easing tokens in ${filePath}`);
  }
}

// 4. Update config/settings_schema.json with Animations settings group options
function refineSettingsSchema(baseDir) {
  const filePath = path.join(baseDir, 'config', 'settings_schema.json');
  let schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const animSection = schema.find(x => x.name === 'Animations');
  if (animSection) {
    // Check if new settings already present
    const existingIds = new Set(animSection.settings.map(s => s.id));
    const newSettings = [];

    if (!existingIds.has('animation_enable')) {
      newSettings.push({
        type: "checkbox",
        id: "animation_enable",
        label: "Master animation toggle",
        default: true
      });
    }

    if (!existingIds.has('animation_intensity')) {
      newSettings.push({
        type: "select",
        id: "animation_intensity",
        label: "Animation intensity",
        default: "subtle",
        options: [
          { value: "off", label: "Off" },
          { value: "subtle", label: "Subtle (Luxury botanical pacing)" },
          { value: "full", label: "Full motion" }
        ]
      });
    }

    if (!existingIds.has('animation_smooth_scroll')) {
      newSettings.push({
        type: "checkbox",
        id: "animation_smooth_scroll",
        label: "Enable smooth scrolling",
        default: true
      });
    }

    if (!existingIds.has('animation_custom_cursor')) {
      newSettings.push({
        type: "checkbox",
        id: "animation_custom_cursor",
        label: "Enable interactive magnetic cursor",
        default: false
      });
    }

    // Insert at beginning of Animations settings
    if (newSettings.length > 0) {
      animSection.settings = [...newSettings, ...animSection.settings];
      fs.writeFileSync(filePath, JSON.stringify(schema, null, 2) + '\n', 'utf8');
      console.log(`[PASS] Added ${newSettings.length} new animation controls to ${filePath}`);
    }
  }
}

// 5. Update config/settings_data.json with animation settings, clean custom_css, and social label
function refineSettingsData(baseDir) {
  const filePath = path.join(baseDir, 'config', 'settings_data.json');
  let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const cleanCustomCss = "/* Aura Botanica: Scoped Brand Overrides */\n.m-header__logo-text { letter-spacing: 0.18em; font-weight: 500; }";

  function applySettings(target) {
    target.animation_enable = true;
    target.animation_intensity = "subtle";
    target.animation_smooth_scroll = true;
    target.animation_custom_cursor = false;
    target.social_facebook_label = "150k Botanical Community";
    target.custom_css = cleanCustomCss;
  }

  applySettings(data.current);

  // Apply to presets as well
  if (data.presets) {
    for (const [pName, pData] of Object.entries(data.presets)) {
      applySettings(pData);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`[PASS] Refined settings_data.json in ${baseDir}`);
}

// Execute on both root and shopify-theme
[rootDir, shopifyThemeDir].forEach(dir => {
  refineIndexJson(dir);
  refineProductGridMix(dir);
  refineAuraBaseCss(dir);
  refineSettingsSchema(dir);
  refineSettingsData(dir);
});

console.log('All Phase 1 refinements executed successfully across root and shopify-theme.');
