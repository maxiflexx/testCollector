const express = require('express');
const router = express.Router();
const cryptoScheduler = require('./scheduler');

router.get('/:currency/start', cryptoScheduler.start);
router.get('/:currency/stop', cryptoScheduler.stop);
router.get('/:currency/stat', cryptoScheduler.stat)

module.exports = router;