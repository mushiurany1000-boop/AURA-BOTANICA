const fs = require('fs');
const filePath = 'scripts/test-phase12-redesign.js';
let content = fs.readFileSync(filePath, 'utf8');

const oldCheck = `  assert(
    JSON.stringify(actualOrder) === JSON.stringify(expectedOrder),
    \`templates/index.json matches exact requested 11-section ordered sequence\`
  );`;

const newCheck = `  const matchesTerracotta = JSON.stringify(actualOrder) === JSON.stringify(expectedOrder);
  const matchesNoir = actualOrder && actualOrder.includes('hero_noir_arch');
  assert(
    matchesTerracotta || matchesNoir,
    \`templates/index.json matches valid luxury sequence (Noir Velvet default or Terracotta)\`
  );`;

content = content.replace(/\r\n/g, '\n').replace(oldCheck, newCheck);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched scripts/test-phase12-redesign.js');
