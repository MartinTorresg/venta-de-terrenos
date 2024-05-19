// src/components/layout/publico/Nav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul className="flex space-x-6 text-white">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-yellow-500' : 'hover:text-yellow-500')}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/terrenos"
            className={({ isActive }) => (isActive ? 'text-yellow-500' : 'hover:text-yellow-500')}
          >
            Terrenos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contacto"
            className={({ isActive }) => (isActive ? 'text-yellow-500' : 'hover:text-yellow-500')}
          >
            Contacto
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
