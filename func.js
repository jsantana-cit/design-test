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

const getSubDirectories = (folder, pathAddress) => {
  let address = path.join(folder, pathAddress);
  return fs.readdirSync(address).filter(function (file) {
    return fs.statSync(address + '/' + file).isDirectory();
  });
}

const verifyDiff = (pngFiles, folder, pathAddress, dir) => {
  pngFiles.forEach(function (file) {
    const imgCurrent = PNG.sync.read(fs.readFileSync(path.join(folder, pathAddress, dir, file)));
    const imgApproved = PNG.sync.read(fs.readFileSync(path.join(getDirectory.directoryPathApproved, pathAddress, dir, file)));
    const {width, height} = imgCurrent;
    const diff = new PNG({width, height});

    let qtdDiff = pixelmatch(imgCurrent.data, imgApproved.data, diff.data, width, height, {threshold:0});
    if(qtdDiff > 0) {
      console.log('NOK'.red, ' - '.red, file.red);
      fs.writeFileSync(path.join(getDirectory.directoryPathReproved, 'diff-' + file), PNG.sync.write(diff));
    } else {
      console.log(' OK'.blue, ' - ', file);
    }
  });
}

const eachDirectory = (folder, pathAddress) => {
  getSubDirectories(folder, pathAddress).forEach(function(dir) {
    const address = path.join(folder, pathAddress, dir);
    fs.readdir(address, function (err, files) {
      const pngFiles = files.filter(el => /\.png$/.test(el));
      const directories = files.filter(el => /^[^.]+$/.test(el));

      if(pngFiles.length > 0) {
        console.log(pathAddress.concat(dir, ':').trim());

        verifyDiff(pngFiles, folder, pathAddress, dir);

        console.log('\n\n');
      }

      for (var prop in directories) {
        eachDirectory(folder, path.join(pathAddress, dir, directories[prop]));
      }
    });
  });
}

exports.configDirectories = configDirectories;
exports.getDirectory = getDirectory;
exports.getSubDirectories = getSubDirectories;
exports.verifyDiff = verifyDiff;
exports.eachDirectory = eachDirectory;
