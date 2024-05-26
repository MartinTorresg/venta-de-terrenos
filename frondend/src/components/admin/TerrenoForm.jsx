import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TerrenoForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    latitud: '',
    longitud: '',
    precio: '',
    tamano: '', // Cambiado a "tamano"
    descripcion: '',
    disponibilidad: false,
    imagenes: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      imagenes: e.target.files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'imagenes') {
        Array.from(formData.imagenes).forEach((file) => {
          data.append('imagenes', file);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    console.log('Datos del formulario:', formData);
    console.log('Datos de FormData:', data);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://ec2-18-119-10-107.us-east-2.compute.amazonaws.com:3000/api/terrenos', data, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Error creating terreno:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-700 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Nuevo Terreno</h1>
        <div className="mb-4">
          <label className="block text-gray-300">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Ubicación</label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Latitud</label>
          <input
            type="number"
            name="latitud"
            value={formData.latitud}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Longitud</label>
          <input
            type="number"
            name="longitud"
            value={formData.longitud}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Precio</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Tamaño (m²)</label>
          <input
            type="number"
            name="tamano"
            value={formData.tamano}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Disponibilidad</label>
          <input
            type="checkbox"
            name="disponibilidad"
            checked={formData.disponibilidad}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-yellow-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Imágenes</label>
          <input
            type="file"
            name="imagenes"
            onChange={handleImageChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            multiple
          />
        </div>
        <button type="submit" className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          Crear Terreno
        </button>
      </form>
    </div>
  );
};

export default TerrenoForm;
