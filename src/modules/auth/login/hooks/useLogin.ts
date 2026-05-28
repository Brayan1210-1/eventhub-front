import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/login.service';
import { useAuthStore } from '@/core/store/auth.store';
import type { LoginType } from '../schemas/login.schema';

export const useLogin = () => {
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);

    return useMutation({
        mutationFn: (credentials: LoginType) => loginUser(credentials),
        onSuccess: (response) => {

            setToken(response.accessToken);

            navigate('/', { replace: true });
        },
    });
};