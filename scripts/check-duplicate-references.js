const fs = require('fs');
const path = require('path');

const targets = [
  'announcement-bar',
  'featured-product',
  'slideshow',
  'promotional-banner',
  'spacer-divider',
  'hero-video',
  'annoucement',
  'new-featured-product',
  'slider',
  'promotion-banner',
  'empty-space',
  'video-hero'
];

targets.forEach(t => {
  const matches = [];
  ['templates', 'config', 'sections'].forEach(d => {
    const dirPath = path.join(__dirname, '..', d);
    if (!fs.existsSync(dirPath)) return;
    fs.readdirSync(dirPath).forEach(f => {
      if (!f.endsWith('.json')) return;
      const c = fs.readFileSync(path.join(dirPath, f), 'utf8');
      if (c.includes(`"${t}"`) || c.includes(`"type": "${t}"`)) {
        matches.push(`${d}/${f}`);
      }
    });
  });
  console.log(`${t}: referenced in ${matches.length > 0 ? matches.join(', ') : 'NONE'}`);
});

