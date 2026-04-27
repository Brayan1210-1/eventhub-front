import api from '@/core/api/api-client';
import type { RegisterType } from '../schemas/register.schema';

export const registerUser = async (userData: RegisterType): Promise<string> => {

    const { data } = await api.post<string>('/autenticacion/registro', userData);
    return data;
};