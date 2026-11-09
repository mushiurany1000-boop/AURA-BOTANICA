const fs = require('fs');

const p = 'templates/collection.custom-content-banner.json';
let c = fs.readFileSync(p, 'utf8');
c = c.split('"type": "featured_collection"').join('"type": "collection"');
fs.writeFileSync(p, c, 'utf8');
console.log('Fixed to collection in collection.custom-content-banner.json');
