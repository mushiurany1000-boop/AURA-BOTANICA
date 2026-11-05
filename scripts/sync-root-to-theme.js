/**
 * scripts/sync-root-to-theme.js
 * Synchronizes authoritative root theme folders to shopify-theme/
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const themeDir = path.join(__dirname, '..', 'shopify-theme');

const folders = ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function cleanDest(dest) {
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
}

console.log('>>> Synchronizing root theme directories to shopify-theme/...');
folders.forEach(folder => {
  const src = path.join(rootDir, folder);
  const dest = path.join(themeDir, folder);
  if (fs.existsSync(src)) {
    cleanDest(dest);
    copyRecursive(src, dest);
    console.log(`Synced ${folder}/ -> shopify-theme/${folder}/`);
  }
});

console.log('>>> Theme directories synchronized successfully.');

