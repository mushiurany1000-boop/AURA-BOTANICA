const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const shopifyThemeDir = path.join(rootDir, 'shopify-theme');

// 1. Update locales with menu & navigation accessibility strings
function patchLocales(baseDir) {
  const filePath = path.join(baseDir, 'locales', 'en.default.json');
  let json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.general) json.general = {};
  if (!json.general.accessibility) json.general.accessibility = {};

  json.general.accessibility.toggle_menu = "Toggle navigation menu";
  json.general.accessibility.menu = "Menu";
  json.general.accessibility.home = "Home";
  json.general.accessibility.shop = "Shop formulations";
  json.general.accessibility.wishlist = "Wishlist";
  json.general.accessibility.account = "Account";
  json.general.accessibility.cart = "Shopping bag";
  json.general.accessibility.close_menu = "Close navigation menu";

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
  console.log(`[PASS] Updated locales in ${filePath}`);
}

// 2. Patch sections/header.liquid to make hamburger button an accessible button
function patchHeaderLiquid(baseDir) {
  const filePath = path.join(baseDir, 'sections', 'header.liquid');
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace span.m-menu-button with button.m-menu-button
  const oldMenuBtn = /<span class="m-menu-button m:flex m:flex-1 m:w-3\/12">\s*<div class="m-hamburger-box">\s*<div class="m-hamburger-box__inner"><\/div>\s*<\/div>\s*<\/span>/;
  const newMenuBtn = `<button type="button" class="m-menu-button m:flex m:flex-1 m:w-3/12" aria-label="{{ 'general.accessibility.toggle_menu' | t }}" aria-controls="m-menu-drawer" aria-expanded="false">
        <div class="m-hamburger-box">
          <div class="m-hamburger-box__inner"></div>
        </div>
      </button>`;

  if (oldMenuBtn.test(content)) {
    content = content.replace(oldMenuBtn, newMenuBtn);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Patched m-menu-button in ${filePath}`);
  }
}

// 3. Patch snippets/header-menu-drawer.liquid to add header and close button
function patchMenuDrawerLiquid(baseDir) {
  const filePath = path.join(baseDir, 'snippets', 'header-menu-drawer.liquid');
  let content = fs.readFileSync(filePath, 'utf8');

  const oldWrapperStart = '<div class="m-menu-drawer__wrapper">\n    <div class="m-menu-drawer__content">';
  const newWrapperStart = `<div class="m-menu-drawer__wrapper">
    <div class="m-menu-drawer__header m:flex m:items-center m:justify-between">
      <span class="m-menu-drawer__title">{{ 'general.accessibility.menu' | t }}</span>
      <button type="button" class="m-menu-drawer__close" aria-label="{{ 'general.accessibility.close_menu' | t }}">
        <svg class="m-svg-icon--medium" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <div class="m-menu-drawer__content">`;

  if (content.includes(oldWrapperStart) && !content.includes('m-menu-drawer__close')) {
    content = content.replace(oldWrapperStart, newWrapperStart);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Injected drawer header & close button in ${filePath}`);
  }
}

// 4. Patch sections/mobile-sticky-bar.liquid with accessible aria-labels
function patchMobileStickyBarLiquid(baseDir) {
  const filePath = path.join(baseDir, 'sections', 'mobile-sticky-bar.liquid');
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace('aria-label="product"', 'aria-label="{{ \'general.accessibility.home\' | t }}"');
  content = content.replace('aria-label="collection"', 'aria-label="{{ \'general.accessibility.shop\' | t }}"');
  content = content.replace('aria-label="wishlist"', 'aria-label="{{ \'general.accessibility.wishlist\' | t }}"');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[PASS] Patched mobile-sticky-bar aria-labels in ${filePath}`);
}

// 5. Append luxury styles & accessible focus rings to assets/header.css & assets/mobile-sticky-bar.css
function patchHeaderCss(baseDir) {
  const filePath = path.join(baseDir, 'assets', 'header.css');
  let content = fs.readFileSync(filePath, 'utf8');

  const headerEnhancements = `
/* ==========================================================================
   AURA BOTANICA — LUXURY BOTANICAL HEADER ENHANCEMENTS (Phase 2)
   ========================================================================== */
.m-header__wrapper {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, box-shadow 0.3s ease;
}

.m-header.header-sticky-always .m-header__wrapper,
.m-header.stuck .m-header__wrapper {
  box-shadow: 0 4px 20px rgba(24, 35, 31, 0.05);
  background-color: rgba(var(--color-background), 0.98);
  backdrop-filter: blur(12px);
}

.m-menu-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  color: inherit;
  align-items: center;
}

.m-menu-button:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 3px;
  border-radius: 4px;
}

.m-menu-drawer__header {
  padding: 18px 24px;
  border-bottom: 1px solid rgb(var(--color-border));
  background-color: rgb(var(--color-background));
}

