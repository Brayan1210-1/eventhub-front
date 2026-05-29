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

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {

        const originalRequest = error.config;

        // Si el backend devuelve 401 (Token expirado/inválido) y no hemos reintentado
        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true; // Marcamos para evitar bucles infinitos

            try {

                const refreshResponse = await axios.post(
                    `${API_BASE_URL}/autenticacion/refreshtoken`,
                    {},
                    { withCredentials: true }
                );

                // Sacamos el nuevo token (como cambiaste tu interfaz a accessToken, lo leemos así)
                const newAccessToken = refreshResponse.data.accessToken;

                useAuthStore.getState().setToken(newAccessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                return apiClient(originalRequest);

            } catch (refreshError) {

                useAuthStore.getState().clearAuth();
                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }


        return Promise.reject(error);
    }
);


export default apiClient;