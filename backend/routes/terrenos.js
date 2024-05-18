const express = require('express');
const router = express.Router();
const terrenosController = require('../controllers/terrenosController');

router.get('/', terrenosController.getTerrenos);
router.post('/', terrenosController.createTerreno);

module.exports = router;
