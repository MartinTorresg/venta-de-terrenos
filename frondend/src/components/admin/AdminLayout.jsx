// src/components/admin/AdminLayout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaPlus, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'; // Importa iconos de react-icons

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <nav className="bg-gray-900 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/admin/dashboard" className="hover:text-yellow-500 flex items-center">
              <FaTachometerAlt className="mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/terrenos/new" className="hover:text-yellow-500 flex items-center">
              <FaPlus className="mr-2" /> Nuevo Terreno
            </Link>
          </li>
          <li>
            <Link to="/admin/mensajes" className="hover:text-yellow-500 flex items-center">
              <FaEnvelope className="mr-2" /> Gestionar Mensajes
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="hover:text-yellow-500 flex items-center">
              <FaSignOutAlt className="mr-2" /> Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
