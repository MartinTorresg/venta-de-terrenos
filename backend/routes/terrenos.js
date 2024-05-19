// backend/routes/terrenos.js
const express = require('express');
const router = express.Router();
const terrenosController = require('../controllers/terrenosController');

// Obtener todos los terrenos
router.get('/', terrenosController.getTerrenos);

// Crear un nuevo terreno
router.post('/', terrenosController.createTerreno);

// Actualizar un terreno
router.put('/:id', terrenosController.updateTerreno);

// Eliminar un terreno
router.delete('/:id', terrenosController.deleteTerreno);

module.exports = router;
