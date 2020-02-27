const express = require('express');
const router = express.Router();
const cryptoCrawler = require('../crawler/crawlerData');

router.get('/get', cryptoCrawler.getData);

module.exports = router;