const fs = require('fs');
const path = require('path');

const indexData = JSON.parse(fs.readFileSync('templates/index.json', 'utf8'));
const sectionTypes = Object.values(indexData.sections).map(s => s.type);

console.log('Sections used in index.json:', sectionTypes);

const snippetsDir = 'snippets';
const sectionsDir = 'sections';

const existingSnippets = new Set(fs.readdirSync(snippetsDir).map(f => f.replace(/\.liquid$/, '')));
const existingSections = new Set(fs.readdirSync(sectionsDir).map(f => f.replace(/\.liquid$/, '')));

let missingSections = [];
let missingSnippetsInSections = [];

sectionTypes.forEach(secType => {
  if (!existingSections.has(secType)) {
    missingSections.push(secType);
  } else {
    // Read the section file and check what snippets it renders/includes
    const content = fs.readFileSync(path.join(sectionsDir, `${secType}.liquid`), 'utf8');
    const renderMatches = [...content.matchAll(/\{%-?\s*(?:render|include)\s+['"]([^'"]+)['"]/g)];
    renderMatches.forEach(m => {
      const snippetName = m[1];
      if (!existingSnippets.has(snippetName)) {
        missingSnippetsInSections.push({ section: secType, snippet: snippetName });
      }
    });
  }
});

console.log('Missing sections in index.json:', missingSections);
console.log('Missing snippets in index.json sections:', missingSnippetsInSections);

// Also check layout/theme.liquid renders/includes
const themeLiquid = fs.readFileSync('layout/theme.liquid', 'utf8');
const themeRenders = [...themeLiquid.matchAll(/\{%-?\s*(?:render|include)\s+['"]([^'"]+)['"]/g)];
let missingSnippetsInTheme = [];
themeRenders.forEach(m => {
  const snip = m[1];
  if (!existingSnippets.has(snip)) {
    missingSnippetsInTheme.push(snip);
  }
});
console.log('Missing snippets in layout/theme.liquid:', missingSnippetsInTheme);

