import type { PaginationMeta } from "@/utils/types/paginationMeta";
import type { OrderStatus } from "./orders.type";

export interface OrderHistoryResponse {
    orderId: string;
    eventName: string;
    purchaseDate: string;
    buyerName: string;
    quantity: number;
    totalAmount: number;
    status: OrderStatus;
}

export interface PaginatedOrderHistory {
    content: OrderHistoryResponse[];
    meta: PaginationMeta;
}

export interface OrderHistoryParams {
    eventId?: number | null;
    status?: OrderStatus | null;
    purchaseDate?: string | null;
    page?: number;
    size?: number;
}