const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const shopifyThemeDir = path.join(rootDir, 'shopify-theme');
const gsapDist = path.join(rootDir, 'node_modules', 'gsap', 'dist');

const filesToCopy = [
  'gsap.min.js',
  'ScrollTrigger.min.js',
  'SplitText.min.js'
];

filesToCopy.forEach(fileName => {
  const src = path.join(gsapDist, fileName);
  if (!fs.existsSync(src)) {
    console.error(`Source file missing: ${src}`);
    process.exit(1);
  }
  const stat = fs.statSync(src);
  console.log(`Copying ${fileName} (${stat.size} bytes)...`);

  const destRoot = path.join(rootDir, 'assets', fileName);
  const destTheme = path.join(shopifyThemeDir, 'assets', fileName);

  fs.copyFileSync(src, destRoot);
  fs.copyFileSync(src, destTheme);
});

console.log('GSAP official minified files copied successfully to root and shopify-theme.');

