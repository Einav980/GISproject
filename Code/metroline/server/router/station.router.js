const express = require('express');
const router = express.Router();
const stationController = require('../controllers/station.controller');

router.get('/stations', stationController.listStations);
router.get('/apistations', stationController.listApiStations);

module.exports = router;
