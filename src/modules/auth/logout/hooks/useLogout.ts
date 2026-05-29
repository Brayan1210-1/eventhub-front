import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../service/logout.service';
import { useAuthStore } from '@/core/store/auth.store';

export const useLogout = () => {
    const navigate = useNavigate();

    const clearAuth = useAuthStore((state) => state.clearAuth);

    return useMutation({
        mutationFn: logoutUser,
        onSettled: () => {

            clearAuth();

            navigate('/login', { replace: true });
        },
    });
};