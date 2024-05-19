// src/components/layout/publico/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const PublicLayout = () => {
  return (
    <div className="bg-gray-800 min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
