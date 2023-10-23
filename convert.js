const fs = require('fs');
const path = require('path');
const html2pug = require('html2pug');

const inputFolder = './src/zoom';
const outputFolder = './src1/zoom';

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdirSync(inputFolder).forEach(file => {
  const inputFile = path.join(inputFolder, file);
  const outputFile = path.join(outputFolder, file.replace('.html', '.pug'));

  const stat = fs.statSync(inputFile);

  if (stat.isFile()) {
    const htmlContent = fs.readFileSync(inputFile, 'utf8');
    const pugContent = html2pug(htmlContent, { tabs: true });
    
    fs.writeFileSync(outputFile, pugContent, 'utf8');
    console.log(`Converted ${inputFile} to ${outputFile}`);
  } else {
    console.log(`${inputFile} is a directory, skipping...`);
  }
});

console.log('Conversion complete!');
