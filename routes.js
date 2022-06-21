const Services = require('./services.js');

// TODO: MAKE SURE THIS ALLOWS SONGS TO BE PLAYED
exports.getFile = (async function (req, res) {
  const song = await Services.getFile(req, res, '/songs');
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