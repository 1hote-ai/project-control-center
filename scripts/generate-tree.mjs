import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateTree(dir, level, maxLevel, prefix = '') {
  if (level > maxLevel) return '';
  
  let output = '';
  const files = fs.readdirSync(dir).filter(f => !f.startsWith('.') && f !== 'node_modules' && f !== 'reports');
  
  files.forEach((file, index) => {
    const isLast = index === files.length - 1;
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    const isDirectory = stats.isDirectory();
    
    output += `${prefix}${isLast ? '└── ' : '├── '}${file}\n`;
    
    if (isDirectory) {
      output += generateTree(filePath, level + 1, maxLevel, prefix + (isLast ? '    ' : '│   '));
    }
  });
  
  return output;
}

const rootDir = path.resolve(__dirname, '..');
const treeOutput = `project-control-center\n${generateTree(rootDir, 1, 4)}`;
fs.writeFileSync(path.join(rootDir, 'structure.txt'), treeOutput);
console.log('structure.txt generated successfully.');
