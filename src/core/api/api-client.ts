import axios from "axios";
import { API_BASE_URL, API_TIMEOUT } from "../config/api.config";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'appication/json',
    },
});

{/*  get access token */ }
apiClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
})

export default apiClient;