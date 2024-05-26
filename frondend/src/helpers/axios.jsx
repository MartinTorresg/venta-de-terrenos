import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://ec2-18-119-10-107.us-east-2.compute.amazonaws.com:3000/api', // Reemplaza '3.14.72.222' con la IP pública de tu instancia EC2
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
