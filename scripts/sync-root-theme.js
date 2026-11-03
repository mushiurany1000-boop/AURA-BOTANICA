const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'shopify-theme');
const rootDir = path.join(__dirname, '..');

const folders = ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];

function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  files.forEach(file => {
    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);
    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursive(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  });
}

folders.forEach(folder => {
  const targetFolder = path.join(rootDir, folder);
  if (fs.existsSync(targetFolder)) {
    fs.rmSync(targetFolder, { recursive: true, force: true });
  }
  const sourceFolder = path.join(srcDir, folder);
  if (fs.existsSync(sourceFolder)) {
    copyFolderRecursive(sourceFolder, targetFolder);
    console.log(`Synchronized ${folder} from shopify-theme to root.`);
  }
});

console.log('Root directories synchronized successfully!');

