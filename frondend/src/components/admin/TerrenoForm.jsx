import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TerrenoForm = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(true);
  const [imagenes, setImagenes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTerreno = async () => {
      if (id) {
        const token = localStorage.getItem('token');
        try {
          console.log('Obteniendo terreno con ID:', id);
          const res = await axios.get(`http://localhost:3000/api/terrenos/${id}`, {
            headers: { 'x-auth-token': token }
          });
          console.log('Datos del terreno obtenidos:', res.data);
          const { nombre, ubicacion, precio, descripcion, disponibilidad, imagenes } = res.data;
          setNombre(nombre);
          setUbicacion(ubicacion);
          setPrecio(precio);
          setDescripcion(descripcion);
          setDisponibilidad(disponibilidad);
          setImagenes(imagenes || []);
        } catch (err) {
          console.error('Error al obtener el terreno:', err);
          setError('Error al obtener el terreno. Intenta de nuevo más tarde.');
        }
      }
    };

    fetchTerreno();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre || !ubicacion || !precio || !descripcion) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (isNaN(precio) || precio <= 0) {
      setError('El precio debe ser un número válido mayor que cero.');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('ubicacion', ubicacion);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('disponibilidad', disponibilidad);
    for (let i = 0; i < imagenes.length; i++) {
      formData.append('imagenes', imagenes[i]);
    }

    try {
      if (id) {
        console.log('Actualizando terreno con ID:', id);
        await axios.put(`http://localhost:3000/api/terrenos/${id}`, formData, {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        console.log('Creando nuevo terreno');
        await axios.post('http://localhost:3000/api/terrenos', formData, {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Error al guardar el terreno:', err);
      setError('Hubo un problema al guardar el terreno. Intenta de nuevo más tarde.');
    }
  };

  const handleImagenChange = (e) => {
    setImagenes(e.target.files);
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-800 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Editar Terreno' : 'Nuevo Terreno'}</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Ubicación</label>
        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Precio</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Disponibilidad</label>
        <input
          type="checkbox"
          checked={disponibilidad}
          onChange={(e) => setDisponibilidad(e.target.checked)}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Imágenes</label>
        <input
          type="file"
          onChange={handleImagenChange}
          className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
          multiple
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-500"
      >
        {id ? 'Actualizar Terreno' : 'Crear Terreno'}
      </button>
    </form>
  );
};

export default TerrenoForm;
