const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { getTerrenos, getTerrenoById, createTerreno, updateTerreno, deleteTerreno } = require('../controllers/terrenoController');
const auth = require('../middleware/auth');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get('/', auth, getTerrenos);
router.get('/:id', auth, getTerrenoById);
router.post('/', auth, upload.array('imagenes', 9), createTerreno);  // Para crear con múltiples imágenes
router.put('/:id', auth, upload.array('imagenes', 9), updateTerreno);  // Para actualizar con múltiples imágenes
router.delete('/:id', auth, deleteTerreno);

module.exports = router;
