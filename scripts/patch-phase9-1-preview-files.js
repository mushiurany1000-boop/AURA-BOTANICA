/**
 * scripts/patch-phase9-1-preview-files.js
 * Update all preview/*.html files to load Playfair Display 700 & Montserrat 400/500/600,
 * aura-base.css, and modern luxury botanical color styling.
 */

const fs = require('fs');
const path = require('path');

const previewDir = path.join(__dirname, '..', 'preview');
const files = fs.readdirSync(previewDir).filter(f => f.endsWith('.html'));

const oldFontRegex = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+" rel="stylesheet">/g;
const newFontLink = `<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,700&display=swap" rel="stylesheet">`;

files.forEach(file => {
  const filePath = path.join(previewDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace Google Fonts link
  content = content.replace(oldFontRegex, newFontLink);

  // 2. Ensure aura-base.css is linked right after theme.css
  if (content.includes('theme.css') && !content.includes('aura-base.css')) {
    content = content.replace(
      /<link rel="stylesheet" href="\/assets\/theme\.css[^"]*">/,
      `<link rel="stylesheet" href="/assets/theme.css?v=2.2.0">\n    <link rel="stylesheet" href="/assets/aura-base.css?v=2.2.0">`
    );
  }

  // 3. Update preview bar styling to match Phase 9.1 botanical palette
  content = content.replace(/background:\s*#17211D;/g, 'background: #244638;');
  content = content.replace(/color:\s*#FAF8F5;/g, 'color: #F8F5EF;');
  content = content.replace(/color:\s*#E2BFA3;/g, 'color: #B89A62;');
  content = content.replace(/background:\s*rgba\(184,\s*124,\s*82,\s*0\.3\);/g, 'background: rgba(184, 154, 98, 0.25);');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Patched preview/${file}`);
});

console.log('>>> All preview/*.html files successfully updated with Phase 9.1 fonts & styles!');
