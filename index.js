const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const colors = require('colors');
const FUNC = require('./func.js');

let pngFiles;

const setDirectory = FUNC.setDirectory(fs, path);

const verifyDiff = (pngFiles, dir) => {
  pngFiles.forEach(function (file) {
    const imgCurrent = PNG.sync.read(
      fs.readFileSync(path.join(path.join(setDirectory.directoryPathCurrent, dir), file)));
    const imgApproved = PNG.sync.read(
      fs.readFileSync(path.join(path.join(setDirectory.directoryPathApproved, dir), file)));
    const {width, height} = imgCurrent;
    const diff = new PNG({width, height});

    let qtdDiff = pixelmatch(imgCurrent.data, imgApproved.data, diff.data, width, height, {threshold:0});
    if(qtdDiff > 0) {
      console.log('NOK'.red, ' - '.red, file.red);
      fs.writeFileSync(path.join(setDirectory.directoryPathReproved, 'diff-' + file), PNG.sync.write(diff));
    } else {
      console.log(' OK'.blue, ' - ', file);
    }
  });
}

const directory = FUNC.getDirectories(fs, setDirectory.directoryPathCurrent);

directory.forEach(function(dir) {
  fs.readdir(path.join(setDirectory.directoryPathCurrent, dir), function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    pngFiles = files.filter(el => /\.png$/.test(el));

    if (pngFiles.length === 0) return;

    console.log(dir, ' - Relatórios de teste:');

    verifyDiff(pngFiles, dir);

    console.log('--- FIM ---');
  });
});
