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
      await axios.post('http://ec2-18-119-10-107.us-east-2.compute.amazonaws.com:3000/api/contact', formData);
      setSuccess('Mensaje enviado con éxito');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setSuccess('');
      }, 3000); // El mensaje desaparece después de 3 segundos
    } catch (err) {
      setError('Error al enviar el mensaje. Inténtalo de nuevo más tarde.');
      setTimeout(() => {
        setError('');
      }, 3000); // El mensaje desaparece después de 3 segundos
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Contacto</h1>
        {success && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-green-500 text-white px-6 py-4 rounded-md shadow-md transform transition-transform duration-500 ease-in-out">
              {success}
            </div>
          </div>
        )}
        {error && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-red-500 text-white px-6 py-4 rounded-md shadow-md transform transition-transform duration-500 ease-in-out">
              {error}
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-300">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength="50" // Limite de caracteres para el nombre
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
              maxLength="50" // Limite de caracteres para el correo electrónico
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
              maxLength="1000" // Limite de caracteres para el mensaje
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
