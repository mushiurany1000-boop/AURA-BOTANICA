const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '..', 'assets', 'theme.js');
const cssPath = path.join(__dirname, '..', 'assets', 'theme.css');

const jsContent = fs.readFileSync(jsPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');

// 1. Analyze functions and exports in theme.js
const fnMatches = jsContent.match(/function\s+([a-zA-Z0-9_$]+)/g) || [];
const fnNames = [...new Set(fnMatches.map(f => f.replace('function ', '').trim()))];

const winMatches = jsContent.match(/window\.([a-zA-Z0-9_$]+)\s*=/g) || [];
const winProps = [...new Set(winMatches.map(w => w.replace('window.', '').replace('=', '').trim()))];

const customElemMatches = jsContent.match(/customElements\.define\(['"]([^'"]+)['"]/g) || [];
const customElems = [...new Set(customElemMatches.map(c => c.replace(/customElements\.define\(['"]/, '').replace(/['"]$/, '')))];

// 2. Scan Liquid files
const liquidDirs = ['sections', 'snippets', 'layout', 'templates'];
let liquidFiles = [];
liquidDirs.forEach(d => {
  const dirPath = path.join(__dirname, '..', d);
  if (!fs.existsSync(dirPath)) return;
  fs.readdirSync(dirPath).forEach(f => {
    if (f.endsWith('.liquid') || f.endsWith('.json')) {
      liquidFiles.push({ name: `${d}/${f}`, content: fs.readFileSync(path.join(dirPath, f), 'utf8') });
    }
  });
});

console.log('=== THEME.JS AUDIT ===');
console.log('Total functions in theme.js:', fnNames.length);
console.log('Total window properties:', winProps.length, winProps);
console.log('Total custom elements:', customElems.length, customElems);

console.log('\n--- Custom Elements in theme.js vs Liquid usage ---');
customElems.forEach(el => {
  const foundIn = liquidFiles.filter(lf => lf.content.includes(`<${el}`) || lf.content.includes(`</${el}>`)).map(lf => lf.name);
  console.log(`Element <${el}> used in:`, foundIn.length > 0 ? foundIn.join(', ') : 'NONE (unused)');
});

console.log('\n--- Window properties vs Liquid usage ---');
winProps.forEach(wp => {
  const foundIn = liquidFiles.filter(lf => lf.content.includes(wp)).map(lf => lf.name);
  console.log(`window.${wp} used in:`, foundIn.length > 0 ? foundIn.join(', ') : 'NONE');
});

// 3. Analyze selectors in theme.css vs Liquid
console.log('\n=== THEME.CSS AUDIT ===');
const cleanCss = cssContent.replace(/\/\*[\s\S]*?\*\//g, '');
const ruleBlocks = [];
const ruleRegex = /([^{}]+)\{([^{}]+)\}/g;
let rm;
while ((rm = ruleRegex.exec(cleanCss)) !== null) {
  const sel = rm[1].trim();
  const body = rm[2].trim();
  if (!sel.startsWith('@')) {
    ruleBlocks.push({ selector: sel, body });
  }
}
console.log('Total CSS rule blocks:', ruleBlocks.length);

const matchedRules = [];
const unneededRules = [];

ruleBlocks.forEach(rb => {
  // Extract classes, IDs, attributes
  const tokens = rb.selector.split(/[\s,>+~:]+/).filter(t => t.startsWith('.') || t.startsWith('#') || t.startsWith('['));
  let matchedIn = [];
  tokens.forEach(tok => {
    const raw = tok.replace(/^[.#\[]/, '').replace(/\]$/, '').split('=')[0];
    const found = liquidFiles.filter(lf => lf.content.includes(raw));
    if (found.length > 0) {
      matchedIn.push({ token: tok, count: found.length });
    }
  });

  if (matchedIn.length > 0) {
    matchedRules.push({ selector: rb.selector, body: rb.body, matchedIn });
  } else {
    unneededRules.push(rb.selector);
  }
});

console.log('Potentially matched CSS rules count:', matchedRules.length);
console.log('Unneeded/prototype-only CSS rules count:', unneededRules.length);

// Check Minimog-specific selectors in matched rules
const minimogPrefixRules = matchedRules.filter(r => r.selector.includes('.m-') || r.selector.includes('.sf-'));
console.log('Rules targeting Minimog prefixes (.m-*, .sf-*):', minimogPrefixRules.length);
minimogPrefixRules.forEach(r => console.log('  ', r.selector));

