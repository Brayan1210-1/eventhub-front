import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/core/store/auth.store';

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles = [] }: ProtectedRouteProps) => {
    const { isAuthenticated, roles } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0) {
        const hasRequiredRole = roles.some((role) => allowedRoles.includes(role));

        if (!hasRequiredRole) {
            return <Navigate to="/eventos" replace />;
        }
    }

    return <Outlet />;
};