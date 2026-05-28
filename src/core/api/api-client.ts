import axios from "axios";
import { API_BASE_URL, API_TIMEOUT } from "../config/api.config";
import { useAuthStore } from "../store/auth.store";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

{/*  get access token */ }
apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;