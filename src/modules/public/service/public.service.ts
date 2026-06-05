import api from "@/core/api/api-client";
import type { EventDetailPublic, EventFilters, PaginatedPublicEvents } from "../types/public.types";

export const publicService = {
    getPublicEvents: async (filters: EventFilters, page: number = 0, size: number): Promise<PaginatedPublicEvents> => {
        // Limpiamos el objeto: si un filtro está vacío o es undefined, no lo enviamos en la URL
        const cleanFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== "" && value !== undefined && value !== null)
        );

        // Ajusta la ruta base '/api/v1/eventos/filtrar' según tu controlador exacto
        const { data } = await api.get<PaginatedPublicEvents>('/publico/eventos/filtrar', {
            params: {
                ...cleanFilters,
                page,
                size
            }
        });

        return data;
    },

    getEventDetail: async (eventId: number): Promise<EventDetailPublic> => {
        const { data } = await api.get<EventDetailPublic>(`/publico/eventos/detalle/evento/${eventId}`);
        return data;
    }
};