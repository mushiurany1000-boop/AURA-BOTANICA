const fs = require('fs');

// We have the image at docs/reference/noir-reference.png
const imgBuf = fs.readFileSync('docs/reference/noir-reference.png');
console.log('Image buffer size:', imgBuf.length);

// Inspect header dimensions (JPEG SOI marker 0xFFD8)
let width = 0, height = 0;
for (let i = 0; i < imgBuf.length - 8; i++) {
  if (imgBuf[i] === 0xFF && (imgBuf[i+1] === 0xC0 || imgBuf[i+1] === 0xC2)) {
    height = imgBuf.readUInt16BE(i + 5);
    width = imgBuf.readUInt16BE(i + 7);
    break;
  }
}
console.log(`Image dimensions: ${width}x${height}`);
