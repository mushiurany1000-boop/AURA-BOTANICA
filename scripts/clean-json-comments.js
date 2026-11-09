const fs = require('fs');
const path = require('path');

function cleanJsonInDir(dir) {
  let count = 0;
  for (let file of fs.readdirSync(dir)) {
    let full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (file === '.git' || file === 'node_modules') continue;
      count += cleanJsonInDir(full);
    } else if (file.endsWith('.json')) {
      let content = fs.readFileSync(full, 'utf8');
      if (content.trim().startsWith('/*')) {
        let clean = content.replace(/^\/\*[\s\S]*?\*\/\s*/, '');
        try {
          JSON.parse(clean); // verify validity
          fs.writeFileSync(full, clean);
          console.log(`Cleaned comment from: ${full}`);
          count++;
        } catch (e) {
          console.error(`Error parsing ${full} after removing comment: ${e.message}`);
        }
      }
    }
  }
  return count;
}

const cleaned = cleanJsonInDir('.');
console.log(`Total JSON files cleaned: ${cleaned}`);
