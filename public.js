const express = require('express');
const router = express.Router();

// Import route functions
const Routes = require('./routes.js');

// Songs
router.get('/songs', Routes.getFile);
router.post('/songs', Routes.addFile);
router.post('/zips', Routes.addFile);

// necessary with express.Router()
module.exports = router;
