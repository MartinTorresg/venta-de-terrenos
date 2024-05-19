import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TerrenoForm = () => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const newTerreno = { nombre, ubicacion, precio, descripcion, disponibilidad };
      await axios.post('http://localhost:3000/api/terrenos', newTerreno, {
        headers: { 'x-auth-token': token }
      });
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Error creating terreno:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Nuevo Terreno</h1>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </label>
      <label>
        Ubicación:
        <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required />
      </label>
      <label>
        Precio:
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
      </label>
      <label>
        Descripción:
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
      </label>
      <label>
        Disponibilidad:
        <input type="checkbox" checked={disponibilidad} onChange={(e) => setDisponibilidad(e.target.checked)} />
      </label>
      <button type="submit">Crear Terreno</button>
    </form>
  );
};

export default TerrenoForm;
