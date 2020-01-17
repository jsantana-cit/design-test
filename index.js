const fs = require('fs');
const path = require('path');
const colors = require('colors');
const { configDirectories, getDirectory, eachDirectory } = require('./func.js');

console.log('Relatório de teste:\n');
configDirectories();
eachDirectory(getDirectory.directoryPathCurrent, '');
