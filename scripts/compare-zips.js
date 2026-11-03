const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const minimogZip = 'C:/Users/Mushiur Rahman Any/.gemini/antigravity/brain/57665344-da44-4768-a19e-c303725227c7/.user_uploaded/media_1793680500291_92aee2e1.zip';
const auraZip = path.join(__dirname, '..', 'aura-skincare-theme.zip');

const diffDir = path.join(__dirname, 'diff_test');
if (fs.existsSync(diffDir)) fs.rmSync(diffDir, { recursive: true, force: true });
fs.mkdirSync(path.join(diffDir, 'minimog'), { recursive: true });
fs.mkdirSync(path.join(diffDir, 'aura'), { recursive: true });

execSync(`tar.exe -xf "${minimogZip}" -C "${path.join(diffDir, 'minimog')}"`);
execSync(`tar.exe -xf "${auraZip}" -C "${path.join(diffDir, 'aura')}"`);

console.log('Both unzipped successfully.');

// Compare files list
const getFiles = (dir, prefix = '') => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const rel = path.join(prefix, file).replace(/\\/g, '/');
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getFiles(full, rel));
    } else {
      results.push(rel);
    }
  });
  return results;
};

const miniFiles = getFiles(path.join(diffDir, 'minimog'));
const auraFiles = getFiles(path.join(diffDir, 'aura'));

console.log('Minimog file count:', miniFiles.length);
console.log('Aura file count:', auraFiles.length);

const missingInAura = miniFiles.filter(f => !auraFiles.includes(f));
console.log('Missing in Aura:', missingInAura.length, missingInAura);

const extraInAura = auraFiles.filter(f => !miniFiles.includes(f));
console.log('Extra in Aura:', extraInAura.length, extraInAura);

// Now compare config
const miniSchema = fs.readFileSync(path.join(diffDir, 'minimog', 'config', 'settings_schema.json'), 'utf8');
const auraSchema = fs.readFileSync(path.join(diffDir, 'aura', 'config', 'settings_schema.json'), 'utf8');

const miniData = fs.readFileSync(path.join(diffDir, 'minimog', 'config', 'settings_data.json'), 'utf8');
const auraData = fs.readFileSync(path.join(diffDir, 'aura', 'config', 'settings_data.json'), 'utf8');

console.log('Schema equal?', miniSchema === auraSchema);
console.log('Data equal?', miniData === auraData);

if (miniSchema !== auraSchema) {
  const s1 = JSON.parse(miniSchema);
  const s2 = JSON.parse(auraSchema);
  console.log('s1 sections:', s1.length, 's2 sections:', s2.length);
  s1.forEach((sec, idx) => {
    if (JSON.stringify(sec) !== JSON.stringify(s2[idx])) {
      console.log('Diff in schema section index', idx, sec.name);
      if (idx === 0) {
        console.log('Minimog s1[0]:', JSON.stringify(s1[0], null, 2));
        console.log('Aura s2[0]:', JSON.stringify(s2[0], null, 2));
      }
    }
  });
}

if (miniData !== auraData) {
  const d1 = JSON.parse(miniData);
  const d2 = JSON.parse(auraData);
  const k1 = Object.keys(d1.current);
  const k2 = Object.keys(d2.current);
  console.log('Extra keys in d2:', k2.filter(k => !k1.includes(k)));
}

