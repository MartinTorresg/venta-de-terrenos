require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sirve archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, // Eliminar estos parámetros si estás usando Mongoose 6+
  useUnifiedTopology: true, // Eliminar estos parámetros si estás usando Mongoose 6+
}).then(() => {
  console.log('Conectado a la base de datos');
}).catch((error) => {
  console.error('Error conectándose a la base de datos', error);
});

// Rutas
const terrenosRouter = require('./routes/terrenos');
const authRouter = require('./routes/auth'); // Agrega esta línea
const contactRouter = require('./routes/contact');

app.use('/api/terrenos', terrenosRouter);
app.use('/api/auth', authRouter); // Agrega esta línea
app.use('/api/contact', contactRouter);

// Ruta básica
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
