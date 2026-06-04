import api from "@/core/api/api-client";
import type { PurchaseRequest, PurchaseResponse } from "../types/orders.type"; // Ajusta la ruta de tus tipos

export const orderService = {

    // 🌟 Método para US-012 (Requiere Token, el api-client ya lo inyecta)
    createPurchaseOrder: async (eventId: number, zoneId: number, request: PurchaseRequest): Promise<PurchaseResponse> => {

        // CUIDADO: Asegúrate de cambiar el backend a @PostMapping
        const { data } = await api.post<PurchaseResponse>(
            `/ordenes/evento/${eventId}/zona/${zoneId}`,
            request
        );

        return data;
    }
};