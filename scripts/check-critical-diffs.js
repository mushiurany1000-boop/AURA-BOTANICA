const fs = require('fs');
const path = require('path');

const diffDir = path.join(__dirname, 'diff_test');
const miniDir = path.join(diffDir, 'minimog');
const auraDir = path.join(diffDir, 'aura');

// Compare layout/theme.liquid
const miniLayout = fs.readFileSync(path.join(miniDir, 'layout', 'theme.liquid'), 'utf8');
const auraLayout = fs.readFileSync(path.join(auraDir, 'layout', 'theme.liquid'), 'utf8');
console.log('layout/theme.liquid identical?', miniLayout === auraLayout);

// Compare templates/index.json
const miniIndex = fs.readFileSync(path.join(miniDir, 'templates', 'index.json'), 'utf8');
const auraIndex = fs.readFileSync(path.join(auraDir, 'templates', 'index.json'), 'utf8');
console.log('templates/index.json identical?', miniIndex === auraIndex);

// Compare sections/header-group.json
const miniHg = fs.existsSync(path.join(miniDir, 'sections', 'header-group.json')) ? fs.readFileSync(path.join(miniDir, 'sections', 'header-group.json'), 'utf8') : 'NOT FOUND IN MINIMOG';
const auraHg = fs.existsSync(path.join(auraDir, 'sections', 'header-group.json')) ? fs.readFileSync(path.join(auraDir, 'sections', 'header-group.json'), 'utf8') : 'NOT FOUND IN AURA';
console.log('Minimog has header-group.json?', miniHg !== 'NOT FOUND IN MINIMOG');
console.log('Aura has header-group.json?', auraHg !== 'NOT FOUND IN AURA');
if (miniHg !== 'NOT FOUND IN MINIMOG' && auraHg !== 'NOT FOUND IN AURA') {
  console.log('header-group.json identical?', miniHg === auraHg);
}

// Compare sections/footer-group.json
const miniFg = fs.existsSync(path.join(miniDir, 'sections', 'footer-group.json')) ? fs.readFileSync(path.join(miniDir, 'sections', 'footer-group.json'), 'utf8') : 'NOT FOUND IN MINIMOG';
const auraFg = fs.existsSync(path.join(auraDir, 'sections', 'footer-group.json')) ? fs.readFileSync(path.join(auraDir, 'sections', 'footer-group.json'), 'utf8') : 'NOT FOUND IN AURA';
console.log('Minimog has footer-group.json?', miniFg !== 'NOT FOUND IN MINIMOG');
console.log('Aura has footer-group.json?', auraFg !== 'NOT FOUND IN AURA');
if (miniFg !== 'NOT FOUND IN MINIMOG' && auraFg !== 'NOT FOUND IN AURA') {
  console.log('footer-group.json identical?', miniFg === auraFg);
}

