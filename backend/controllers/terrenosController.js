// backend/controllers/terrenosController.js
const Terreno = require('../models/Terreno');

// Obtener todos los terrenos
exports.getTerrenos = async (req, res) => {
  try {
    const terrenos = await Terreno.find();
    res.json(terrenos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo terreno
exports.createTerreno = async (req, res) => {
  const { nombre, ubicacion, precio, descripcion } = req.body;

  const nuevoTerreno = new Terreno({
    nombre,
    ubicacion,
    precio,
    descripcion,
  });

  try {
    const terreno = await nuevoTerreno.save();
    res.status(201).json(terreno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un terreno
exports.updateTerreno = async (req, res) => {
  const { id } = req.params;
  const { nombre, ubicacion, precio, descripcion } = req.body;

  try {
    const terreno = await Terreno.findByIdAndUpdate(id, {
      nombre,
      ubicacion,
      precio,
      descripcion,
    }, { new: true });

    if (!terreno) {
      return res.status(404).json({ message: 'Terreno no encontrado' });
    }

    res.json(terreno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un terreno
exports.deleteTerreno = async (req, res) => {
  const { id } = req.params;

  try {
    const terreno = await Terreno.findByIdAndDelete(id);

    if (!terreno) {
      return res.status(404).json({ message: 'Terreno no encontrado' });
    }

    res.json({ message: 'Terreno eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
