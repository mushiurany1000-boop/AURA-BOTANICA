const fs = require('fs');
const path = require('path');

function checkSection(secPath) {
  if (!fs.existsSync(secPath)) return { exists: false };
  const content = fs.readFileSync(secPath, 'utf8');
  const schemaMatch = content.match(/\{\%\s*schema\s*\%}([\s\S]*?)\{\%\s*endschema\s*\%}/);
  let schema = null;
  let schemaErr = null;
  if (schemaMatch) {
    try {
      schema = JSON.parse(schemaMatch[1]);
    } catch (e) {
      schemaErr = e.message;
    }
  }
  return {
    exists: true,
    hasSchema: !!schemaMatch,
    schemaErr,
    name: schema ? schema.name : null,
    settingsCount: schema && schema.settings ? schema.settings.length : 0,
    blocksCount: schema && schema.blocks ? schema.blocks.length : 0,
    hasPresets: schema && schema.presets ? schema.presets.length > 0 : false
  };
}

console.log('Header audit:', checkSection('shopify-theme/sections/header.liquid'));
console.log('Announcement audit:', checkSection('shopify-theme/sections/annoucement.liquid'));
console.log('Footer audit:', checkSection('shopify-theme/sections/footer.liquid'));
console.log('Mobile sticky bar audit:', checkSection('shopify-theme/sections/mobile-sticky-bar.liquid'));
console.log('Age verifier audit:', checkSection('shopify-theme/sections/age-verifier-popup.liquid'));

