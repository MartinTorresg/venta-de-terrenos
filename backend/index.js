// backend/index.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS
}).then(() => {
  console.log('Conectado a la base de datos');
}).catch((error) => {
  console.error('Error conectándose a la base de datos', error);
});

// Rutas
const terrenosRouter = require('./routes/terrenos');
app.use('/api/terrenos', terrenosRouter);

// Ruta básica
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando!');
});

// Iniciar el servidor a
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});