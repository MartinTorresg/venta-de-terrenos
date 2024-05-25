// src/pages/Contact.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://3.14.72.222:3000/api/contact', formData); // Reemplaza 'localhost' con la IP pública de tu instancia EC2
      setSuccess('Mensaje enviado con éxito');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Error al enviar el mensaje. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Contacto</h1>
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-300">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Mensaje</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
