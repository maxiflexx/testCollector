const express = require('express');
const router = express.Router();
const cryptoScheduler = require('./scheduler');

router.get('/start', cryptoScheduler.start);
router.get('/stop', cryptoScheduler.stop);
router.get('/stat', cryptoScheduler.stat)

module.exports = router;