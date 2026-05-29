import api from '@/core/api/api-client';

export const logoutUser = async (): Promise<void> => {

    await api.post('/autenticacion/logout');
};