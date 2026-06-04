import type { PurchaseRequest } from "../types/orders.type";
import { useMutation } from "@tanstack/react-query";
import { orderService } from "../service/order.service";

interface CreateOrderParams {
    eventId: number;
    zoneId: number;
    request: PurchaseRequest;
}

export const useCreateOrder = () => {
    return useMutation({
        mutationFn: ({ eventId, zoneId, request }: CreateOrderParams) =>
            orderService.createPurchaseOrder(eventId, zoneId, request)
    });
};