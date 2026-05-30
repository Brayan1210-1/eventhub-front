import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';


interface CustomJwtPayload {
    id: string;
    email: string;
    roles: string[];
    exp: number;
}

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    roles: string[];
    isInitializing: boolean;
    setToken: (token: string) => void;
    clearAuth: () => void;
    finishInitializer: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    isAuthenticated: false,
    roles: [],
    isInitializing: true,
    setToken: (token) => {
        try {

            const decoded = jwtDecode<CustomJwtPayload>(token);

            set({
                accessToken: token,
                isAuthenticated: true,
                roles: decoded.roles || []
            });
        } catch (error) {
            console.error('Error decodificando el token');
            get().clearAuth();
        }
    },

    clearAuth: () => set({ accessToken: null, isAuthenticated: false, roles: [] }),
    finishInitializer: () => set({ isInitializing: false }),
}));