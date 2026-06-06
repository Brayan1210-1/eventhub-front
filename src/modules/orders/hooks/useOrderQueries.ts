import { useQuery } from "@tanstack/react-query";
import { orderService } from "../service/order.service";
import type { OrderFilter } from "../types/orders.type";
import type { OrderHistoryParams } from "../types/ordersReport.type";

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
export const useOrganizerSalesHistory = (params: OrderHistoryParams) => {
    return useQuery({

        queryKey: ['organizer-sales-history', params],
        queryFn: () => orderService.getOrganizerSalesHistory(params),
        placeholderData: (previousData) => previousData,
    });
};