import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../service/register.service';
import type { RegisterType } from '../schemas/register.schema';
import { useAuthStore } from '@/core/store/auth.store';
import { useNavigate } from 'react-router-dom';
import type { error } from '../schemas/error';

export const useRegister = () => {
    const navigate = useNavigate();

    const setToken = useAuthStore((state) => state.setToken);

    return useMutation({
        mutationFn: (data: RegisterType) => registerUser(data),
        onSuccess: (response) => {

            setToken(response.access_token);

            navigate('/', { replace: true });
        },
        onError: (error: error) => {
            console.error('Error en el registro:', error.message, error.status);
        }
    });
};