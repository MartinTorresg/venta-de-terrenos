import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TerrenoDetail = () => {
  const { id } = useParams();
  const [terreno, setTerreno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTerreno = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/terrenos/${id}`);
        setTerreno(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching terreno:', err);
        setError('Error fetching terreno');
        setLoading(false);
      }
    };

    fetchTerreno();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-700 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{terreno.nombre}</h1>
        <p className="text-gray-400">{terreno.ubicacion}</p>
        <p className="text-yellow-500 font-bold mt-2 text-2xl">${terreno.precio.toLocaleString('es-CL')}</p>
        <p className="text-gray-400 mt-4">{terreno.descripcion}</p>
        <p className="text-gray-500 mt-4">Código: {terreno._id}</p>
        
        {terreno.imagenes && terreno.imagenes.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {terreno.imagenes.map((imagen, index) => (
              <img key={index} src={`http://localhost:3000/${imagen}`} alt={terreno.nombre} className="w-full h-48 object-cover rounded-lg shadow-md" />
            ))}
          </div>
        )}

        <Link to="/terrenos" className="text-blue-500 hover:underline mt-4 inline-block">Volver a la lista</Link>
      </div>
    </div>
  );
};

export default TerrenoDetail;
