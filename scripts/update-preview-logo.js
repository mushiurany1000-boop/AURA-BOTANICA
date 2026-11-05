const fs = require('fs');
const path = require('path');

const previewDir = 'preview';
const logoHtml = `<span class="kayra-brand-logo" style="display:inline-flex;flex-direction:column;align-items:center;line-height:1;vertical-align:middle;text-decoration:none;"><span class="kayra-brand-logo__wordmark" style="font-family:'Cormorant Garamond', Georgia, serif;font-size:1.85rem;font-weight:600;letter-spacing:0.12em;line-height:1;text-transform:uppercase;">KAYRA</span><span class="kayra-brand-logo__subtitle" style="font-family:'Jost', sans-serif;font-size:0.6rem;font-weight:500;letter-spacing:0.35em;line-height:1;text-transform:uppercase;margin-top:3px;padding-left:0.35em;">BEAUTY</span></span>`;

const files = fs.readdirSync(previewDir).filter(f => f.endsWith('.html'));
for (const file of files) {
  const filePath = path.join(previewDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace plain text logo spans with the stacked wordmark
  content = content.replace(/<span class="site-header__logo-text">KAYRA BEAUTY<\/span>/g, `<span class="site-header__logo-text">${logoHtml}</span>`);
  content = content.replace(/<a href="\/" class="checkout-logo">KAYRA BEAUTY<\/a>/g, `<a href="/" class="checkout-logo">${logoHtml}</a>`);
  content = content.replace(/<div class="brand-logo">KAYRA BEAUTY<\/div>/g, `<div class="brand-logo">${logoHtml}</div>`);
  content = content.replace(/<span class="brand-title"[^>]*>KAYRA BEAUTY<\/span>/g, `<span class="brand-title">${logoHtml}</span>`);
  
  fs.writeFileSync(filePath, content);
}
console.log('✓ Successfully enhanced preview HTML files with KAYRA Beauty stacked logo wordmark');

