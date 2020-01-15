const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const dirApproved = '../img_approved';
const dirCurrent = '../img_current';
const dirReproved = '../img_reproved';

const configDirectories = () => {
  if (!fs.existsSync(dirApproved)) fs.mkdirSync(dirApproved);
  if (!fs.existsSync(dirCurrent)) fs.mkdirSync(dirCurrent);
  if (!fs.existsSync(dirReproved)) fs.mkdirSync(dirReproved);
}

const getDirectory = {
  directoryPathApproved: path.join(__dirname, dirApproved),
  directoryPathCurrent: path.join(__dirname, dirCurrent),
  directoryPathReproved: path.join(__dirname, dirReproved),
}

const getSubDirectories = (path) => {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}

const verifyDiff = (pngFiles, dir) => {
  pngFiles.forEach(function (file) {
    const imgCurrent = PNG.sync.read(
      fs.readFileSync(path.join(dir, file)));
    const imgApproved = PNG.sync.read(
      fs.readFileSync(path.join(dir, file)));
    const {width, height} = imgCurrent;
    const diff = new PNG({width, height});

    let qtdDiff = pixelmatch(imgCurrent.data, imgApproved.data, diff.data, width, height, {threshold:0});
    if(qtdDiff > 0) {
      console.log('NOK'.red, ' - '.red, file.red);
      fs.writeFileSync(path.join(getDirectory.directoryPathApproved, 'diff-' + file), PNG.sync.write(diff));
    } else {
      console.log(' OK'.blue, ' - ', file);
    }
  });
}

const eachDirectory = (pathForEach) => {
  getSubDirectories(pathForEach).forEach(function(dir) {
    fs.readdir(path.join(pathForEach, dir), function (err, files) {
      let pngFiles = files.filter(el => /\.png$/.test(el));
      let directories = files.filter(el => /^[^.]+$/.test(el));

      if(pngFiles.length > 0) {
        let splitCaminho = path.join(pathForEach, dir).split('/');
        console.log(
          splitCaminho[splitCaminho.length-2] + '/' +
          splitCaminho[splitCaminho.length-1] + ':'
        );

        verifyDiff(pngFiles, path.join(pathForEach, dir));

        console.log('\n\n');
      }

      for (var prop in directories) {
        let kk = path.join(pathForEach, dir, directories[prop]);
        eachDirectory(kk);
      }
    });
  });
}

exports.configDirectories = configDirectories;
exports.getDirectory = getDirectory;
exports.getSubDirectories = getSubDirectories;
exports.verifyDiff = verifyDiff;
exports.eachDirectory = eachDirectory;
