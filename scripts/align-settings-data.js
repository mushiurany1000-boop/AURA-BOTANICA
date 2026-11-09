const fs = require('fs');

const data = JSON.parse(fs.readFileSync('config/settings_data.json', 'utf8'));

// Accent defaults per scheme
const accentDefaults = {
  'default': { primary_accent: '#315B45', secondary_accent: '#A7B49B', highlight_accent: '#B89A62' },
  'dark': { primary_accent: '#A7B49B', secondary_accent: '#315B45', highlight_accent: '#D4AF37' },
  'footer': { primary_accent: '#315B45', secondary_accent: '#A7B49B', highlight_accent: '#B89A62' },
  'badge-hot': { primary_accent: '#DA3F3F', secondary_accent: '#F5F5F5', highlight_accent: '#DA3F3F' },
  'badge-new': { primary_accent: '#315B45', secondary_accent: '#F5F5F5', highlight_accent: '#315B45' },
  'badge-sale': { primary_accent: '#B89A62', secondary_accent: '#F5F5F5', highlight_accent: '#B89A62' },
  'scheme-cee058e4-58e3-46aa-9af9-219dadc79066': { primary_accent: '#315B45', secondary_accent: '#A7B49B', highlight_accent: '#B89A62' },
  'scheme-09e5b5b4-774c-4b6c-8025-416ced49cc74': { primary_accent: '#315B45', secondary_accent: '#A7B49B', highlight_accent: '#B89A62' },
  'scheme-clay-rose': { primary_accent: '#8B3A2F', secondary_accent: '#F3E3DC', highlight_accent: '#B87350' },
  'scheme-terracotta-atelier': { primary_accent: '#7E3023', secondary_accent: '#F6E8E2', highlight_accent: '#B87350' },
  'scheme-forest-gold': { primary_accent: '#1E4123', secondary_accent: '#D9EEDF', highlight_accent: '#DEBC8C' },
  'scheme-noir-velvet': { primary_accent: '#9E3245', secondary_accent: '#D48D9B', highlight_accent: '#D4AF37' }
};

// 1. Ensure current.color_schemes has all 21 properties in each scheme
for (const [sId, sObj] of Object.entries(data.current.color_schemes)) {
  const acc = accentDefaults[sId] || { primary_accent: '#315B45', secondary_accent: '#A7B49B', highlight_accent: '#B89A62' };
  if (!sObj.settings.primary_accent) sObj.settings.primary_accent = acc.primary_accent;
  if (!sObj.settings.secondary_accent) sObj.settings.secondary_accent = acc.secondary_accent;
  if (!sObj.settings.highlight_accent) sObj.settings.highlight_accent = acc.highlight_accent;
}

// 2. Build full master color_schemes set
const masterSchemes = JSON.parse(JSON.stringify(data.current.color_schemes));

// 3. Update all presets
for (const [pName, pObj] of Object.entries(data.presets)) {
  if (!pObj.color_schemes) {
    pObj.color_schemes = JSON.parse(JSON.stringify(masterSchemes));
    console.log(`Initialized color_schemes for preset: "${pName}"`);
  } else {
    // Fill in missing schemes
    for (const [sId, sObj] of Object.entries(masterSchemes)) {
      if (!pObj.color_schemes[sId]) {
        pObj.color_schemes[sId] = JSON.parse(JSON.stringify(sObj));
      } else {
        const acc = accentDefaults[sId] || { primary_accent: '#315B45', secondary_accent: '#A7B49B', highlight_accent: '#B89A62' };
        if (!pObj.color_schemes[sId].settings.primary_accent) pObj.color_schemes[sId].settings.primary_accent = acc.primary_accent;
        if (!pObj.color_schemes[sId].settings.secondary_accent) pObj.color_schemes[sId].settings.secondary_accent = acc.secondary_accent;
        if (!pObj.color_schemes[sId].settings.highlight_accent) pObj.color_schemes[sId].settings.highlight_accent = acc.highlight_accent;
      }
    }
    console.log(`Updated color_schemes for preset: "${pName}"`);
  }
}

fs.writeFileSync('config/settings_data.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully aligned config/settings_data.json');

