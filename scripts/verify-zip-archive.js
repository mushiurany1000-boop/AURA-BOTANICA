const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const zipPath = path.join(__dirname, '..', 'aura-skincare-theme.zip');

console.log('======================================================');
console.log('📦 AURA BOTANICA — SHOPIFY ZIP ARCHIVE VERIFICATION');
console.log('======================================================\n');

if (!fs.existsSync(zipPath)) {
  console.error('FAIL: aura-skincare-theme.zip does not exist!');
  process.exit(1);
}

const stat = fs.statSync(zipPath);
console.log(`Archive file: ${zipPath}`);
console.log(`Archive size: ${(stat.size / (1024 * 1024)).toFixed(2)} MB (${stat.size} bytes)\n`);

// Read entries via bsdtar
const output = execSync(`tar.exe -tf "${zipPath}"`, { encoding: 'utf8' });
const entries = output.split(/\r?\n/).map(e => e.trim()).filter(Boolean);

console.log(`Total archive entries: ${entries.length}`);

let checksPassed = 0;
let checksFailed = 0;

function check(label, cond, detail = '') {
  if (cond) {
    checksPassed++;
    console.log(`  ✓ [PASS] ${label}`);
  } else {
    checksFailed++;
    console.log(`  ✗ [FAIL] ${label}${detail ? ' -> ' + detail : ''}`);
  }
}

// 1. Root structure (no extra parent directory)
const rootFolders = new Set(entries.map(e => e.split('/')[0]));
const expectedTopLevel = ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];
const hasUnexpectedTop = [...rootFolders].filter(f => !expectedTopLevel.includes(f));
check('All entries reside directly under standard OS 2.0 theme folders (no wrapper folder)', hasUnexpectedTop.length === 0, `Unexpected: ${hasUnexpectedTop.join(', ')}`);

// 2. No backslashes
const backslashEntries = entries.filter(e => e.includes('\\'));
check('Zero backslashes in archive path headers (POSIX compliant)', backslashEntries.length === 0, `Found ${backslashEntries.length} entries with backslashes`);

// 3. Prohibited contents
const prohibited = entries.filter(e => 
  e.includes('node_modules') || 
  e.includes('.git') || 
  e.includes('.env') || 
  e.endsWith('credentials.json') || 
  e.includes('/credentials.') ||
  e.includes('package.json') ||
  e.includes('dev-server.js') ||
  e.endsWith('.DS_Store')
);
check('Zero development files, secrets, or node_modules present in ZIP', prohibited.length === 0, `Prohibited items: ${prohibited.join(', ')}`);

// 4. Critical Files Verification
const criticalFiles = [
  'layout/theme.liquid',
  'config/settings_schema.json',
  'config/settings_data.json',
  'locales/en.default.json',
  'sections/header-group.json',
  'sections/footer-group.json',
  'templates/index.json',
  'templates/product.json',
  'templates/collection.json',
  'templates/cart.json',
  'templates/search.json',
  'templates/404.json',
  'assets/theme.css',
  'assets/theme.js',
  'assets/main.css',
  'snippets/product-card.liquid',
  'snippets/cart-drawer.liquid'
];

criticalFiles.forEach(cf => {
  check(`Critical theme component present: ${cf}`, entries.includes(cf));
});

console.log('\n======================================================');
console.log(`ZIP VERIFICATION SUMMARY: ${checksPassed}/${checksPassed + checksFailed} CHECKS PASSED`);
console.log('======================================================\n');

process.exit(checksFailed === 0 ? 0 : 1);

