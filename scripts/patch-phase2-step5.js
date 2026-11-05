const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const shopifyThemeDir = path.join(rootDir, 'shopify-theme');

// 1. Clean footer-group.json strings
function patchFooterGroup(baseDir) {
  const filePath = path.join(baseDir, 'sections', 'footer-group.json');
  let json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (json.sections && json.sections.footer) {
    const footer = json.sections.footer;
    // Fix newsletter block title
    if (footer.blocks) {
      for (const [blkKey, blk] of Object.entries(footer.blocks)) {
        if (blk.type === 'newsletter' && blk.settings) {
          blk.settings.title = "Let's get in touch";
          blk.settings.description = "Sign up for our newsletter and receive 10% off your first ritual order";
        }
      }
    }
    // Fix copyright unicode
    if (footer.settings) {
      footer.settings.copyright = "© AURA BOTANICA 2026 • Pure Botanical Alchemy";
    }
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
    console.log(`[PASS] Patched footer-group.json in ${filePath}`);
  }
}

// 2. Append luxury styles & accessible focus rings to assets/footer.css
function patchFooterCss(baseDir) {
  const filePath = path.join(baseDir, 'assets', 'footer.css');
  let content = fs.readFileSync(filePath, 'utf8');

  const footerEnhancements = `
/* ==========================================================================
   AURA BOTANICA — LUXURY FOOTER ENHANCEMENTS (Phase 2)
   ========================================================================== */
.m-footer {
  background-color: var(--color-aura-forest, #18231F);
  color: var(--color-aura-ivory, #FCFBF7);
  border-top: 1px solid rgba(232, 225, 215, 0.12);
}

.m-footer--middle .m-footer--block-title {
  font-family: var(--font-heading-family);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--color-aura-ivory, #FCFBF7);
}

.m-footer--middle .m-footer--block-newsletter .m-footer--block-title {
  font-family: var(--font-heading-family);
  font-weight: 400;
  letter-spacing: 0.02em;
}

.m-footer a {
  color: rgba(252, 251, 247, 0.75);
  transition: color 0.2s ease, opacity 0.2s ease;
}

.m-footer a:hover {
  color: var(--color-aura-ivory, #FCFBF7);
  opacity: 1;
}

.m-footer a:focus-visible,
.m-footer button:focus-visible,
.m-footer input:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 2px;
  border-radius: 2px;
}

.m-footer .m-newsletter-form input {
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-aura-ivory, #FCFBF7);
  border-radius: var(--aura-radius-xs, 4px);
  padding: 12px 16px;
  font-size: 0.9375rem;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.m-footer .m-newsletter-form input:focus {
  border-color: var(--color-aura-copper, #B9784D);
  background-color: rgba(255, 255, 255, 0.1);
  outline: none;
}

.m-footer .m-newsletter-form button {
  background-color: var(--color-aura-copper, #B9784D);
  color: #FFFFFF;
  border-radius: var(--aura-radius-xs, 4px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.m-footer .m-newsletter-form button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.m-footer--bottom-menu-item a {
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
}

.m-footer__copyright {
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
  color: rgba(252, 251, 247, 0.6);
}

@media (max-width: 767px) {
  .m-footer--middle .m-accordion--item .m-accordion--item-button {
    padding: 14px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .m-footer a,
  .m-footer button,
  .m-footer .m-newsletter-form button {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}
`;

  if (!content.includes('AURA BOTANICA — LUXURY FOOTER')) {
    content += footerEnhancements;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Injected footer enhancements in ${filePath}`);
  }
}

[rootDir, shopifyThemeDir].forEach(dir => {
  patchFooterGroup(dir);
  patchFooterCss(dir);
});

console.log('Phase 2 Step 5 (Footer) patched successfully.');

