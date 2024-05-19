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
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const terrenosRouter = require('./routes/terrenos');
const authMiddleware = require('./middleware/auth');
app.use('/api/terrenos', authMiddleware, terrenosRouter);

// Ruta básica
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
