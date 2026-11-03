const fs = require('fs');
const path = require('path');

const diffDir = path.join(__dirname, 'diff_test');
const miniDir = path.join(diffDir, 'minimog');
const auraDir = path.join(diffDir, 'aura');

console.log('=== HEADER-GROUP.JSON MINIMOG ===');
console.log(fs.readFileSync(path.join(miniDir, 'sections', 'header-group.json'), 'utf8'));

console.log('=== HEADER-GROUP.JSON AURA ===');
console.log(fs.readFileSync(path.join(auraDir, 'sections', 'header-group.json'), 'utf8'));

console.log('=== FOOTER-GROUP.JSON MINIMOG ===');
console.log(fs.readFileSync(path.join(miniDir, 'sections', 'footer-group.json'), 'utf8'));

console.log('=== FOOTER-GROUP.JSON AURA ===');
console.log(fs.readFileSync(path.join(auraDir, 'sections', 'footer-group.json'), 'utf8'));

