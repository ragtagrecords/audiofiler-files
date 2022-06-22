const fs = require('fs');
const path = require('path');
const Logger = require('./utils/Logger.js');

// Files that are accessible via API live here
const rootDir = '/public-ext4/main';

async function hasAccess(path, mode) {
  fs.access(
    path,
    mode,
    (err) => {
      if (err) {
        Logger.logError('hasAccess()', err.message);
        return false;
      }  
  });
  return true;
}

function addFile(file, dir) {
  return new Promise(resolve => {
    const dirPath = rootDir + dir + '/';
    const fileName = file.name;
    const fileSizeMB = file.size / 1e6;

    file.mv(`${dirPath}${fileName}`, (err) => {
      if (err) {
        Logger.logError('addFile()', err.message);
        resolve(false);
      } else {
        Logger.logSuccess('addFile()', 'Received ' + fileName + " (" + fileSizeMB + " MB)");
        resolve(true);
      }
    });
  });
}

module.exports = { addFile, hasAccess };
