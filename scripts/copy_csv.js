import fs from 'fs';
import path from 'path';

const sourceFile = path.join(process.cwd(), 'inventory_export.csv');
const destFile = path.join(process.cwd(), 'public', 'inventory_export.csv');

fs.copyFileSync(sourceFile, destFile);
console.log('✅ CSV Copied to public folder.');
