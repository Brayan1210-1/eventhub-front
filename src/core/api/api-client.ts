import axios from "axios";
import { API_BASE_URL, API_TIMEOUT } from "../config/api.config";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'appication/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default apiClient;