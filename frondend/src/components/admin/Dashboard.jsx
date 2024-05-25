import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [terrenos, setTerrenos] = useState([]);
  const [summary, setSummary] = useState({ total: 0, precioPromedio: 0 });
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [terrenosPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTerrenos = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://3.14.72.222:3000/api/terrenos', {
          headers: { 'x-auth-token': token }
        });
        console.log('Respuesta de la API:', res.data);
        setTerrenos(res.data.terrenos);

        const total = res.data.terrenos.length;
        const precioTotal = res.data.terrenos.reduce((acc, terreno) => acc + terreno.precio, 0);
        const precioPromedio = total ? precioTotal / total : 0;

        setSummary({ total, precioPromedio });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching terrenos:', err);
        setError('Error al obtener los terrenos. Intenta de nuevo más tarde.');
        setLoading(false);
      }
    };

    fetchTerrenos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/terrenos/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token para eliminación:', token);
      console.log('ID del terreno a eliminar:', id);
      await axios.delete(`http://3.14.72.222:3000/api/terrenos/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setTerrenos(terrenos.filter((terreno) => terreno._id !== id));
      console.log('Terreno eliminado correctamente en el frontend');
    } catch (err) {
      console.error('Error deleting terreno:', err);
      setError('Error al eliminar el terreno. Intenta de nuevo más tarde.');
    }
  };

  const filteredTerrenos = terrenos.filter(terreno =>
    terreno.nombre.toLowerCase().includes(search.toLowerCase()) ||
    terreno.ubicacion.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastTerreno = currentPage * terrenosPerPage;
  const indexOfFirstTerreno = indexOfLastTerreno - terrenosPerPage;
  const currentTerrenos = filteredTerrenos.slice(indexOfFirstTerreno, indexOfLastTerreno);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-6">
          <h2 className="text-2xl">Resumen</h2>
          <p>Total de Terrenos: {summary.total}</p>
          <p>Precio Promedio: ${summary.precioPromedio.toFixed(2)}</p>
        </div>
        <input
          type="text"
          placeholder="Buscar terrenos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 mb-6 text-gray-900 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
        />
        <ul className="space-y-4">
          {currentTerrenos.map((terreno) => (
            <li key={terreno._id} className="p-4 bg-gray-900 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{terreno.nombre}</h2>
              <p className="text-gray-400">{terreno.ubicacion}</p>
              <p className="text-gray-400">${terreno.precio}</p>
              {terreno.imagen && (
                <img src={`http://3.14.72.222:3000${terreno.imagen}`} alt={terreno.nombre} className="w-full rounded-md mt-4" />
              )}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(terreno._id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(terreno._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          {[...Array(Math.ceil(filteredTerrenos.length / terrenosPerPage)).keys()].map(number => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`px-4 py-2 mx-1 ${currentPage === number + 1 ? 'bg-yellow-500' : 'bg-gray-700'} text-white rounded-md`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
