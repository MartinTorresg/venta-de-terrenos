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

exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los mensajes' });
  }
};

// Eliminar un mensaje
exports.deleteMessage = async (req, res) => {
    const { id } = req.params;
  
    try {
      console.log('Intentando eliminar el mensaje con ID:', id);
      let message = await Contact.findById(id);
      if (!message) {
        console.log('Mensaje no encontrado:', id);
        return res.status(404).json({ message: 'Mensaje no encontrado' });
      }
  
      await message.deleteOne(); // Usa deleteOne en lugar de remove
      console.log('Mensaje eliminado correctamente:', id);
      res.json({ message: 'Mensaje eliminado correctamente' });
    } catch (err) {
      console.error('Error al eliminar el mensaje:', err.message);
      res.status(500).json({ message: err.message });
    }
  };
  
  