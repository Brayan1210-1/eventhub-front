import api from '@/core/api/api-client';
import type { LoginType } from '../schemas/login.schema';

interface LoginResponse {
    accessToken: string;
}

export const loginUser = async (credentials: LoginType): Promise<LoginResponse> => {

    const { data } = await api.post<LoginResponse>('/autenticacion/login', credentials, {
        withCredentials: true
    });
    return data;
};