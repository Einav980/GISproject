const express = require('express');
const router = express.Router();
const stationController = require('../controllers/station.controller');

router.get('/stations', stationController.listStations);

module.exports = router;
