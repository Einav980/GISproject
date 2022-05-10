const express = require('express');
const router = express.Router();
const lineController = require('../controllers/line.controller');

router.get('/lines', lineController.listLines);

module.exports = router;
