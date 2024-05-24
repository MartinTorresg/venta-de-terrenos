const Terreno = require('../models/Terreno');

// Crear un nuevo terreno
exports.createTerreno = async (req, res) => {
  const { nombre, ubicacion, precio, tamano, descripcion, disponibilidad, latitud, longitud } = req.body;
  const imagenes = req.files.map(file => file.path);

  try {
    const nuevoTerreno = new Terreno({
      nombre,
      ubicacion,
      latitud: parseFloat(latitud),
      longitud: parseFloat(longitud),
      precio,
      tamano,
      descripcion,
      disponibilidad,
      imagenes
    });

    const terrenoGuardado = await nuevoTerreno.save();
    res.json(terrenoGuardado);
  } catch (err) {
    console.error('Error al crear el terreno:', err);
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un terreno existente
exports.updateTerreno = async (req, res) => {
  const { id } = req.params;
  const { nombre, ubicacion, precio, tamano, descripcion, disponibilidad, latitud, longitud } = req.body;
  const imagenes = req.files.map(file => file.path);

  try {
    const terreno = await Terreno.findById(id);
    if (!terreno) {
      return res.status(404).json({ message: 'Terreno no encontrado' });
    }

    terreno.nombre = nombre;
    terreno.ubicacion = ubicacion;
    terreno.latitud = parseFloat(latitud);
    terreno.longitud = parseFloat(longitud);
    terreno.precio = precio;
    terreno.tamano = tamano;
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

// Obtener todos los terrenos con filtrado y ordenación
exports.getTerrenos = async (req, res) => {
  const { page = 1, limit = 10, search = '', sortBy = 'nombre', order = 'asc', minPrice, maxPrice, minSize, maxSize, location } = req.query;

  const query = {
    nombre: { $regex: search, $options: 'i' },
  };

  if (minPrice) query.precio = { ...query.precio, $gte: Number(minPrice) };
  if (maxPrice) query.precio = { ...query.precio, $lte: Number(maxPrice) };
  if (minSize) query.tamaño = { ...query.tamaño, $gte: Number(minSize) };
  if (maxSize) query.tamaño = { ...query.tamaño, $lte: Number(maxSize) };
  if (location) query.ubicacion = { $regex: location, $options: 'i' };

  try {
    const terrenos = await Terreno.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Terreno.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({ terrenos, totalPages });
  } catch (err) {
    console.error('Error al obtener los terrenos:', err);
    res.status(500).json({ message: 'Error al obtener los terrenos' });
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
    console.error('Error al obtener el terreno:', err);
    res.status(500).json({ message: 'Error al obtener el terreno' });
  }
};
