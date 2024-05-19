// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import terrenoImage from '../assets/terreno.jpg'; // Asegúrate de que la ruta sea correcta
import meetingImage from '../assets/meeting.jpg'; // Asegúrate de que la ruta sea correcta

const Home = () => {
  return (
    <div className="bg-gray-800">
      <div className="relative flex items-center justify-center h-screen">
        <div className="absolute top-16 left-10 text-left px-8 max-w-xl">
          <h1 className="text-white text-5xl font-bold mb-4">
            Terrenos ideales para ti
          </h1>
          <p className="text-gray-300 mb-8">
            Encuentra los mejores terrenos para construir la casa de tus sueños. Ofrecemos una amplia selección de terrenos en las mejores ubicaciones.
          </p>
          <div className="bg-white p-4 inline-block rounded-lg shadow-md">
            <Link to="/terrenos" className="text-black py-3 px-8 text-lg font-semibold hover:text-yellow-600 flex items-center">
              <span>Ver todos los terrenos</span>
              <span className="ml-2 text-yellow-500">→</span>
            </Link>
          </div>
        </div>
        <div className="absolute top-16 right-10 max-w-lg">
          <img src={terrenoImage} alt="Terreno" className="rounded-lg shadow-md w-full" />
        </div>
      </div>
      
      <div className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src={meetingImage} alt="Meeting" className="rounded-lg shadow-md w-full" />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Estás en buenas manos</h2>
            <p className="text-gray-600 mb-4">
              Nuestros expertos están aquí para ayudarte a encontrar el terreno perfecto. Con años de experiencia y un enfoque en el cliente, garantizamos que estarás en buenas manos.
            </p>
            <Link to="/contacto" className="inline-block bg-black text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-800">
              Aprende más →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
