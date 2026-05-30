import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/core/store/auth.store';


interface ProtectedRouteProps {
    allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles = [] }: ProtectedRouteProps) => {
    const { isAuthenticated, roles, isInitializing } = useAuthStore();
    const location = useLocation();



    if (isInitializing) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
                <div className="text-gray-500 animate-pulse font-medium">Cargando EventHub...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0) {
        const hasRequiredRole = roles.some((role) => allowedRoles.includes(role));

        if (!hasRequiredRole) {
            return <Navigate to="/eventos" replace />;
        }
    }

    return <Outlet />;
};