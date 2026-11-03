const fs = require('fs');
const path = require('path');

const dirs = ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];

console.log('=== COMPARISON: ROOT vs shopify-theme/ ===');
let hasDifferences = false;

for (const d of dirs) {
  const rootFiles = fs.existsSync(d) ? fs.readdirSync(d) : [];
  const themeFiles = fs.existsSync(path.join('shopify-theme', d)) ? fs.readdirSync(path.join('shopify-theme', d)) : [];
  console.log(`\nDirectory: ${d}`);
  console.log(`  Root count: ${rootFiles.length} | shopify-theme count: ${themeFiles.length}`);
  
  const rootOnly = rootFiles.filter(f => !themeFiles.includes(f));
  const themeOnly = themeFiles.filter(f => !rootFiles.includes(f));
  
  if (rootOnly.length > 0) {
    console.log(`  Root ONLY (${rootOnly.length}): ${rootOnly.slice(0, 10).join(', ')}`);
    hasDifferences = true;
  }
  if (themeOnly.length > 0) {
    console.log(`  shopify-theme ONLY (${themeOnly.length}): ${themeOnly.slice(0, 10).join(', ')}`);
    hasDifferences = true;
  }
  
  // Check content diff for common files
  const common = rootFiles.filter(f => themeFiles.includes(f));
  let contentDiffs = [];
  for (const f of common) {
    const rootStat = fs.statSync(path.join(d, f));
    if (rootStat.isDirectory()) continue;
    const themeStat = fs.statSync(path.join('shopify-theme', d, f));
    if (rootStat.size !== themeStat.size) {
      contentDiffs.push(`${f} (size diff: root=${rootStat.size}, theme=${themeStat.size})`);
    }
  }
  if (contentDiffs.length > 0) {
    console.log(`  Content/size differences (${contentDiffs.length}): ${contentDiffs.slice(0, 5).join(', ')}`);
    hasDifferences = true;
  }
}

console.log('\n=== SUMMARY ===');
console.log(`Differences detected: ${hasDifferences}`);

