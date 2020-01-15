const fs = require('fs');
const path = require('path');
const colors = require('colors');
const {
  configDirectories,
  getDirectory,
  getSubDirectories,
  verifyDiff,
  eachDirectory
} = require('./func.js');

configDirectories();

console.log('Relatório de teste:\n');
eachDirectory(getDirectory.directoryPathCurrent);
