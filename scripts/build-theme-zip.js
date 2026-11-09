/**
 * scripts/build-theme-zip.js
 * Builds POSIX-compliant, Shopify OS 2.0 ready theme ZIP archives:
 * 1. kayra-beauty-shopify-theme.zip (Primary brand export)
 * 2. aura-skincare-theme.zip (Legacy alias)
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
  const destZip = path.join(ROOT, zipName);
  if (fs.existsSync(destZip)) {
    try { fs.unlinkSync(destZip); } catch (e) {}
  }

  console.log(`>>> Packaging ${zipName}...`);
  try {
    // Attempt with bsdtar (tar.exe) which produces native POSIX forward-slash ZIP archives
    execSync(`tar.exe -a -c -f "${destZip}" -C "${THEME_DIR}" ${folders.join(' ')}`, {
      cwd: ROOT,
      stdio: 'pipe'
    });
    console.log(`[OK] Packaged with tar.exe -> ${zipName}`);
  } catch (err) {
    // Fallback to PowerShell System.IO.Compression
    console.log(`Falling back to PowerShell ZipFile for ${zipName}...`);
    const psScript = `
      Add-Type -AssemblyName System.IO.Compression;
      Add-Type -AssemblyName System.IO.Compression.FileSystem;
      $src = (Resolve-Path 'shopify-theme').Path;
      $dest = Join-Path (Get-Location) '${zipName}';
      if (Test-Path $dest) { Remove-Item $dest };
      $zip = [System.IO.Compression.ZipFile]::Open($dest, [System.IO.Compression.ZipArchiveMode]::Create);
      Get-ChildItem -Path $src -Recurse -File | ForEach-Object {
        $rel = $_.FullName.Substring($src.Length + 1).Replace('\\', '/');
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $rel);
      };
      $zip.Dispose();
    `.replace(/\s+/g, ' ').trim();
    execSync(`powershell -NoProfile -Command "${psScript}"`, { cwd: ROOT, stdio: 'pipe' });
    console.log(`[OK] Packaged with PowerShell -> ${zipName}`);
  }

  const stat = fs.statSync(destZip);
  console.log(`  Size: ${(stat.size / 1024).toFixed(1)} KB (${stat.size} bytes)\n`);
});

console.log('>>> All theme ZIP archives built successfully and ready for Shopify upload.');

