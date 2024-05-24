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
  latitud: {
    type: Number,
    required: false
  },
  longitud: {
    type: Number,
    required: false
  },
  precio: {
    type: Number,
    required: true
  },
  tamano: {
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
    type: [String],
    required: false
  }
});

const Terreno = mongoose.model('Terreno', terrenoSchema, "terrenos");

module.exports = Terreno;
