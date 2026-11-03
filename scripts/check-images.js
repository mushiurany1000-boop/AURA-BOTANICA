const fs = require('fs');
const https = require('https');
const http = require('http');

const files = [
  'preview/index.html',
  'preview/product.html',
  'preview/collection.html',
  'preview/admin.html',
  'data/products.json'
];

const urls = new Set();
const imgRegex = /src=["']([^"']+)["']/g;
const jsonImgRegex = /"image":\s*"([^"]+)"/g;

files.forEach(f => {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      if (match[1].startsWith('http') || match[1].startsWith('/')) {
        urls.add(match[1]);
      }
    }
    while ((match = jsonImgRegex.exec(content)) !== null) {
      if (match[1].startsWith('http') || match[1].startsWith('/')) {
        urls.add(match[1]);
      }
    }
  }
});

console.log('Total unique URLs found:', urls.size);

async function checkUrl(url) {
  if (url.startsWith('/')) {
    // Local path
    const localPath = '.' + url;
    const exists = fs.existsSync(localPath);
    return { url, ok: exists, status: exists ? 200 : 404, type: 'local' };
  }

  return new Promise((resolve) => {
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
        resolve({ url, ok: res.statusCode >= 200 && res.statusCode < 400, status: res.statusCode, type: 'remote' });
      });
      req.on('timeout', () => {
        req.destroy();
        resolve({ url, ok: false, status: 'TIMEOUT', type: 'remote' });
      });
      req.on('error', (err) => {
        resolve({ url, ok: false, status: err.message, type: 'remote' });
      });
      req.end();
    } catch (e) {
      resolve({ url, ok: false, status: e.message, type: 'remote' });
    }
  });
}

async function run() {
  const list = Array.from(urls);
  for (const u of list) {
    const res = await checkUrl(u);
    const mark = res.ok ? '✓' : '✗';
    console.log(`${mark} [${res.status}] ${res.url}`);
  }
}

run();

