// src/router/Routing.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import TerrenoList from '../pages/TerrenoList';
import TerrenoDetail from '../pages/TerrenoDetail';
import Contact from '../pages/Contact';
import PublicLayout from '../components/layout/publico/PublicLayout';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="terrenos" element={<TerrenoList />} />
          <Route path="terreno/:id" element={<TerrenoDetail />} />
          <Route path="contacto" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
