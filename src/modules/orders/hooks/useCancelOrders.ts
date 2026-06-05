import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../service/order.service";

export const useCancelOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId: string) => orderService.cancelOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pendingOrders'] });
        }
    });
};