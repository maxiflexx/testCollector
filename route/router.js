const express = require('express');
const router = express.Router();
const cryptoScheduler = require('../crawler/scheduler');

router.get('/get', cryptoScheduler.job);

module.exports = router;