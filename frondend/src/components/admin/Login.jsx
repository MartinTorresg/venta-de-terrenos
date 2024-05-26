import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('ec2-18-119-10-107.us-east-2.compute.amazonaws.com/api/auth/login', { email, password }); // Cambia esta URL a la IP pública de tu instancia AWS
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-white">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
