const express = require('express');
const songController = require('../controller/song.controller');  
const upload = require('../middlewares/uplode.middleware');

const router = express.Router();

router.post('/upload', upload.single('song'), songController.uplodeSong);

router.get('/', songController.getSongs);

module.exports = router;