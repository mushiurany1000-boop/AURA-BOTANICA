const fs = require('fs');
const path = require('path');

console.log('=== PHASE 7: DEEP THEME AUDIT & DISCREPANCY SCAN ===\n');

// 1. Scan all sections
const sectionsDir = 'sections';
const sectionFiles = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.liquid'));
console.log(`Found ${sectionFiles.length} section Liquid files.`);

const sectionSchemas = {};
const emptySections = [];
const missingSnippetCalls = [];
const missingAssetCalls = [];
const invalidSchemas = [];
const sectionsWithoutPresets = [];

const snippetFiles = new Set(fs.readdirSync('snippets'));
const assetFiles = new Set(fs.readdirSync('assets'));

sectionFiles.forEach(file => {
  const filePath = path.join(sectionsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if empty or trivial
  if (content.trim().length < 50) {
    emptySections.push(file);
  }

  // Check schema
  const schemaMatch = content.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
  if (!schemaMatch) {
    invalidSchemas.push({ file, error: 'No {% schema %} tag found' });
  } else {
    try {
      const parsed = JSON.parse(schemaMatch[1]);
      sectionSchemas[file.replace('.liquid', '')] = parsed;
      if (!parsed.presets && !file.includes('template') && !file.includes('header') && !file.includes('footer') && !file.includes('apps') && !file.includes('annoucement')) {
        sectionsWithoutPresets.push(file);
      }
    } catch (e) {
      invalidSchemas.push({ file, error: e.message });
    }
  }

  // Check snippet calls: {% render 'snippet' %} or {% include 'snippet' %}
  const renderMatches = [...content.matchAll(/\{%[-]?\s*(?:render|include)\s*['"]([^'"\s]+)['"]/g)];
  renderMatches.forEach(m => {
    const snip = m[1];
    if (!snippetFiles.has(snip + '.liquid')) {
      // ignore review apps that are conditional
      if (!['judgeme_widgets', 'ssw-widget-avg-rate-listing', 'socialshopwave-widget-recommends'].includes(snip)) {
        missingSnippetCalls.push({ file, snippet: snip });
      }
    }
  });

  // Check asset calls: {{ 'name' | asset_url }}
  const assetMatches = [...content.matchAll(/['"]([a-zA-Z0-9_\-\.]+\.(?:css|js|svg|png|jpg|gif))['"]\s*\|\s*asset_url/g)];
  assetMatches.forEach(m => {
    const asset = m[1];
    if (!assetFiles.has(asset)) {
      missingAssetCalls.push({ file, asset });
    }
  });
});

console.log(`\nSection Schema Issues: ${invalidSchemas.length}`);
invalidSchemas.forEach(s => console.log(`  - ${s.file}: ${s.error}`));

console.log(`\nMissing Snippet Calls: ${missingSnippetCalls.length}`);
missingSnippetCalls.forEach(s => console.log(`  - In ${s.file}: snippet '${s.snippet}' missing`));

console.log(`\nMissing Asset Calls: ${missingAssetCalls.length}`);
missingAssetCalls.forEach(s => console.log(`  - In ${s.file}: asset '${s.asset}' missing`));

// 2. Scan all JSON templates
const templatesDir = 'templates';
const templateFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.json'));
console.log(`\nFound ${templateFiles.length} JSON templates.`);

const missingTemplateSections = [];
templateFiles.forEach(file => {
  const filePath = path.join(templatesDir, file);
  try {
    const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (json.sections) {
      Object.entries(json.sections).forEach(([key, sec]) => {
        if (sec.type) {
          const secFile = sec.type + '.liquid';
          if (!fs.existsSync(path.join(sectionsDir, secFile))) {
            missingTemplateSections.push({ template: file, sectionKey: key, type: sec.type });
          }
        }
      });
    }
  } catch (e) {
    console.error(`Invalid JSON in template ${file}: ${e.message}`);
  }
});

console.log(`Missing sections referenced in templates: ${missingTemplateSections.length}`);
missingTemplateSections.forEach(m => console.log(`  - In ${m.template}: section type '${m.type}' does not exist`));

// 3. Scan Section Groups (header-group.json, footer-group.json)
['header-group.json', 'footer-group.json'].forEach(group => {
  const groupPath = path.join(sectionsDir, group);
  if (fs.existsSync(groupPath)) {
    try {
      const json = JSON.parse(fs.readFileSync(groupPath, 'utf8'));
      console.log(`\nSection group '${group}' type: ${json.type}`);
      if (json.sections) {
        Object.entries(json.sections).forEach(([key, sec]) => {
          const exists = fs.existsSync(path.join(sectionsDir, sec.type + '.liquid'));
          console.log(`  - ${key} (type: ${sec.type}) exists: ${exists}`);
        });
      }
    } catch (e) {
      console.error(`Invalid JSON in ${group}: ${e.message}`);
    }
  } else {
    console.log(`\nSection group '${group}' NOT FOUND!`);
  }
});
