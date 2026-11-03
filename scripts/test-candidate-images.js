const https = require('https');

const candidates = [
  'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=600&q=80'
];

async function test(u) {
  return new Promise((resolve) => {
    https.request(u, { method: 'HEAD', timeout: 5000 }, (res) => {
      resolve({ url: u, status: res.statusCode });
    }).on('error', (e) => resolve({ url: u, status: e.message })).end();
  });
}

async function main() {
  for (const c of candidates) {
    const res = await test(c);
    console.log(res.status, res.url);
  }
}
main();

