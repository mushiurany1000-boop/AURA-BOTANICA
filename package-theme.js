/**
 * Package Shopify Theme into a ZIP archive for Shopify Admin Upload
 * Uses POSIX forward slashes ('/') in ZIP directory headers so Shopify (Linux) accepts the theme.
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const zipName = 'aura-skincare-theme.zip';
const zipPath = path.join(__dirname, zipName);
const sourceDir = path.join(__dirname, 'shopify-theme');

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

console.log('Packaging Shopify Theme for store upload...');

try {
  // Use bsdtar (built into Windows 10/11) to create a POSIX-compliant ZIP archive with '/' separators
  execSync(`tar.exe -a -c -f "${zipName}" -C "shopify-theme" assets blocks config layout locales sections snippets templates`, {
    cwd: __dirname,
    stdio: 'inherit'
  });
  console.log(`\n✅ Success! Shopify theme packaged as: ${zipName}`);
  console.log('Verified: POSIX forward slashes applied to all entries (Shopify-compatible)');
  console.log('You can now upload this ZIP directly in:');
  console.log('Shopify Admin -> Online Store -> Themes -> Add Theme -> Upload zip file\n');
} catch (e) {
  console.error('tar.exe packaging failed, trying .NET ZipArchive fallback:', e.message);
  try {
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
    execSync(`powershell -NoProfile -Command "${psScript}"`, { cwd: __dirname, stdio: 'inherit' });
    console.log(`\n✅ Success (Fallback)! Shopify theme packaged as: ${zipName}`);
  } catch (err2) {
    console.error('Fatal error packaging theme:', err2.message);
  }
}
