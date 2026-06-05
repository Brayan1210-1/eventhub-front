import { useQuery } from "@tanstack/react-query";
import { orderService } from "../service/order.service";
import type { OrderFilter } from "../types/orders.type";

export const usePendingOrders = () => {
    return useQuery({
        queryKey: ['pendingOrders'],
        queryFn: () => orderService.getPendingOrders(),
    });
};

export const useMyOrders = (filter: OrderFilter, page: number) => {
    return useQuery({
        queryKey: ['myOrders', filter, page],
        queryFn: () => orderService.getMyOrders(filter, page, 10),
    });
};

export const useOrderDetail = (orderId: string | undefined) => {
    return useQuery({
        queryKey: ['orderDetail', orderId],
        queryFn: () => orderService.getOrderDetail(orderId!),
        enabled: !!orderId,
    });
};