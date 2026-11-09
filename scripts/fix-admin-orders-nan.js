const fs = require('fs');

// 1. Fix dev-server.js
let devServer = fs.readFileSync('dev-server.js', 'utf8');

// Fix revenue calculation
devServer = devServer.replace(
  'const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);',
  'const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total || o.total_price) || 0), 0);'
);

// Fix recent orders total mapping
devServer = devServer.replace(
  'total: o.total,',
  'total: Number(o.total || o.total_price || 0),'
);

fs.writeFileSync('dev-server.js', devServer);
console.log('dev-server.js orders total patched.');

// 2. Fix preview/admin.html
let adminHtml = fs.readFileSync('preview/admin.html', 'utf8');

adminHtml = adminHtml.replaceAll(
  '<td>$${Number(o.total).toFixed(2)}</td>',
  '<td>$${Number(o.total || o.total_price || 0).toFixed(2)}</td>'
);

adminHtml = adminHtml.replaceAll(
  '<td><strong>$${Number(o.total).toFixed(2)}</strong></td>',
  '<td><strong>$${Number(o.total || o.total_price || 0).toFixed(2)}</strong></td>'
);

// Also check any other instances of o.total in admin.html
adminHtml = adminHtml.replace(
  /Number\(o\.total\)/g,
  'Number(o.total || o.total_price || 0)'
);

fs.writeFileSync('preview/admin.html', adminHtml);
console.log('preview/admin.html orders total patched.');
