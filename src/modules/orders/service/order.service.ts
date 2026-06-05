import api from "@/core/api/api-client";
import type { ConfirmPayRequest, MyOrderDetailDTO, MyOrderDTO, OrderFilter, OrderResponse, PurchaseRequest, PurchaseResponse } from "../types/orders.type";
import type { MessageResponse } from "@/utils/message.type";
import type { PaginatedResponseDTO } from "@/utils/types/paginationMeta";

export const orderService = {

    // 🌟 Método para US-012 (Requiere Token, el api-client ya lo inyecta)
    createPurchaseOrder: async (eventId: number, zoneId: number, request: PurchaseRequest): Promise<PurchaseResponse> => {

        // CUIDADO: Asegúrate de cambiar el backend a @PostMapping
        const { data } = await api.post<PurchaseResponse>(
            `/ordenes/evento/${eventId}/zona/${zoneId}`,
            request
        );

        return data;
    },

    confirmPayment: async (orderId: string, request: ConfirmPayRequest): Promise<OrderResponse> => {
        const { data } = await api.post<OrderResponse>(`/ordenes/${orderId}/confirmar-pago`, request);
        return data;
    },

    cancelOrder: async (orderId: string): Promise<MessageResponse> => {
        const { data } = await api.patch<MessageResponse>(`/ordenes/${orderId}/cancelar`);
        return data;
    },

    getMyOrders: async (filter: OrderFilter = 'UPCOMING', page: number = 0, size: number = 10): Promise<PaginatedResponseDTO<MyOrderDTO>> => {
        const { data } = await api.get<PaginatedResponseDTO<MyOrderDTO>>(`/ordenes/mis-boletas`, {
            params: { filter, page, size }
        });
        return data;
    },
    getPendingOrders: async (): Promise<MyOrderDTO[]> => {
        const { data } = await api.get<MyOrderDTO[]>(`/ordenes/pendientes`);
        return data;
    },

    getOrderDetail: async (orderId: string): Promise<MyOrderDetailDTO> => {
        const { data } = await api.get<MyOrderDetailDTO>(`/ordenes/detalle/${orderId}`);
        return data;
    }
};