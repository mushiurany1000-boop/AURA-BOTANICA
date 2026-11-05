const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const shopifyThemeDir = path.join(rootDir, 'shopify-theme');

// 1. Update locales with search accessibility strings
function patchLocales(baseDir) {
  const filePath = path.join(baseDir, 'locales', 'en.default.json');
  let json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.general) json.general = {};
  if (!json.general.search) json.general.search = {};
  json.general.search.submit = "Search formulations";
  json.general.search.clear = "Clear search query";

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log(`[PASS] Updated search locales in ${filePath}`);
}

// 2. Patch snippets/search-popup.liquid
function patchSearchPopupLiquid(baseDir) {
  const filePath = path.join(baseDir, 'snippets', 'search-popup.liquid');
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace mobile close button with accessible button
  content = content.replace(
    '<button data-close-search aria-label="Close">',
    '<button type="button" data-close-search class="m-search-popup__close" aria-label="{{ \'general.accessibility.close\' | t }}">'
  );

  // Replace submit button with accessible label
  content = content.replace(
    '<button type="submit" class="m-search-form--button" aria-label="Submit">',
    '<button type="submit" class="m-search-form--button" aria-label="{{ \'general.search.submit\' | t }}">'
  );

  // Replace clear search button with accessible attributes
  content = content.replace(
    '<span\n                      class="m-search-form--clear"\n                      data-clear-search\n                    >',
    '<button type="button" class="m-search-form--clear" data-clear-search aria-label="{{ \'general.search.clear\' | t }}">'
  );
  content = content.replace(
    '<span\n                      class="m-search-form--clear"\n                      data-clear-search>',
    '<button type="button" class="m-search-form--clear" data-clear-search aria-label="{{ \'general.search.clear\' | t }}">'
  );
  content = content.replace(
    '</span>\n                </form>',
    '</button>\n                </form>'
  );

  // Add desktop close button in header right side
  const desktopRightSideOld = '<div class="m:w-2/12 m:hidden md:m:flex m:justify-end m:items-center">';
  const desktopRightSideNew = `<div class="m:w-2/12 m:hidden md:m:flex m:justify-end m:items-center m:gap-4">
              <button type="button" data-close-search class="m-search-popup__close-desktop" aria-label="{{ 'general.accessibility.close' | t }}">
                <svg class="m-svg-icon--medium" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>`;

  if (content.includes(desktopRightSideOld) && !content.includes('m-search-popup__close-desktop')) {
    content = content.replace(desktopRightSideOld, desktopRightSideNew);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[PASS] Patched search-popup.liquid in ${filePath}`);
}

// 3. Append luxury styles & accessible focus rings to assets/search.css
function patchSearchCss(baseDir) {
  const filePath = path.join(baseDir, 'assets', 'search.css');
  let content = fs.readFileSync(filePath, 'utf8');

  const searchEnhancements = `
/* ==========================================================================
   AURA BOTANICA — LUXURY SEARCH POPUP ENHANCEMENTS (Phase 2)
   ========================================================================== */
.m-search-popup {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s ease;
}

.m-search-popup--wrapper {
  background-color: rgba(var(--color-background), 0.98);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgb(var(--color-border));
  box-shadow: 0 16px 40px rgba(24, 35, 31, 0.08);
  padding: 24px 0 32px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.m-search-popup__close,
.m-search-popup__close-desktop {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: rgb(var(--color-foreground));
  border-radius: var(--aura-radius-xs, 4px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.m-search-popup__close:hover,
.m-search-popup__close-desktop:hover {
  opacity: 0.7;
  transform: scale(1.05);
}

.m-search-popup__close:focus-visible,
.m-search-popup__close-desktop:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 2px;
}

.m-search-form--button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: rgb(var(--color-foreground));
  transition: color 0.2s ease, transform 0.2s ease;
}

.m-search-form--button:hover {
  color: var(--color-aura-copper, #B9784D);
}

.m-search-form--button:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 2px;
  border-radius: 4px;
}

.m-search-form input[type="search"] {
  font-family: var(--font-body-family, inherit);
  font-size: 1.125rem;
  letter-spacing: 0.02em;
  border: none;
  border-bottom: 1px solid rgb(var(--color-border));
  border-radius: 0;
  background: transparent;
  padding: 12px 16px;
  color: rgb(var(--color-foreground));
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.m-search-form input[type="search"]:focus {
  border-bottom-color: var(--color-aura-copper, #B9784D);
  box-shadow: 0 1px 0 var(--color-aura-copper, #B9784D);
  outline: none;
}

.m-search-popular--item {
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  padding: 4px 12px;
  border-radius: var(--aura-radius-full, 9999px);
  background-color: rgba(var(--color-foreground), 0.04);
  color: rgb(var(--color-foreground));
  transition: background-color 0.2s ease, color 0.2s ease;
}

.m-search-popular--item:hover {
  background-color: var(--color-aura-copper, #B9784D);
  color: #FFFFFF;
}

.m-search-popular--item:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 2px;
}

@media screen and (max-width: 767px) {
  .m-search-popup--wrapper {
    padding: 16px 0 24px;
  }
  .m-search-form input[type="search"] {
    font-size: 1rem;
    padding: 10px 12px;
  }
}

@media screen and (max-width: 360px) {
  .m-search-popup--wrapper {
    padding: 12px 0 20px;
  }
  .m-search-form input[type="search"] {
    font-size: 0.9375rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .m-search-popup,
  .m-search-popup--wrapper,
  .m-search-popup__close,
  .m-search-popup__close-desktop,
  .m-search-form--button,
  .m-search-popular--item {
    transition: none !important;
    animation: none !important;
  }
}
`;

  if (!content.includes('AURA BOTANICA — LUXURY SEARCH POPUP')) {
    content += searchEnhancements;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Injected search enhancements in ${filePath}`);
  }
}

// 4. Enhance assets/predictive-search.js for ESC closing and focus trap
function patchPredictiveSearchJs(baseDir) {
  const filePath = path.join(baseDir, 'assets', 'predictive-search.js');
  let content = fs.readFileSync(filePath, 'utf8');

  // Enhance Escape handler to close popup and return focus
  const oldEscapeTarget = 'if (event.key === "Escape") {\n        event.preventDefault();\n        this.close(true);\n      }';
  const newEscapeTarget = `if (event.key === "Escape") {
        event.preventDefault();
        this.close(true);
        MinimogEvents.emit(MinimogTheme.pubSubEvents.closeSearchPopup);
        const searchTrigger = document.querySelector("[data-open-search-popup]");
        if (searchTrigger) searchTrigger.focus();
      }`;

  if (content.includes(oldEscapeTarget)) {
    content = content.replace(oldEscapeTarget, newEscapeTarget);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Patched Escape key handling in ${filePath}`);
  }
}

[rootDir, shopifyThemeDir].forEach(dir => {
  patchLocales(dir);
  patchSearchPopupLiquid(dir);
  patchSearchCss(dir);
  patchPredictiveSearchJs(dir);
});

console.log('Phase 2 Step 3 (Search) patched successfully.');
