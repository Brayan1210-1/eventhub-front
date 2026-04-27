import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../service/register.service';
import type { RegisterType } from '../schemas/register.schema';
import { useNavigate } from 'react-router-dom';
import type { error } from '../schemas/error';

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: RegisterType) => registerUser(data),
        onSuccess: (token) => {

            localStorage.setItem('access_token', token);

            navigate('/');
        },
        onError: (error: error) => {
            console.error('Error en el registro:', error.message, error.status, error.timeStamp);
        }
    });
};