const fs = require('fs');
const path = require('path');

const indexData = JSON.parse(fs.readFileSync('templates/index.json', 'utf8'));

let errors = [];

for (const [secId, secData] of Object.entries(indexData.sections)) {
  const secType = secData.type;
  const secFile = path.join('sections', `${secType}.liquid`);
  if (!fs.existsSync(secFile)) {
    errors.push(`Section "${secId}" references non-existent file "sections/${secType}.liquid"`);
    continue;
  }
  const content = fs.readFileSync(secFile, 'utf8');
  const match = content.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
  if (!match) {
    errors.push(`Section file "sections/${secType}.liquid" has no {% schema %} block!`);
    continue;
  }
  let schema;
  try {
    schema = JSON.parse(match[1]);
  } catch (e) {
    errors.push(`Section "sections/${secType}.liquid" has invalid JSON in schema: ${e.message}`);
    continue;
  }

  // Check valid setting keys
  const validSettingIds = new Set((schema.settings || []).filter(s => s.id).map(s => s.id));
  if (secData.settings) {
    for (const [settingKey, settingVal] of Object.entries(secData.settings)) {
      if (!validSettingIds.has(settingKey)) {
        errors.push(`Section "${secId}" (${secType}) has unknown setting key "${settingKey}"`);
      }
    }
  }

  // Check valid blocks
  const validBlockTypes = new Set((schema.blocks || []).filter(b => b.type).map(b => b.type));
  if (secData.blocks) {
    for (const [blockId, blockData] of Object.entries(secData.blocks)) {
      if (!validBlockTypes.has(blockData.type)) {
        errors.push(`Section "${secId}" (${secType}) block "${blockId}" has unknown block type "${blockData.type}"`);
      }
    }
  }
}

console.log('Total index.json errors:', errors.length);
errors.forEach(e => console.log(' - ' + e));
