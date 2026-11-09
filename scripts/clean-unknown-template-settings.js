const fs = require('fs');
const path = require('path');

const templatesDir = 'templates';
const sectionsDir = 'sections';

const templateFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.json'));

let cleanedCount = 0;

templateFiles.forEach(tFile => {
  const tPath = path.join(templatesDir, tFile);
  let tData = JSON.parse(fs.readFileSync(tPath, 'utf8'));

  if (!tData.sections) return;
  let fileModified = false;

  for (const [secId, secData] of Object.entries(tData.sections)) {
    const secType = secData.type;
    const secFile = path.join(sectionsDir, `${secType}.liquid`);
    if (!fs.existsSync(secFile)) continue;

    const content = fs.readFileSync(secFile, 'utf8');
    const match = content.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
    if (!match) continue;
    let schema;
    try {
      schema = JSON.parse(match[1]);
    } catch (e) {
      continue;
    }

    const validSettingIds = new Set((schema.settings || []).filter(s => s.id).map(s => s.id));
    if (secData.settings) {
      for (const sKey of Object.keys(secData.settings)) {
        if (!validSettingIds.has(sKey)) {
          delete secData.settings[sKey];
          cleanedCount++;
          fileModified = true;
        }
      }
    }
  }

  if (fileModified) {
    fs.writeFileSync(tPath, JSON.stringify(tData, null, 2), 'utf8');
  }
});

console.log(`Cleaned up ${cleanedCount} unknown settings across all templates.`);

