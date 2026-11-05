const fs = require('fs');
const path = require('path');

const previewDir = 'preview';
if (fs.existsSync(previewDir)) {
  const files = fs.readdirSync(previewDir).filter(f => f.endsWith('.html'));
  for (const file of files) {
    const filePath = path.join(previewDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('fonts.googleapis.com')) {
      content = content.replace(/family=[^"']+/g, 'family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
      fs.writeFileSync(filePath, content);
    }
  }
  console.log('✓ Updated preview HTML files with Cormorant Garamond & Jost');
}

