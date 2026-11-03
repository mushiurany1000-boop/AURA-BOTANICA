const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const zipPath = 'C:/Users/Mushiur Rahman Any/.gemini/antigravity/brain/57665344-da44-4768-a19e-c303725227c7/.user_uploaded/media_1793680500291_92aee2e1.zip';

console.log('Reading Minimog ZIP entries...');
const output = execSync(`tar.exe -tf "${zipPath}"`, { maxBuffer: 20 * 1024 * 1024 }).toString();
const lines = output.split('\n').map(l => l.trim()).filter(Boolean);
console.log('Total entries:', lines.length);

const dirs = new Set();
const dirCounts = {};

lines.forEach(l => {
  const parts = l.split('/');
  const top = parts[0];
  dirs.add(top);
  dirCounts[top] = (dirCounts[top] || 0) + 1;
});

console.log('Top level directories & counts:');
console.log(dirCounts);

// Let's inspect sections, snippets, config in Minimog
const sections = lines.filter(l => l.startsWith('sections/')).map(l => l.replace('sections/', '')).filter(Boolean);
const snippets = lines.filter(l => l.startsWith('snippets/')).map(l => l.replace('snippets/', '')).filter(Boolean);
const templates = lines.filter(l => l.startsWith('templates/')).map(l => l.replace('templates/', '')).filter(Boolean);

console.log(`\nSections count: ${sections.length}`);
console.log(`Snippets count: ${snippets.length}`);
console.log(`Templates count: ${templates.length}`);

// Sample sections
console.log('\nSample sections (first 30):', sections.slice(0, 30));

