import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TerrenoList = () => {
  const [terrenos, setTerrenos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTerrenos = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/terrenos?page=${currentPage}`);
        console.log('Respuesta de la API:', res.data); // Verificar la estructura de la respuesta
        setTerrenos(res.data.terrenos); // Asegúrate de acceder a la propiedad correcta
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Error fetching terrenos:', err);
      }
    };

    fetchTerrenos();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Terrenos en Venta</h1>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700">Propiedades en venta encontradas: {terrenos.length}</p>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-yellow-500' : 'bg-gray-300'} rounded`}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {terrenos.map((terreno) => (
          <div key={terreno._id} className="bg-white rounded-lg shadow-md p-4 flex">
            <img src={terreno.imagenes ? terreno.imagenes[0] : 'https://via.placeholder.com/150'} alt={terreno.nombre} className="w-1/4 rounded-lg mr-4" />
            <div className="flex flex-col justify-between w-3/4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{terreno.nombre}</h2>
                <p className="text-gray-600">{terreno.ubicacion}</p>
                <p className="text-yellow-500 font-bold mt-2">${terreno.precio.toLocaleString('es-CL')}</p>
                <p className="text-gray-600 mt-2">{terreno.descripcion}</p>
                <p className="text-gray-500 mt-2">Código: {terreno._id}</p>
              </div>
              <Link to={`/terrenos/${terreno._id}`} className="text-blue-500 hover:underline self-end mt-4">Ver Detalles</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-yellow-500' : 'bg-gray-300'} rounded`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TerrenoList;
