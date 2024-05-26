// backend/controllers/authController.js
require('dotenv').config();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
  const { email, password } = req.body;

  console.log('Intentando registrar un nuevo usuario:', email);

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      console.log('El usuario ya existe:', email);
      return res.status(200).send({
        status: "success",
        message: "El usuario ya existe"
      });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUsuario = new Usuario({ email, password: hashedPassword });

    console.log('Contraseña encriptada para el usuario:', newUsuario.password);

    // Guardar el usuario en la base de datos
    await newUsuario.save();

    const payload = { userId: newUsuario.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Usuario registrado exitosamente:', email);

    res.status(201).json({
      status: "success",
      message: "Usuario registrado correctamente",
      token
    });
  } catch (err) {
    console.error('Error en la función de registro:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('Intentando iniciar sesión con el usuario:', email);

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar"
    });
  }

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      console.log('Usuario no encontrado:', email);
      return res.status(404).json({ status: "error", message: "No existe el usuario" });
    }

    console.log('Contraseña almacenada (encriptada):', usuario.password);
    console.log('Contraseña proporcionada:', password);

    const isMatch = bcrypt.compareSync(password, usuario.password);
    console.log('Resultado de la comparación de contraseñas:', isMatch);

    if (!isMatch) {
      console.log('Contraseña incorrecta para el usuario:', email);
      return res.status(400).json({
        status: "error",
        message: "No te has identificado correctamente"
      });
    }

    const payload = { userId: usuario.id };
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Inicio de sesión exitoso para el usuario:', email);

    res.json({
      status: "success",
      message: "Te has identificado correctamente",
      user: {
        id: usuario._id,
        email: usuario.email
      },
      token
    });
  } catch (err) {
    console.error('Error en la función de inicio de sesión:', err.message);
    res.status(500).json({ message: err.message });
  }
};
