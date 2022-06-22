const Services = require('./services.js');
const fs = require('fs');
const rootDir = '/public-ext4/main';
const Logger = require('./utils/Logger.js');

exports.getFile = (async function (req, res) {
  const { dir, fileName } = req.params;

  if (!dir || !fileName) {
    Logger.logError('getFile()', `Improper request: ${req.originalUrl}`);
    res.status(409).send("Directory and filename required");
  }

  const filePath = `${rootDir}/${dir}/${fileName}`;
  const isFileReadable = await Services.hasAccess(filePath, fs.constants.R_OK);

  if (!isFileReadable) {
    Logger.logError('getFile()', `File not found: ${req.originalUrl}`);
    res.status(409).send("File not found");
    return false;
  }

  res.download(filePath, function (err) {
    if (err) {
        Logger.logError('getFile()', err);
        return false;
    } else {
        Logger.logSuccess('getFile()', 'Sent ' + filePath);
        return true;
    }
  });
});

exports.addFile = (async function (req, res) {

  if (!req) {
    res.status(400).send("Files not found in request");
  }
  const file = req.files.file;
  const directory = req.originalUrl;
  const result = await Services.addFile(file, directory);

  if (result) {
    res.status(200).send("File uploaded");
  } else {
    res.status(409).send("Failed to upload file");
  }
});