import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import Login from '../components/admin/Login';
import Dashboard from '../components/admin/Dashboard';
import TerrenoForm from '../components/admin/TerrenoForm';

const AdminRouting = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="terrenos/new" element={<TerrenoForm />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
};

export default AdminRouting;
