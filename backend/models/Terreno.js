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
  descripcion: {
    type: String,
    required: true
  },
  disponibilidad: {
    type: Boolean,
    default: true
  }
});

const Terreno = mongoose.model('Terreno', terrenoSchema, 'terrenos');

module.exports = Terreno;
