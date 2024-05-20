const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth');

router.post('/', contactController.sendMessage);
router.get('/', auth, contactController.getMessages); // Ruta para obtener mensajes, asegurada por autenticación
router.delete('/:id', auth, contactController.deleteMessage); // Ruta para eliminar mensajes, asegurada por autenticación

module.exports = router;
