var express = require('express');
var PORT = 4000;
var app = express();
var endpoints = require('./src/endpoints.ts');
var cors = require('cors');

import fileupload from "express-fileupload";
import bodyParser from 'body-parser';

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json({ limit: '200mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));

app.use('/', endpoints);

app.listen(PORT, function(err: any){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});