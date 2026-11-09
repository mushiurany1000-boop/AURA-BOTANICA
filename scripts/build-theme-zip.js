/**
 * scripts/build-theme-zip.js
 * Builds clean, Shopify OS 2.0 compliant ZIP archives using native .NET ZipFile.
 * Guaranteed compatibility with Shopify backend RubyZip extraction.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const THEME_DIR = path.join(ROOT, 'shopify-theme');

const zipNames = [
  'kayra-beauty-shopify-theme.zip',
  'aura-skincare-theme.zip'
];

const folders = ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];

// First verify all folders exist
folders.forEach(f => {
  const p = path.join(THEME_DIR, f);
  if (!fs.existsSync(p)) {
    throw new Error(`Missing required theme directory in shopify-theme: ${f}`);
  }
});

zipNames.forEach(zipName => {
  console.log(`>>> Packaging ${zipName} with native .NET ZipFile...`);
  execSync(
    `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/build-theme-archives.ps1 -SrcDir shopify-theme -DestZip "${zipName}"`,
    { cwd: ROOT, stdio: 'inherit' }
  );
});

console.log('>>> All theme ZIP archives built successfully and ready for Shopify upload.');
