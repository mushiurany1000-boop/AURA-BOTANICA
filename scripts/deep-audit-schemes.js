const fs = require('fs');

const schema = JSON.parse(fs.readFileSync('config/settings_schema.json', 'utf8'));
const data = JSON.parse(fs.readFileSync('config/settings_data.json', 'utf8'));

console.log('--- 1. Schema Section Names ---');
schema.forEach((s, idx) => {
  console.log(`[${idx}] ${s.name} (${s.settings ? s.settings.length : 0} settings)`);
});

console.log('\n--- 2. Color Schemes Definition ---');
const colorGroup = schema.find(s => s.settings && s.settings.some(x => x.type === 'color_scheme_group'));
const groupDef = colorGroup.settings.find(x => x.type === 'color_scheme_group');
const defKeys = groupDef.definition.filter(d => d.id).map(d => d.id);
console.log('Expected keys in each scheme:', defKeys);

console.log('\n--- 3. Checking current.color_schemes in settings_data.json ---');
if (!data.current || !data.current.color_schemes) {
  console.log('ERROR: data.current.color_schemes is MISSING!');
} else {
  for (const [schemeId, schemeObj] of Object.entries(data.current.color_schemes)) {
    const sSettings = schemeObj.settings || {};
    const missingKeys = defKeys.filter(k => !(k in sSettings));
    if (missingKeys.length > 0) {
      console.log(`Scheme "${schemeId}" missing ${missingKeys.length} keys:`, missingKeys);
    }
  }
}

console.log('\n--- 4. Checking presets in settings_data.json ---');
for (const [pName, pObj] of Object.entries(data.presets || {})) {
  if (!pObj.color_schemes) {
    console.log(`ERROR: Preset "${pName}" has NO color_schemes!`);
  } else {
    console.log(`Preset "${pName}" has color_schemes: ${Object.keys(pObj.color_schemes).length} schemes`);
    for (const [schemeId, schemeObj] of Object.entries(pObj.color_schemes)) {
      const sSettings = schemeObj.settings || {};
      const missingKeys = defKeys.filter(k => !(k in sSettings));
      if (missingKeys.length > 0) {
        console.log(`  Preset "${pName}" -> Scheme "${schemeId}" missing ${missingKeys.length} keys:`, missingKeys);
      }
    }
  }
}

