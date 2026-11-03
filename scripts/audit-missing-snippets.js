const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, '..', 'shopify-theme', 'sections');
const snippetsDir = path.join(__dirname, '..', 'shopify-theme', 'snippets');

const existingSnippets = new Set(fs.readdirSync(snippetsDir).map(f => f.replace('.liquid', '')));
const sectionFiles = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.liquid'));

let missingSnippets = [];

sectionFiles.forEach(sf => {
  const content = fs.readFileSync(path.join(sectionsDir, sf), 'utf8');
  // Match render or include tags with string literal
  const regex = /\{%\s*(?:render|include)\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const snip = match[1];
    if (!existingSnippets.has(snip) && !snip.includes('/') && snip !== 'block') {
      missingSnippets.push({ section: sf, snippet: snip });
    }
  }
});

console.log('Total sections checked:', sectionFiles.length);
console.log('Total missing snippet calls:', missingSnippets.length);
if (missingSnippets.length > 0) {
  const uniqueMissing = [...new Set(missingSnippets.map(m => m.snippet))];
  console.log('Unique missing snippets count:', uniqueMissing.length);
  console.log('Unique missing snippet names:');
  uniqueMissing.forEach(s => {
    const callers = missingSnippets.filter(m => m.snippet === s).map(m => m.section);
    console.log(`  - ${s} (called in: ${[...new Set(callers)].join(', ')})`);
  });
}

