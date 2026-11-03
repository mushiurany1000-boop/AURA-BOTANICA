const fs = require('fs');
const path = require('path');

function checkThemeLiquid() {
  const content = fs.readFileSync('layout/theme.liquid', 'utf8');
  const regex = /\{%[-]?\s*(?:render|include)\s*['"]([^'"]+)['"]/g;
  let match;
  console.log('--- Checking layout/theme.liquid ---');
  while ((match = regex.exec(content)) !== null) {
    const snippetName = match[1];
    const snippetPath = path.join('snippets', `${snippetName}.liquid`);
    const exists = fs.existsSync(snippetPath);
    console.log(`${snippetName}: ${exists ? 'OK' : 'MISSING'}`);
  }
}

checkThemeLiquid();

function checkPasswordLiquid() {
  const content = fs.readFileSync('layout/password.liquid', 'utf8');
  const regex = /\{%[-]?\s*(?:render|include)\s*['"]([^'"]+)['"]/g;
  let match;
  console.log('--- Checking layout/password.liquid ---');
  while ((match = regex.exec(content)) !== null) {
    const snippetName = match[1];
    const snippetPath = path.join('snippets', `${snippetName}.liquid`);
    const exists = fs.existsSync(snippetPath);
    console.log(`${snippetName}: ${exists ? 'OK' : 'MISSING'}`);
  }
}
checkPasswordLiquid();
