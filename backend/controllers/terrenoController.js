const Terreno = require('../models/Terreno');

// Crear un nuevo terreno
exports.createTerreno = async (req, res) => {
  const { nombre, ubicacion, precio, descripcion, disponibilidad } = req.body;
  const imagenes = req.files.map(file => file.path);

  try {
    const nuevoTerreno = new Terreno({
      nombre,
      ubicacion,
      precio,
      descripcion,
      disponibilidad,
      imagenes
    });

    const terrenoGuardado = await nuevoTerreno.save();
    res.json(terrenoGuardado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un terreno existente
exports.updateTerreno = async (req, res) => {
  const { id } = req.params;
  const { nombre, ubicacion, precio, descripcion, disponibilidad } = req.body;
  const imagenes = req.files.map(file => file.path);

  try {
    const terreno = await Terreno.findById(id);
    if (!terreno) {
      return res.status(404).json({ message: 'Terreno no encontrado' });
    }

    terreno.nombre = nombre;
    terreno.ubicacion = ubicacion;
    terreno.precio = precio;
    terreno.descripcion = descripcion;
    terreno.disponibilidad = disponibilidad;
    terreno.imagenes = imagenes;

    const terrenoActualizado = await terreno.save();
    res.json(terrenoActualizado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const fs = require('fs');
const path = require('path');

// Eliminar un terreno existente
exports.deleteTerreno = async (req, res) => {
  const { id } = req.params;

  try {
    let terreno = await Terreno.findById(id);
    if (!terreno) {
      console.log(`Terreno con id ${id} no encontrado`);
      return res.status(404).json({ message: 'Terreno no encontrado' });
    }

    // Eliminar las imágenes asociadas
    if (terreno.imagenes && terreno.imagenes.length > 0) {
      terreno.imagenes.forEach((imagen) => {
        const filePath = path.join(__dirname, '..', imagen);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error al eliminar el archivo: ${filePath}`, err);
          } else {
            console.log(`Archivo eliminado: ${filePath}`);
          }
        });
      });
    }

    console.log(`Intentando eliminar el terreno con id ${id}`);
    await Terreno.deleteOne({ _id: id });
    res.json({ message: 'Terreno eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar el terreno:', err);
    res.status(500).json({ message: err.message });
  }
};

// Obtener todos los terrenos
exports.getTerrenos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const terrenos = await Terreno.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Terreno.countDocuments();

    res.json({
      terrenos,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un terreno por ID
exports.getTerrenoById = async (req, res) => {
  const { id } = req.params;

  try {
    const terreno = await Terreno.findById(id);
    if (!terreno) {
      return res.status(404).json({ message: 'Terreno no encontrado' });
    }

    res.json(terreno);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
