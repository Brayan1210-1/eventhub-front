import api from "@/core/api/api-client";
import type { CreateTicketPriceFormData } from "../schema/ticketPriceSchema";
import type { TicketPrice } from "../types/ticketPrice";

export const ticketService = {

    createPrice: async (eventId: number, zoneId: number, data: CreateTicketPriceFormData) => {
        return await api.post(`/precios/evento/${eventId}/zona/${zoneId}/crear`, data);
    },

    getPricesByEvent: async (eventId: number): Promise<TicketPrice[]> => {
        const { data } = await api.get(`/precios/evento/${eventId}/precios`);
        return data;
    }
};