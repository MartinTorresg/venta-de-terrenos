import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Asegúrate de importar axiosInstance
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaRegIdBadge, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const TerrenoList = () => {
  const [terrenos, setTerrenos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    ordenarPor: 'nombre',
    orden: 'ascendente',
    precioMinimo: '',
    precioMaximo: '',
    tamanoMinimo: '',
    tamanoMaximo: '',
    ubicacion: ''
  });

  useEffect(() => {
    const fetchTerrenos = async () => {
      try {
        const res = await axiosInstance.get(`/terrenos?page=${currentPage}`);
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

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredTerrenos = terrenos.filter((terreno) => {
    const matchesSearch = terreno.nombre.toLowerCase().includes(search.toLowerCase()) ||
      terreno.ubicacion.toLowerCase().includes(search.toLowerCase());

    const matchesPrice = (!filters.precioMinimo || terreno.precio >= filters.precioMinimo) &&
      (!filters.precioMaximo || terreno.precio <= filters.precioMaximo);

    const matchesSize = (!filters.tamanoMinimo || terreno.tamano >= filters.tamanoMinimo) &&
      (!filters.tamanoMaximo || terreno.tamano <= filters.tamanoMaximo);

    const matchesLocation = !filters.ubicacion || terreno.ubicacion.toLowerCase().includes(filters.ubicacion.toLowerCase());

    return matchesSearch && matchesPrice && matchesSize && matchesLocation;
  });

  const sortedTerrenos = filteredTerrenos.sort((a, b) => {
    const fieldA = a[filters.ordenarPor];
    const fieldB = b[filters.ordenarPor];
    if (filters.orden === 'ascendente') {
      return fieldA > fieldB ? 1 : -1;
    }
    return fieldA < fieldB ? 1 : -1;
  });

  return (
    <div className="min-h-screen bg-gray-800 p-8 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Terrenos en Venta</h1>
      <div className="mb-6 relative">
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar terrenos"
          value={search}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
        />
      </div>
      <button onClick={toggleFilters} className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded-lg flex items-center">
        {showFilters ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />} {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
      </button>
      {showFilters && (
        <div className="bg-gray-700 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300">Ordenar por:</label>
            <select name="ordenarPor" value={filters.ordenarPor} onChange={handleFilterChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white">
              <option value="nombre">Nombre</option>
              <option value="precio">Precio</option>
              <option value="tamano">Tamaño</option>
              <option value="ubicacion">Ubicación</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300">Orden:</label>
            <select name="orden" value={filters.orden} onChange={handleFilterChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white">
              <option value="ascendente">Ascendente</option>
              <option value="descendente">Descendente</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300">Precio mínimo:</label>
            <input
              type="number"
              name="precioMinimo"
              value={filters.precioMinimo}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300">Precio máximo:</label>
            <input
              type="number"
              name="precioMaximo"
              value={filters.precioMaximo}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300">Tamaño mínimo (m²):</label>
            <input
              type="number"
              name="tamanoMinimo"
              value={filters.tamanoMinimo}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300">Tamaño máximo (m²):</label>
            <input
              type="number"
              name="tamanoMaximo"
              value={filters.tamanoMaximo}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300">Ubicación:</label>
            <input
              type="text"
              name="ubicacion"
              value={filters.ubicacion}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            />
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-300">Propiedades en venta encontradas: {sortedTerrenos.length}</p>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-600'} rounded transition duration-300`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTerrenos.map((terreno) => (
          <div key={terreno._id} className="bg-gray-700 rounded-lg shadow-md p-4 flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <img
              src={terreno.imagenes && terreno.imagenes.length > 0 ? `http://ec2-18-119-10-107.us-east-2.compute.amazonaws.com/${terreno.imagenes[0]}` : 'https://via.placeholder.com/150'}
              alt={terreno.nombre}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h2 className="text-2xl font-bold">{terreno.nombre}</h2>
                <p className="text-gray-400 flex items-center"><FaMapMarkerAlt className="mr-2" />{terreno.ubicacion}</p>
                <p className="text-yellow-400 font-bold mt-2 flex items-center"><FaDollarSign className="mr-2" />${terreno.precio.toLocaleString('es-CL')}</p>
                <p className="text-gray-400 mt-2">{terreno.descripcion}</p>
                <p className="text-gray-500 mt-2 flex items-center"><FaRegIdBadge className="mr-2" />Código: {terreno._id}</p>
              </div>
              <Link to={`/terreno/${terreno._id}`} className="text-blue-400 hover:underline self-end mt-4 transition duration-300">Ver Detalles</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-600'} rounded transition duration-300`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TerrenoList;
