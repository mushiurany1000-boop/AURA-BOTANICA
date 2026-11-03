const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const zipPath = 'C:/Users/Mushiur Rahman Any/.gemini/antigravity/brain/57665344-da44-4768-a19e-c303725227c7/.user_uploaded/media_1793680500291_92aee2e1.zip';

// Extract config from original zip to a temp folder
const tempDir = path.join(__dirname, 'temp_config');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

execSync(`tar.exe -xf "${zipPath}" -C "${tempDir}" config`, { stdio: 'inherit' });

console.log('Extracted config successfully.');
const files = fs.readdirSync(path.join(tempDir, 'config'));
console.log('Config files:', files);

const origSchema = fs.readFileSync(path.join(tempDir, 'config', 'settings_schema.json'), 'utf8');
const origData = fs.readFileSync(path.join(tempDir, 'config', 'settings_data.json'), 'utf8');

console.log('Original schema length:', origSchema.length);
console.log('Original data length:', origData.length);

const parsedSchema = JSON.parse(origSchema);
const parsedData = JSON.parse(origData);

console.log('Schema sections count:', parsedSchema.length);
console.log('Schema section names:', parsedSchema.map(s => s.name));

// Check if color_schemes exist in schema or data
const schemaHasColorSchemes = origSchema.includes('color_schemes') || origSchema.includes('color_scheme');
console.log('Schema mentions color_scheme:', schemaHasColorSchemes);

const dataHasColorSchemes = origData.includes('color_schemes') || origData.includes('color_scheme');
console.log('Data mentions color_scheme:', dataHasColorSchemes);

// Check if parsedData has color_schemes
console.log('Data current top keys:', Object.keys(parsedData.current || {}));
if (parsedData.current && parsedData.current.color_schemes) {
  console.log('Found color_schemes in parsedData.current:', Object.keys(parsedData.current.color_schemes));
}

