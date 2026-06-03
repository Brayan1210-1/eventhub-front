import api from "@/core/api/api-client";
import type { CreateTicketPriceFormData } from "../schema/ticketPriceSchema";

export const ticketService = {
    // Obtener zonas de un lugar específico
    getZonesByPlace: async (placeId: number) => {
        const { data } = await api.get(`/api/v1/zonas/lugar/${placeId}`);
        return data;
    },

    // Crear configuración de precio para una zona
    createTicketPrice: async (priceData: CreateTicketPriceFormData) => {
        const { data } = await api.post(`/api/v1/tickets-precios`, priceData);
        return data;
    }
};