.m-menu-drawer__title {
  font-family: var(--font-heading-family);
  font-size: 1.125rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: rgb(var(--color-foreground));
}

.m-menu-drawer__close {
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

.m-menu-drawer__close:hover {
  opacity: 0.7;
  transform: scale(1.05);
}

.m-menu-drawer__close:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 2px;
}

.m-mega-menu {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.25s;
}

.m-menu__item > a:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 2px;
  border-radius: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .m-header__wrapper,
  .m-mega-menu,
  .m-menu-drawer__wrapper,
  .m-menu-drawer__close {
    transition: none !important;
    animation: none !important;
  }
}
`;

  if (!content.includes('m-menu-drawer__header')) {
    content += headerEnhancements;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Injected header enhancements in ${filePath}`);
  }
}

function patchMobileStickyBarCss(baseDir) {
  const filePath = path.join(baseDir, 'assets', 'mobile-sticky-bar.css');
  let content = fs.readFileSync(filePath, 'utf8');

  const stickyBarEnhancements = `
/* ==========================================================================
   AURA BOTANICA — MOBILE BOTTOM STICKY NAV ENHANCEMENTS (Phase 2)
   ========================================================================== */
.m-mobile-sticky-bar {
  background-color: rgba(var(--color-background), 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgb(var(--color-border));
  box-shadow: 0 -4px 16px rgba(24, 35, 31, 0.04);
  min-height: 56px;
  padding: 0 12px;
}

.m-mobile-sticky-bar--item a,
.m-mobile-sticky-bar--item button {
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--color-foreground));
  border-radius: 4px;
  transition: color 0.2s ease, transform 0.2s ease;
}

.m-mobile-sticky-bar--item a:active {
  transform: scale(0.92);
}

.m-mobile-sticky-bar--item a:focus-visible {
  outline: 2px solid var(--color-aura-copper, #B9784D);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .m-mobile-sticky-bar--item a,
  .m-mobile-sticky-bar--item button {
    transition: none !important;
    transform: none !important;
  }
}
`;

  if (!content.includes('AURA BOTANICA — MOBILE BOTTOM STICKY NAV')) {
    content += stickyBarEnhancements;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[PASS] Injected mobile sticky bar enhancements in ${filePath}`);
  }
}

// 6. Enhance assets/mega-menu.js for keyboard trap, close button and focus management
function patchMegaMenuJs(baseDir) {
  const filePath = path.join(baseDir, 'assets', 'mega-menu.js');
  let content = fs.readFileSync(filePath, 'utf8');

  // Add close button selector and event
  if (!content.includes('menuDrawerClose: ".m-menu-drawer__close"')) {
    content = content.replace(
      'menuDrawerContent: ".m-menu-drawer__content",',
      'menuDrawerContent: ".m-menu-drawer__content",\n      menuDrawerClose: ".m-menu-drawer__close",'
    );
  }

  // Hook up close button click and focus trap inside init
  const hookTarget = 'this.domNodes.backDrop.addEventListener("click", (e) => {\n      this.closeMenu();\n    });';
  const hookAddition = `this.domNodes.backDrop.addEventListener("click", (e) => {
      this.closeMenu();
    });
    const closeBtn = document.querySelector(".m-menu-drawer__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.closeMenu();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.open) {
        this.closeMenu();
      }
    });`;

  if (content.includes(hookTarget) && !content.includes('.m-menu-drawer__close')) {
    content = content.replace(hookTarget, hookAddition);
  }

  // Focus return to hamburger button on closeMenu
  if (content.includes('this.open = false;') && !content.includes('this.returnFocusToHamburger')) {
    content = content.replace(
      'this.open = false;',
      `this.open = false;
      const triggerBtn = document.querySelector(".m-menu-button");
      if (triggerBtn) {
        triggerBtn.setAttribute("aria-expanded", "false");
        triggerBtn.focus();
      }`
    );
  }

  // Update aria-expanded on openMenu
  if (content.includes('this.open = true;') && !content.includes('triggerBtn.setAttribute("aria-expanded", "true")')) {
    content = content.replace(
      'this.open = true;',
      `this.open = true;
      const triggerBtn = document.querySelector(".m-menu-button");
      if (triggerBtn) {
        triggerBtn.setAttribute("aria-expanded", "true");
      }
      setTimeout(() => {
        const closeBtn = document.querySelector(".m-menu-drawer__close");
        if (closeBtn) closeBtn.focus();
      }, 100);`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[PASS] Patched mega-menu.js in ${filePath}`);
}

[rootDir, shopifyThemeDir].forEach(dir => {
  patchLocales(dir);
  patchHeaderLiquid(dir);
  patchMenuDrawerLiquid(dir);
  patchMobileStickyBarLiquid(dir);
  patchHeaderCss(dir);
  patchMobileStickyBarCss(dir);
  patchMegaMenuJs(dir);
});

console.log('Phase 2 Step 2 (Header, Mega Menu & Mobile Navigation) patched successfully.');

