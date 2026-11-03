const fs = require('fs');
const path = require('path');

const dirs = ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];
let diffCount = 0;

dirs.forEach(d => {
  const rootDir = path.join(__dirname, '..', d);
  const themeDir = path.join(__dirname, '..', 'shopify-theme', d);
  if (!fs.existsSync(rootDir) || !fs.existsSync(themeDir)) return;

  const rootFiles = fs.readdirSync(rootDir);
  const themeFiles = fs.readdirSync(themeDir);

  const allFiles = new Set([...rootFiles, ...themeFiles]);
  allFiles.forEach(f => {
    const rootPath = path.join(rootDir, f);
    const themePath = path.join(themeDir, f);

    if (fs.existsSync(rootPath) && fs.statSync(rootPath).isDirectory()) return;

    if (!fs.existsSync(rootPath)) {
      console.log(`[DIFF] Missing in root: ${d}/${f}`);
      diffCount++;
    } else if (!fs.existsSync(themePath)) {
      console.log(`[DIFF] Missing in shopify-theme: ${d}/${f}`);
      diffCount++;
    } else {
      const c1 = fs.readFileSync(rootPath);
      const c2 = fs.readFileSync(themePath);
      if (!c1.equals(c2)) {
        console.log(`[DIFF] Content differs: ${d}/${f}`);
        diffCount++;
      }
    }
  });
});

console.log(`Total differences between root and shopify-theme: ${diffCount}`);

