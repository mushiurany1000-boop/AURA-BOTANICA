const fs = require('fs');
const path = require('path');

function cleanJsonDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      cleanJsonDir(fullPath);
    } else if (file.endsWith('.json')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.trim().startsWith('/*')) {
        const commentEnd = content.indexOf('*/');
        if (commentEnd !== -1) {
          content = content.substring(commentEnd + 2).trim();
          fs.writeFileSync(fullPath, content);
          console.log(`Cleaned comment from ${fullPath}`);
        }
      }
    }
  }
}

cleanJsonDir('templates');
cleanJsonDir('sections');
cleanJsonDir('config');
cleanJsonDir('locales');
console.log('JSON comments cleaned successfully.');

