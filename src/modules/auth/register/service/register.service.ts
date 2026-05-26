import api from '@/core/api/api-client';
import type { RegisterType } from '../schemas/register.schema';

interface RegisterResponse {
    accessToken: string;
}


export const registerUser = async (userData: RegisterType): Promise<RegisterResponse> => {

    const { data } = await api.post<RegisterResponse>('/autenticacion/registro', userData);
    return data;
};