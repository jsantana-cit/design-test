module.exports = {
  setDirectory: (fs, path) => {
    let dirApproved = '../img_approved';
    let dirCurrent = '../img_current';
    let dirReproved = '../img_reproved';

    if (!fs.existsSync(dirApproved)) fs.mkdirSync(dirApproved);
    if (!fs.existsSync(dirCurrent)) fs.mkdirSync(dirCurrent);
    if (!fs.existsSync(dirReproved)) fs.mkdirSync(dirReproved);

    return {
      directoryPathApproved: path.join(__dirname, dirApproved),
      directoryPathCurrent: path.join(__dirname, dirCurrent),
      directoryPathReproved: path.join(__dirname, dirReproved),
    }
  },
  
  getDirectories: (fs, path) => {
    return fs.readdirSync(path).filter(function (file) {
      return fs.statSync(path + '/' + file).isDirectory();
    });
  }
}
