import { AxiosError } from 'axios';
import { type ApiErrorResponse } from '@/core/api/ApiErrorResponse'; // La interfaz que creamos antes

export const getApiErrorMessage = (error: unknown): string => {

    const axiosError = error as AxiosError<ApiErrorResponse>;

    const backendMessage = axiosError.response?.data?.message;

    return backendMessage || 'Ocurrió un error de conexión con el servidor.';
};