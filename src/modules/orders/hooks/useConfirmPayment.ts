import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../service/order.service";
import type { ConfirmPayRequest } from "../types/orders.type";

export const useConfirmPayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, request }: { orderId: string, request: ConfirmPayRequest }) =>
            orderService.confirmPayment(orderId, request),
        onSuccess: () => {
            // Refrescamos las consultas relacionadas para que desaparezca el banner de "Pendiente"
            queryClient.invalidateQueries({ queryKey: ['pendingOrders'] });
            queryClient.invalidateQueries({ queryKey: ['myOrders'] });
        }
    });
};

