// src/components/layout/publico/Header.jsx
import React from 'react';
import logo from '../../../assets/Logo.png'; // Asegúrate de que la ruta del logo sea correcta
import Nav from './Nav';

const Header = () => {
  return (
    <header className="bg-dark-blue w-full p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 mr-4" />
        <Nav />
      </div>
    </header>
  );
};

export default Header;
