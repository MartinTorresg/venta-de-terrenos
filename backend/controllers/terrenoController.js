const Terreno = require('../models/Terreno');

// Obtener todos los terrenos
exports.getTerrenos = async (req, res) => {
  try {
    const terrenos = await Terreno.find();
    res.json(terrenos);
  } catch (err) {
    console.log('Error al obtener terrenos:', err);
    res.status(500).json({ message: err.message });
  }
};

// Obtener un terreno por ID
exports.getTerrenoById = async (req, res) => {
  const { id } = req.params;
  console.log('Buscando terreno con ID:', id);
  try {
    const terreno = await Terreno.findById(id);
    if (!terreno) {
      console.log('Terreno no encontrado');
      return res.status(404).json({ message: 'Terreno no encontrado' });
    }
    console.log('Terreno encontrado:', terreno);
    res.json(terreno);
  } catch (err) {
    console.log('Error al obtener terreno:', err);
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo terreno
exports.createTerreno = async (req, res) => {
  const { nombre, ubicacion, precio, descripcion, disponibilidad } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const nuevoTerreno = new Terreno({ nombre, ubicacion, precio, descripcion, disponibilidad, imagen });
    await nuevoTerreno.save();
    res.status(201).json(nuevoTerreno);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un terreno existente
exports.updateTerreno = async (req, res) => {
  const { id } = req.params;
  const { nombre, ubicacion, precio, descripcion, disponibilidad } = req.body;
  const imagenes = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  try {
    let terreno = await Terreno.findById(id);
    if (!terreno) {
      console.log('Terreno no encontrado');
      return res.status(404).json({ message: 'Terreno no encontrado' });
    }

    console.log('Datos recibidos:', { nombre, ubicacion, precio, descripcion, disponibilidad, imagenes });

    terreno.nombre = nombre;
    terreno.ubicacion = ubicacion;
    terreno.precio = precio;
    terreno.descripcion = descripcion;
    terreno.disponibilidad = disponibilidad;
    if (imagenes.length > 0) {
      terreno.imagenes = imagenes;
    }

    await terreno.save();
    res.json({ message: 'Terreno actualizado correctamente' });
  } catch (err) {
    console.log('Error al actualizar terreno:', err);
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un terreno existente
exports.deleteTerreno = async (req, res) => {
  const { id } = req.params;

  try {
    let terreno = await Terreno.findById(id);
    if (!terreno) {
      return res.status(404).json({ message: 'Terreno no encontrado' });
    }

    await terreno.remove();
    res.json({ message: 'Terreno eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

