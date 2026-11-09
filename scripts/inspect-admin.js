const fs = require('fs');
const html = fs.readFileSync('preview/admin.html', 'utf8');

// Find sections or nav items
const navMatches = [...html.matchAll(/data-tab="([^"]+)"/g)].map(m => m[1]);
console.log('Admin tabs:', [...new Set(navMatches)]);

// Find orders handling in scripts
const scriptMatches = html.match(/<script[\s\S]*?<\/script>/g) || [];
console.log('Script count:', scriptMatches.length);
for (let s of scriptMatches) {
  if (s.includes('order') || s.includes('fetch(') || s.includes('orders')) {
    console.log('Script snippet mentioning orders:');
    const lines = s.split('\n');
    lines.forEach((l, i) => {
      if (l.includes('order') || l.includes('total') || l.includes('orders')) {
        console.log(`  L${i}: ${l.trim()}`);
      }
    });
  }
}
