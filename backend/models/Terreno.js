// backend/models/Terreno.js
const mongoose = require('mongoose');

const terrenoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  tamano: { // Cambiado a "tamano"
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  disponibilidad: {
    type: Boolean,
    required: true
  },
  imagenes: {
    type: [String], // Array de strings para las rutas de las imágenes
    required: false
  }
});

const Terreno = mongoose.model('Terreno', terrenoSchema, "terrenos");

module.exports = Terreno;
