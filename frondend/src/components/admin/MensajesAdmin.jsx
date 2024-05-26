import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';  // Importar el idioma español

moment.locale('es');  // Configurar moment a español

const MensajesAdmin = () => {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('ec2-18-119-10-107.us-east-2.compute.amazonaws.com/api/contact', {
          headers: { 'x-auth-token': token },
        });
        // Ordenar mensajes por fecha de creación descendente
        const sortedMensajes = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMensajes(sortedMensajes);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching mensajes:', err);
        setError('Error fetching mensajes');
        setLoading(false);
      }
    };

    fetchMensajes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`ec2-18-119-10-107.us-east-2.compute.amazonaws.com/api/contact/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setMensajes(mensajes.filter((mensaje) => mensaje._id !== id));
    } catch (err) {
      console.error('Error deleting mensaje:', err);
      setError('Error deleting mensaje');
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Mensajes de Contacto</h1>
      <ul className="space-y-4">
        {mensajes.map((mensaje) => (
          <li key={mensaje._id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="text-black">
              <h2 className="text-lg font-semibold mb-2">{mensaje.name}</h2>
              <p className="text-gray-800 mb-2">{mensaje.email}</p>
              <p className="text-gray-600 mb-4">{mensaje.message}</p>
              <p className="text-gray-500 mb-2">{moment(mensaje.date).format('LLL')}</p>
            </div>
            <button
              onClick={() => handleDelete(mensaje._id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MensajesAdmin;
