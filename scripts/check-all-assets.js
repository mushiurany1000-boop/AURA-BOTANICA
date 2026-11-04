const fs = require('fs');
const path = require('path');

const assetFiles = new Set(fs.readdirSync('assets'));
const missingAssets = new Set();
const referencedAssets = new Set();

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Match {{ 'asset_name' | asset_url }} or {{ "asset_name" | asset_url }}
  const matches = [...content.matchAll(/['"]([a-zA-Z0-9_\-\.\/]+\.[a-zA-Z0-9]+)['"]\s*\|\s*asset_url/g)];
  matches.forEach(m => {
    const rawAsset = m[1];
    const asset = path.basename(rawAsset);
    referencedAssets.add(asset);
    if (!assetFiles.has(asset)) {
      missingAssets.add(`${filePath} -> ${asset}`);
    }
  });
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (f.endsWith('.liquid') || f.endsWith('.js') || f.endsWith('.json')) {
      checkFile(full);
    }
  }
}

scanDir('layout');
scanDir('sections');
scanDir('snippets');
scanDir('templates');
scanDir('config');

console.log('Total unique assets referenced:', referencedAssets.size);
console.log('Missing asset references count:', missingAssets.size);
if (missingAssets.size > 0) {
  console.log('Missing assets:');
  missingAssets.forEach(m => console.log(' ', m));
}

