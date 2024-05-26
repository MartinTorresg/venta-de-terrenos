import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Map from './Map'; // Asegúrate de que la ruta es correcta

const TerrenoDetail = () => {
  const { id } = useParams();
  const [terreno, setTerreno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTerreno = async () => {
      try {
        const res = await axios.get(`ec2-18-119-10-107.us-east-2.compute.amazonaws.com/api/terrenos/${id}`);
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

  const { nombre, ubicacion, precio, descripcion, imagenes, latitud, longitud } = terreno;

  let lat = latitud, lng = longitud;
  if (ubicacion && (!lat || !lng)) {
    const [latitude, longitude] = ubicacion.split(',').map(coord => parseFloat(coord.trim()));
    if (!isNaN(latitude) && !isNaN(longitude)) {
      lat = latitude;
      lng = longitude;
    } else {
      console.error('Ubicación inválida:', ubicacion);
      return <p>Error: Ubicación inválida</p>;
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-700 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{nombre}</h1>
        <p className="text-gray-400">{ubicacion}</p>
        <p className="text-yellow-500 font-bold mt-2 text-2xl">${precio.toLocaleString('es-CL')}</p>
        <p className="text-gray-400 mt-4">{descripcion}</p>
        <p className="text-gray-500 mt-4">Código: {terreno._id}</p>

        {imagenes && imagenes.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imagenes.map((imagen, index) => (
              <img key={index} src={`ec2-18-119-10-107.us-east-2.compute.amazonaws.com/${imagen}`} alt={nombre} className="w-full h-48 object-cover rounded-lg shadow-md" />
            ))}
          </div>
        )}

        <div className="mt-6">
          <Map lat={lat} lng={lng} />
        </div>

        <Link to="/terrenos" className="text-blue-500 hover:underline mt-4 inline-block">Volver a la lista</Link>
      </div>
    </div>
  );
};

export default TerrenoDetail;
