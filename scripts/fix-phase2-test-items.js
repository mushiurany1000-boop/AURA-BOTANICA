const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const shopifyThemeDir = path.join(rootDir, 'shopify-theme');

[rootDir, shopifyThemeDir].forEach(dir => {
  // 1. Patch assets/mega-menu.js
  const mmPath = path.join(dir, 'assets', 'mega-menu.js');
  let mmContent = fs.readFileSync(mmPath, 'utf8');

  if (!mmContent.includes('e.key === "Escape"')) {
    mmContent = mmContent.replace(
      'this.initMobileMegaMenu();',
      `const closeBtn = document.querySelector(".m-menu-drawer__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.closeMenu();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.open) {
        this.closeMenu();
      }
    });
    this.initMobileMegaMenu();`
    );
    fs.writeFileSync(mmPath, mmContent, 'utf8');
    console.log(`[PASS] Injected ESC listener and closeBtn in ${mmPath}`);
  }

  // 2. Patch assets/mobile-sticky-bar.css
  const msbPath = path.join(dir, 'assets', 'mobile-sticky-bar.css');
  let msbContent = fs.readFileSync(msbPath, 'utf8');

  if (!msbContent.includes('@media screen and (max-width: 767px)')) {
    msbContent += `
@media screen and (max-width: 767px) {
  .m-mobile-sticky-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 60;
  }
}
`;
    fs.writeFileSync(msbPath, msbContent, 'utf8');
    console.log(`[PASS] Injected max-width: 767px query in ${msbPath}`);
  }
});

