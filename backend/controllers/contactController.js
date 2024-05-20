// backend/controllers/contactController.js
const Contact = require('../models/Contact');

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Mensaje enviado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
};
