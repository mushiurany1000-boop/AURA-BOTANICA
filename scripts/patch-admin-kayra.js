const fs = require('fs');
const path = require('path');

const adminPath = path.join(__dirname, '..', 'preview', 'admin.html');
let content = fs.readFileSync(adminPath, 'utf8');

content = content.replace(/Join the Aura Glow Club/g, 'Join the KAYRA Glow Club');
content = content.replace(/aura-skincare-theme\.zip/g, 'kayra-beauty-shopify-theme.zip');

fs.writeFileSync(adminPath, content, 'utf8');
console.log('preview/admin.html successfully updated with KAYRA BEAUTY branding & ZIP export!');
