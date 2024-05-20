import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TerrenoList = () => {
  const [terrenos, setTerrenos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredTerrenos = terrenos.filter(terreno =>
    terreno.nombre.toLowerCase().includes(search.toLowerCase()) ||
    terreno.ubicacion.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-800 p-8 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Terrenos en Venta</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar terrenos"
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-300">Propiedades en venta encontradas: {filteredTerrenos.length}</p>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-600'} rounded`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerrenos.map((terreno) => (
          <div key={terreno._id} className="bg-gray-700 rounded-lg shadow-md p-4 flex flex-col">
            <img
              src={terreno.imagenes && terreno.imagenes.length > 0 ? `http://localhost:3000/${terreno.imagenes[0]}` : 'https://via.placeholder.com/150'}
              alt={terreno.nombre}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h2 className="text-2xl font-bold">{terreno.nombre}</h2>
                <p className="text-gray-400">{terreno.ubicacion}</p>
                <p className="text-yellow-400 font-bold mt-2">${terreno.precio.toLocaleString('es-CL')}</p>
                <p className="text-gray-400 mt-2">{terreno.descripcion}</p>
                <p className="text-gray-500 mt-2">Código: {terreno._id}</p>
              </div>
              <Link to={`/terreno/${terreno._id}`} className="text-blue-400 hover:underline self-end mt-4">Ver Detalles</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-600'} rounded`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TerrenoList;
