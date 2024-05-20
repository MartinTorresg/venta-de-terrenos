const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getTerrenos, getTerrenoById, createTerreno, updateTerreno, deleteTerreno } = require('../controllers/terrenoController');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Rutas sin autenticación
router.get('/', getTerrenos); // Esta ruta es pública y no necesita autenticación
router.get('/:id', getTerrenoById); // Esta ruta es pública y no necesita autenticación

// Rutas con autenticación
router.post('/', auth, upload.array('imagenes', 9), createTerreno); // Esta ruta necesita autenticación
router.put('/:id', auth, upload.array('imagenes', 9), updateTerreno); // Esta ruta necesita autenticación
router.delete('/:id', auth, deleteTerreno); // Esta ruta necesita autenticación

module.exports = router;
