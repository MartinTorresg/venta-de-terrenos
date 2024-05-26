// src/components/layout/publico/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-blue w-full p-4 flex flex-col md:flex-row justify-between items-center text-white">
      <div className="mb-4 md:mb-0">
        <p>&copy; 2024 Tu Terreno Ideal. Todos los derechos reservados.</p>
      </div>
      <div className="mb-4 md:mb-0">
        <p>Contacto:</p>
        <p>Martín Torres</p>
        <p>Teléfono: <a href="tel:+56979485378" className="hover:text-yellow-500">+569 7948 5378</a></p>
        <p>Email: <a href="mailto:mtorres.e.g@gmail.com" className="hover:text-yellow-500">mtorres.e.g@gmail.com</a></p>
      </div>
    </footer>
  );
};

export default Footer;
