const fs = require('fs');
const path = require('path');

const devServerPath = path.join(__dirname, '..', 'dev-server.js');
let content = fs.readFileSync(devServerPath, 'utf8');

// Replace rebuildThemeZip
const oldFn = /function rebuildThemeZip\(\)\s*\{[\s\S]*?return true;[\s\S]*?return false;\s*\}\s*\}\s*\}/;
const newFn = `function rebuildThemeZip() {
  const zipNames = ['kayra-beauty-shopify-theme.zip', 'aura-skincare-theme.zip'];
  let allSuccess = true;

  for (const zipName of zipNames) {
    try {
      const zipPath = path.join(ROOT, zipName);
      if (fs.existsSync(zipPath)) {
        try { fs.unlinkSync(zipPath); } catch (e) {}
      }
      execSync(\`tar.exe -a -c -f "\${zipName}" -C "shopify-theme" assets blocks config layout locales sections snippets templates\`, {
        cwd: ROOT,
        stdio: 'ignore'
      });
    } catch (err) {
      try {
        const psScript = \`
          Add-Type -AssemblyName System.IO.Compression;
          Add-Type -AssemblyName System.IO.Compression.FileSystem;
          $src = (Resolve-Path 'shopify-theme').Path;
          $dest = Join-Path (Get-Location) '\${zipName}';
          if (Test-Path $dest) { Remove-Item $dest };
          $zip = [System.IO.Compression.ZipFile]::Open($dest, [System.IO.Compression.ZipArchiveMode]::Create);
          Get-ChildItem -Path $src -Recurse -File | ForEach-Object {
            $rel = $_.FullName.Substring($src.Length + 1).Replace('\\\\', '/');
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $rel);
          };
          $zip.Dispose();
        \`.replace(/\\s+/g, ' ').trim();
        execSync(\`powershell -NoProfile -Command "\${psScript}"\`, { cwd: ROOT, stdio: 'ignore' });
      } catch (err2) {
        console.error('Error auto-packaging theme:', err2.message);
        allSuccess = false;
      }
    }
  }
  return allSuccess;
}`;

if (oldFn.test(content)) {
  content = content.replace(oldFn, newFn);
  console.log('rebuildThemeZip replaced successfully');
} else {
  console.log('Regex did not match, using string replacement');
  const targetStr = "function rebuildThemeZip() {";
  const endIdx = content.indexOf("function runThemeCheckCLI() {");
  const startIdx = content.indexOf(targetStr);
  if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + newFn + "\n\n" + content.substring(endIdx);
    console.log('rebuildThemeZip replaced via substring');
  }
}

// Update download and package handlers
content = content.replace(
  "if (req.method === 'GET' && (urlPath === '/api/theme/download' || urlPath === '/download/aura-skincare-theme.zip')) {",
  "if (req.method === 'GET' && (urlPath === '/api/theme/download' || urlPath === '/download/kayra-beauty-shopify-theme.zip' || urlPath === '/download/aura-skincare-theme.zip')) {"
);

content = content.replace(
  "const zipPath = path.join(ROOT, 'aura-skincare-theme.zip');",
  "const chosenFile = urlPath.includes('aura') ? 'aura-skincare-theme.zip' : 'kayra-beauty-shopify-theme.zip';\n    const zipPath = path.join(ROOT, chosenFile);"
);

content = content.replace(
  "'Content-Disposition': 'attachment; filename=\"aura-skincare-theme.zip\"',",
  "'Content-Disposition': `attachment; filename=\"${chosenFile}\"`, "
);

content = content.replace(
  "archive: 'aura-skincare-theme.zip',",
  "archive: 'kayra-beauty-shopify-theme.zip',\n      altArchive: 'aura-skincare-theme.zip',"
);

fs.writeFileSync(devServerPath, content, 'utf8');
console.log('dev-server.js updated successfully!');
