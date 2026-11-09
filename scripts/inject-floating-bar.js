const fs = require('fs');

const files = ['preview/terracotta.html', 'preview/product.html'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let html = fs.readFileSync(f, 'utf8');
    // Replace the opening div after FLOATING THEME SWITCHER PILL
    html = html.replace(
      /<!-- FLOATING THEME SWITCHER PILL -->\s*<div(?!\s+class="floating-theme-bar")/g,
      '<!-- FLOATING THEME SWITCHER PILL -->\n    <div class="floating-theme-bar"'
    );
    fs.writeFileSync(f, html, 'utf8');
    console.log(`Updated ${f} with class="floating-theme-bar"`);
  }
});

