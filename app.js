var http = require('http');
var express = require('express');
var PORT = 4000;
var app = express();
var public = require('./public.js');
const cors = require('cors');

const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json({ limit: '200mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));

app.use('/', public);

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});