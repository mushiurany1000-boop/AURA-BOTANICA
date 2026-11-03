const fs = require('fs');

// 1. Patch predictive-search.js
['assets/predictive-search.js', 'shopify-theme/assets/predictive-search.js'].forEach(file => {
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');
  if (!c.includes('key === "Escape"')) {
    const target = 'clear.addEventListener("click", this.onClearSearch.bind(this));';
    const replacement = `${target}
    this.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        this.close(true);
      }
    });`;
    c = c.replace(target, replacement);
    fs.writeFileSync(file, c, 'utf8');
    console.log(`Added Escape key handling to ${file}`);
  }
});

// 2. Patch header.js
['assets/header.js', 'shopify-theme/assets/header.js'].forEach(file => {
  if (!fs.existsSync(file)) return;
  let c = fs.readFileSync(file, 'utf8');
  if (!c.includes('e.key === "Escape"')) {
    const target = 'this.siteNav = new SiteNav(this);';
    const replacement = `${target}
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const menuDrawer = document.querySelector(".m-menu-drawer.m-menu-drawer--open, m-menu-drawer[open]");
        if (menuDrawer && typeof menuDrawer.close === "function") {
          menuDrawer.close();
        }
        const openMenus = document.querySelectorAll(".m-menu__item--open, .m-mega-menu--open");
        openMenus.forEach(el => el.classList.remove("m-menu__item--open", "m-mega-menu--open"));
      }
    });`;
    c = c.replace(target, replacement);
    fs.writeFileSync(file, c, 'utf8');
    console.log(`Added Escape key handling to ${file}`);
  }
});

console.log('Search and header keyboard accessibility patch complete.');
