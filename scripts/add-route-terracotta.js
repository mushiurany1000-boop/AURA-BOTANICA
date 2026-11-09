const fs = require('fs');
let s = fs.readFileSync('dev-server.js', 'utf8');
if (!s.includes("'/terracotta'")) {
  s = s.replace(
    "if (urlPath === '/' || urlPath === '/index.html') {",
    "if (urlPath === '/' || urlPath === '/index.html') {\n    filePath = path.join(ROOT, 'preview', 'index.html');\n  } else if (urlPath === '/terracotta' || urlPath === '/terracotta.html') {\n    filePath = path.join(ROOT, 'preview', 'terracotta.html');"
  );
  fs.writeFileSync('dev-server.js', s, 'utf8');
  console.log('dev-server.js route for /terracotta added successfully!');
} else {
  console.log('/terracotta route already exists.');
}
