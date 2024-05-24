// src/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api', // Ajusta esta URL a la de tu API
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
