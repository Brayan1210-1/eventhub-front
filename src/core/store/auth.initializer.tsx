import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/auth.store";
import api from "../api/api-client";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
    const { setToken, clearAuth, finishInitializer } = useAuthStore();
    const hasCheckedAuth = useRef(false);

    useEffect(() => {
        if (hasCheckedAuth.current) return;
        hasCheckedAuth.current = true;

        const bootstrapAuth = async () => {
            try {
                const response = await api.post("/autenticacion/refreshtoken", {}, { withCredentials: true });
                if (response.data.accessToken) {
                    setToken(response.data.accessToken);
                }
            } catch (error) {
                console.log("No hay cookie de sesión activa.");
                clearAuth();
            } finally {
                finishInitializer();
            }
        };

        bootstrapAuth();
    }, [setToken, clearAuth, finishInitializer]);

    return <>{children}</>;
}