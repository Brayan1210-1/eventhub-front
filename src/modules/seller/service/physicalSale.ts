import api from '@/core/api/api-client';
import type { PhysicalSaleRequestDTO, OrderResponseDTO } from '../types/pyshicalSeller.types';

export const createPhysicalSale = async (
    eventId: number,
    zoneId: number,
    data: PhysicalSaleRequestDTO
): Promise<OrderResponseDTO> => {
    const response = await api.post<OrderResponseDTO>(
        `/ordenes/evento/${eventId}/zona/${zoneId}/venta-fisica`,
        data
    );
    return response.data;
};