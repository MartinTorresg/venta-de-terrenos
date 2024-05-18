const Terreno = require('../models/terreno');

// Obtener todos los terrenos
exports.getTerrenos = async (req, res) => {
  try {
    const terrenos = await Terreno.find();
    res.json(terrenos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo terreno
exports.createTerreno = async (req, res) => {
  const terreno = new Terreno(req.body);
  try {
    const newTerreno = await terreno.save();
    res.status(201).json(newTerreno);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
