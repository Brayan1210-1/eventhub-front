import { useMutation } from '@tanstack/react-query';
import { createPhysicalSale } from '../service/physicalSale';
import type { PhysicalSaleRequestDTO, OrderResponseDTO } from '../types/pyshicalSeller.types';

interface SaleVariables {
    eventId: number;
    zoneId: number;
    data: PhysicalSaleRequestDTO;
}

export const usePhysicalSaleMutation = () => {
    return useMutation<OrderResponseDTO, Error, SaleVariables>({
        mutationFn: ({ eventId, zoneId, data }) => createPhysicalSale(eventId, zoneId, data),
    });
};