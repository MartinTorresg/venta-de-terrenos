// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'animate.css';


// Encuentra el elemento raíz en el DOM
const container = document.getElementById('root');

// Crea una raíz usando createRoot y renderiza la aplicación
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
