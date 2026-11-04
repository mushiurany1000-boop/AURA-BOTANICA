const fs = require('fs');
const path = require('path');
const dirs = ['sections', 'snippets', 'layout', 'templates'];
let links = [];
dirs.forEach(d => {
  if (!fs.existsSync(d)) return;
  fs.readdirSync(d).forEach(f => {
    const full = path.join(d, f);
    if (!fs.statSync(full).isFile()) return;
    const c = fs.readFileSync(full, 'utf8');
    const matches = c.match(/href=["']([^"'#{}][^"']*)["']/g) || [];
    matches.forEach(m => {
      const u = m.replace(/^href=["']/, '').replace(/["']$/, '');
      if (!u.startsWith('http') && !u.startsWith('mailto') && !u.startsWith('tel') && !u.startsWith('javascript')) {
        links.push({ file: d + '/' + f, url: u });
      }
    });
  });
});
console.log('Production theme internal links:');
const unique = [...new Set(links.map(l => l.url))];
unique.sort().forEach(u => console.log('  ' + u));
links.forEach(l => {
  if (l.url.includes('admin') || l.url.includes('api') || l.url === '/product') {
    console.log('Found anomaly:', l.file, '->', l.url);
  }
});

