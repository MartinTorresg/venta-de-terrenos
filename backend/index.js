
require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Verificar que la variable esté cargada

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const os = require('os');

const app = express();
const port = process.env.PORT || 3000;

// Verificar que la URI de MongoDB esté cargada
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://mtorresg:Timmy123asd@terrenos-isabel.s01umto.mongodb.net/terrenos_mama?retryWrites=true&w=majority&appName=Terrenos-Isabel';

console.log('MONGODB_URI:', mongoUri);
console.log('PORT:', port);

// Middleware
app.use(cors());
app.use(express.json());

// Sirve archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexión a la base de datos
mongoose.connect(mongoUri)
    .then(() => {
        console.log('Conectado a la base de datos');
    }).catch((error) => {
        console.error('Error conectándose a la base de datos', error);
    });

// Rutas
const terrenosRouter = require('./routes/terrenos');
const authRouter = require('./routes/auth');
const contactRouter = require('./routes/contact');

app.use('/api/terrenos', terrenosRouter);
app.use('/api/auth', authRouter);
app.use('/api/contact', contactRouter);

// Ruta básica
app.get('/', (req, res) => {
    res.send('Servidor Express funcionando!');
});

// Obtener y mostrar la IP del servidor
const getServerIp = () => {
    const interfaces = os.networkInterfaces();
    for (let iface of Object.values(interfaces)) {
        for (let config of iface) {
            if (config.family === 'IPv4' && !config.internal) {
                return config.address;
            }
        }
    }
    return 'IP no encontrada';
};

// Iniciar el servidor y escuchar en todas las interfaces
app.listen(port, '0.0.0.0', () => {
    const serverIp = getServerIp();
    console.log(`Servidor escuchando en el puerto ${port}`);
    console.log(`Dirección IP del servidor: ${serverIp}`);
});

