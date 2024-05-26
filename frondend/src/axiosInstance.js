import axios from 'axios';

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: 'http://ec2-18-119-10-107.us-east-2.compute.amazonaws.com:3000/api',
=======
  baseURL: 'ec2-18-119-10-107.us-east-2.compute.amazonaws.com/api',
>>>>>>> d9473d6001a8f01af69262db098f6dd4b470ad45
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
