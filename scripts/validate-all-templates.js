const fs = require('fs');
const path = require('path');

const templatesDir = 'templates';
const sectionsDir = 'sections';

const templateFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.json'));

let totalErrors = 0;

templateFiles.forEach(tFile => {
  const tPath = path.join(templatesDir, tFile);
  let tData;
  try {
    tData = JSON.parse(fs.readFileSync(tPath, 'utf8'));
  } catch (e) {
    console.log(`[SYNTAX ERROR] in ${tFile}: ${e.message}`);
    totalErrors++;
    return;
  }

  if (!tData.sections) return;

  for (const [secId, secData] of Object.entries(tData.sections)) {
    const secType = secData.type;
    const secFile = path.join(sectionsDir, `${secType}.liquid`);
    if (!fs.existsSync(secFile)) {
      console.log(`[MISSING SECTION] in ${tFile} -> section "${secId}" references non-existent "sections/${secType}.liquid"`);
      totalErrors++;
      continue;
    }
    const content = fs.readFileSync(secFile, 'utf8');
    const match = content.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
    if (!match) continue;
    let schema;
    try {
      schema = JSON.parse(match[1]);
    } catch (e) {
      console.log(`[SCHEMA JSON ERROR] sections/${secType}.liquid: ${e.message}`);
      totalErrors++;
      continue;
    }

    const validSettingIds = new Set((schema.settings || []).filter(s => s.id).map(s => s.id));
    if (secData.settings) {
      for (const [sKey, sVal] of Object.entries(secData.settings)) {
        if (!validSettingIds.has(sKey)) {
          console.log(`[UNKNOWN SETTING] in ${tFile} -> section "${secId}" (${secType}) has unknown setting "${sKey}"`);
          totalErrors++;
        }
      }
    }

    const validBlockTypes = new Set((schema.blocks || []).filter(b => b.type).map(b => b.type));
    if (secData.blocks) {
      for (const [bId, bData] of Object.entries(secData.blocks)) {
        if (!validBlockTypes.has(bData.type)) {
          console.log(`[UNKNOWN BLOCK TYPE] in ${tFile} -> section "${secId}" (${secType}) block "${bId}" unknown type "${bData.type}"`);
          totalErrors++;
        }
      }
    }
  }
});

console.log('Total errors across all templates:', totalErrors);

