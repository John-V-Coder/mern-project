import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

API.interceptoprs.request.use((cfg) => {
    const token = localStorage.getItem('token');
    if (token) cfg.headerss.Authorization = `Bearer ${token}`;
    return cfg;
});

export default API;