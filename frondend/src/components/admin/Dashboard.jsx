import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [terrenos, setTerrenos] = useState([]);

  useEffect(() => {
    const fetchTerrenos = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/terrenos', {
          headers: { 'x-auth-token': token }
        });
        setTerrenos(res.data);
      } catch (err) {
        console.error('Error fetching terrenos:', err);
      }
    };

    fetchTerrenos();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {terrenos.map((terreno) => (
          <li key={terreno._id}>{terreno.nombre} - {terreno.ubicacion}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
