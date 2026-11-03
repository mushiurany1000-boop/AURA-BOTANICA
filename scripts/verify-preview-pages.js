const fs = require('fs');
const path = require('path');

const previewDir = path.join(__dirname, '..', 'preview');
const files = fs.readdirSync(previewDir).filter(f => f.endsWith('.html'));

console.log('======================================================');
console.log('🔍 AURA BOTANICA — PREVIEW PAGES INTEGRITY AUDIT');
console.log('======================================================\n');
console.log(`Auditing ${files.length} preview HTML pages...\n`);

let allPassed = true;

for (const f of files) {
  const content = fs.readFileSync(path.join(previewDir, f), 'utf8');
  console.log(`Page: ${f} (${(content.length / 1024).toFixed(1)} KB)`);
  
  // Check CSS links
  const cssMatches = content.match(/href="([^"]+\.css(?:\?[^"]*)?)"/g) || [];
  const cssUrls = cssMatches.map(m => m.replace(/^href="/, '').replace(/"$/, '').split('?')[0]);
  console.log(`  CSS links (${cssUrls.length}): ${cssUrls.join(', ')}`);
  
  // Check JS links
  const jsMatches = content.match(/src="([^"]+\.js(?:\?[^"]*)?)"/g) || [];
  const jsUrls = jsMatches.map(m => m.replace(/^src="/, '').replace(/"$/, '').split('?')[0]);
  console.log(`  JS scripts (${jsUrls.length}): ${jsUrls.join(', ')}`);
  
  const allUrls = [...cssUrls, ...jsUrls];
  let missing = [];
  
  for (const url of allUrls) {
    if (url.startsWith('http://') || url.startsWith('https://')) continue;
    const clean = url.replace(/^\//, '');
    const candidates = [
      path.join(previewDir, clean),
      path.join(__dirname, '..', clean),
      path.join(__dirname, '..', 'assets', clean),
      path.join(__dirname, '..', 'shopify-theme', 'assets', clean)
    ];
    if (!candidates.some(c => fs.existsSync(c))) {
      missing.push(url);
    }
  }
  
  if (missing.length > 0) {
    console.log(`  ✗ [FAIL] Missing local assets: ${missing.join(', ')}`);
    allPassed = false;
  } else {
    console.log(`  ✓ [PASS] All local asset dependencies verified`);
  }
}

console.log('\n======================================================');
console.log(`PREVIEW PAGES AUDIT RESULT: ${allPassed ? 'ALL PAGES VERIFIED (PASS)' : 'ASSET FAILURES DETECTED'}`);
console.log('======================================================\n');

process.exit(allPassed ? 0 : 1);
