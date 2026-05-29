import api from '@/core/api/api-client';

export const logoutUser = async (): Promise<void> => {
    // Ajusta la ruta a como la hayas nombrado en tu controlador de Spring Boot
    await api.post('/autenticacion/logout');
};