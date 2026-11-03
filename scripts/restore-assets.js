const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function restore() {
  const fileStream = fs.createReadStream('C:/Users/Mushiur Rahman Any/.gemini/antigravity/brain/57665344-da44-4768-a19e-c303725227c7/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let latestCss = null;
  let latestJs = null;
  let lineNum = 0;

  for await (const line of rl) {
    lineNum++;
    if (!line.includes('write_file')) continue;
    try {
      const obj = JSON.parse(line);
      if (obj.tool_calls) {
        for (const tc of obj.tool_calls) {
          if (tc.name === 'write_file' && tc.args && tc.args.Path) {
            if (tc.args.Path.endsWith('theme.css') && tc.args.Content && tc.args.Content.length > 1000) {
              latestCss = tc.args.Content;
              console.log('Found CSS at line', lineNum, 'length:', latestCss.length);
            }
            if (tc.args.Path.endsWith('theme.js') && tc.args.Content && tc.args.Content.length > 1000) {
              latestJs = tc.args.Content;
              console.log('Found JS at line', lineNum, 'length:', latestJs.length);
            }
          }
        }
      }
    } catch(e) {}
  }

  if (latestCss) {
    fs.writeFileSync(path.join(__dirname, '..', 'assets', 'theme.css'), latestCss, 'utf8');
    fs.writeFileSync(path.join(__dirname, '..', 'shopify-theme', 'assets', 'theme.css'), latestCss, 'utf8');
    console.log('Restored theme.css successfully! Length:', latestCss.length);
  } else {
    console.log('Could not find latestCss in transcript.');
  }

  if (latestJs) {
    fs.writeFileSync(path.join(__dirname, '..', 'assets', 'theme.js'), latestJs, 'utf8');
    fs.writeFileSync(path.join(__dirname, '..', 'shopify-theme', 'assets', 'theme.js'), latestJs, 'utf8');
    console.log('Restored theme.js successfully! Length:', latestJs.length);
  } else {
    console.log('Could not find latestJs in transcript.');
  }
}

restore();

