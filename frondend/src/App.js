import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/publico/PublicLayout';
import Home from './pages/Home';
import TerrenoList from './pages/TerrenoList';
import TerrenoDetail from './pages/TerrenoDetail';
import Contact from './pages/Contact';
import AdminLayout from './components/admin/AdminLayout';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import TerrenoForm from './components/admin/TerrenoForm';
import ProtectedRoute from './components/admin/ProtectedRoute';
import MensajesAdmin from './components/admin/MensajesAdmin';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="terrenos" element={<TerrenoList />} />
          <Route path="terreno/:id" element={<TerrenoDetail />} />
          <Route path="contacto" element={<Contact />} />
        </Route>

        {/* Rutas de administrador */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="terrenos/new" element={<TerrenoForm />} />
          <Route path="terrenos/edit/:id" element={<TerrenoForm />} />
          <Route path="mensajes" element={<MensajesAdmin />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
