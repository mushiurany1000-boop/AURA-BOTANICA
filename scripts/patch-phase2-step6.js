const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const shopifyThemeDir = path.join(rootDir, 'shopify-theme');

// 1. Update locales with scroll to top label
function patchLocales(baseDir) {
  const filePath = path.join(baseDir, 'locales', 'en.default.json');
  let json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.general) json.general = {};
  if (!json.general.accessibility) json.general.accessibility = {};
  json.general.accessibility.scroll_to_top = "Scroll to top of page";

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log(`[PASS] Updated scroll_to_top in ${filePath}`);
}

// 2. Patch snippets/scroll-top-button.liquid
function patchScrollTopLiquid(baseDir) {
  const filePath = path.join(baseDir, 'snippets', 'scroll-top-button.liquid');
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace aria-label
  content = content.replace('aria-label="Scroll to Top"', 'aria-label="{{ \'general.accessibility.scroll_to_top\' | t }}"');

  // Add focus ring and reduced motion to style block
  const styleTarget = '.m-button--scroll-top.is-show {\n      opacity: 1;\n    }';
  const styleAddition = `.m-button--scroll-top.is-show {
      opacity: 1;
    }
    .m-button--scroll-top {
      transition: opacity 0.3s ease, transform 0.2s ease, background-color 0.2s ease;
      background-color: var(--color-aura-forest, #18231F);
      color: var(--color-aura-ivory, #FCFBF7);
      box-shadow: 0 4px 16px rgba(24, 35, 31, 0.15);
    }
    .m-button--scroll-top:hover {
      background-color: var(--color-aura-copper, #B9784D);
      transform: translateY(-2px);
    }
    .m-button--scroll-top:focus-visible {
      outline: 2px solid var(--color-aura-copper, #B9784D);
      outline-offset: 3px;
    }
    @media (prefers-reduced-motion: reduce) {
      .m-button--scroll-top {
        transition: none !important;
        animation: none !important;
        transform: none !important;
      }
    }`;

  if (content.includes(styleTarget) && !content.includes('var(--color-aura-copper')) {
    content = content.replace(styleTarget, styleAddition);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[PASS] Patched scroll-top-button.liquid in ${filePath}`);
}

// 3. Patch snippets/page-transition.liquid
function patchPageTransitionLiquid(baseDir) {
  const filePath = path.join(baseDir, 'snippets', 'page-transition.liquid');
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace('background: #fff;', 'background: var(--color-aura-ivory, #FCFBF7);');

  const reducedMotionRule = `
    @media (prefers-reduced-motion: reduce) {
      .m-page-transition {
        display: none !important;
        animation: none !important;
        transition: none !important;
      }
    }
  </style>`;

  if (content.includes('</style>') && !content.includes('prefers-reduced-motion: reduce')) {
    content = content.replace('</style>', reducedMotionRule);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[PASS] Patched page-transition.liquid in ${filePath}`);
}

// 4. Append luxury styles & accessible focus rings to assets/cookie-banner.css
function patchCookieBannerCss(baseDir) {
  const filePath = path.join(baseDir, 'assets', 'cookie-banner.css');
  let content = fs.readFileSync(filePath, 'utf8');

  const cookieEnhancements = `
/* ==========================================================================
   AURA BOTANICA — LUXURY COOKIE BANNER ENHANCEMENTS (Phase 2)
   ========================================================================== */
.m-cookie-banner {
  background-color: rgba(24, 35, 31, 0.96);
  color: var(--color-aura-ivory, #FCFBF7);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(232, 225, 215, 0.15);
  box-shadow: 0 -8px 24px rgba(24, 35, 31, 0.12);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.m-cookie-banner__message {
  font-family: var(--font-body-family, inherit);
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(252, 251, 247, 0.9);
}

.m-cookie-banner__learn-more {
  color: #E2B293;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.cookie-action--accept {
  background-color: var(--color-aura-copper, #B9784D);
  color: #FFFFFF;
  border: none;
  border-radius: var(--aura-radius-xs, 4px);
  padding: 8px 18px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.cookie-action--accept:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.cookie-action--accept:focus-visible,
.cookie-action--decline:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 2px;
}

.cookie-action--decline {
  background: transparent;
  color: rgba(252, 251, 247, 0.8);
  border: 1px solid rgba(252, 251, 247, 0.3);
  border-radius: var(--aura-radius-xs, 4px);
  padding: 8px 16px;
  font-size: 0.8125rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.cookie-action--decline:hover {
  border-color: #FFFFFF;
  color: #FFFFFF;
}

@media (prefers-reduced-motion: reduce) {
  .m-cookie-banner,
  .cookie-action--accept,
  .cookie-action--decline {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}
`;

  if (!content.includes('AURA BOTANICA — LUXURY COOKIE BANNER')) {
    content += cookieEnhancements;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Injected cookie banner enhancements in ${filePath}`);
  }
}

// 5. Append luxury styles & accessible focus rings to assets/age-verifier.css
function patchAgeVerifierCss(baseDir) {
  const filePath = path.join(baseDir, 'assets', 'age-verifier.css');
  let content = fs.readFileSync(filePath, 'utf8');

  const ageEnhancements = `
/* ==========================================================================
   AURA BOTANICA — LUXURY AGE VERIFIER ENHANCEMENTS (Phase 2)
   ========================================================================== */
.m-age-verifier .m-modal--content {
  background-color: var(--color-aura-ivory, #FCFBF7);
  color: var(--color-aura-forest, #18231F);
  border-radius: var(--aura-radius-sm, 6px);
  border: 1px solid var(--color-aura-border, #E8E1D7);
  box-shadow: 0 24px 60px rgba(24, 35, 31, 0.2);
}

.m-age-verifier__title {
  font-family: var(--font-heading-family);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.m-age-verifier button:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .m-age-verifier,
  .m-age-verifier .m-modal--content,
  .m-age-verifier button {
    transition: none !important;
    animation: none !important;
  }
}
`;

  if (!content.includes('AURA BOTANICA — LUXURY AGE VERIFIER')) {
    content += ageEnhancements;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Injected age verifier enhancements in ${filePath}`);
  }
}

[rootDir, shopifyThemeDir].forEach(dir => {
  patchLocales(dir);
  patchScrollTopLiquid(dir);
  patchPageTransitionLiquid(dir);
  patchCookieBannerCss(dir);
  patchAgeVerifierCss(dir);
});

console.log('Phase 2 Step 6 (Cookie, Age Verifier, Page Transition & Scroll-Top) patched successfully.');
