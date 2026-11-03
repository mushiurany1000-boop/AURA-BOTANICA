const fs = require('fs');
const path = require('path');

const missing = new Set();
const checked = new Set();

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /\{%[-]?\s*(?:render|include)\s*['"]([^'"\s]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const snippetName = match[1];
    checked.add(snippetName);
    const snippetPath = path.join('snippets', `${snippetName}.liquid`);
    if (!fs.existsSync(snippetPath)) {
      missing.add(`${filePath} -> ${snippetName}`);
    }
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (f.endsWith('.liquid')) {
      checkFile(full);
    }
  }
}

scanDir('layout');
scanDir('sections');
scanDir('snippets');

console.log('Total unique snippets referenced:', checked.size);
console.log('Missing references count:', missing.size);
if (missing.size > 0) {
  console.log('Missing snippets:');
  missing.forEach(m => console.log(' ', m));
}

