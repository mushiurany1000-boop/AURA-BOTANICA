const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dirsToScan = [
  path.join(rootDir, 'shopify-theme', 'sections'),
  path.join(rootDir, 'shopify-theme', 'snippets'),
  path.join(rootDir, 'preview')
];

let allLinks = [];

dirsToScan.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const filePath = path.join(dir, f);
    if (fs.statSync(filePath).isDirectory()) return;
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(/href="([^"#{][^"]*)"/g) || [];
    matches.forEach(m => {
      const url = m.replace(/^href="/, '').replace(/"$/, '');
      allLinks.push({ file: f, url });
    });
  });
});

console.log('Total links found:', allLinks.length);
const uniqueUrls = [...new Set(allLinks.map(l => l.url))];
console.log('Unique internal/relative URLs:');
const internalUrls = uniqueUrls.filter(u => !u.startsWith('http') && !u.startsWith('mailto:') && !u.startsWith('tel:') && !u.startsWith('javascript:'));
internalUrls.sort().forEach(u => console.log('  ', u));

