const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');

router.post('/:currency/start',  apiController.start);
router.post('/:currency/stop', apiController.stop);
router.post('/:currency/stat', apiController.stat);

module.exports = router;