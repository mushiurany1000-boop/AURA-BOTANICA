const fs = require('fs');
const path = require('path');

function checkDir(d) {
  if (!fs.existsSync(d)) return;
  fs.readdirSync(d).forEach(f => {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) return;
    const txt = fs.readFileSync(p, 'utf8');
    const imageMatches = [...txt.matchAll(/"type"\s*:\s*"image"/g)];
    if (imageMatches.length > 0) {
      console.log('image match in:', p, imageMatches.length);
    }
    const numberMatches = [...txt.matchAll(/"type"\s*:\s*"number"/g)];
    if (numberMatches.length > 0) {
      console.log('number match in:', p, numberMatches.length);
    }
  });
}

console.log('Checking config...');
checkDir('config');
console.log('Checking sections...');
checkDir('sections');

