export interface PurchaseRequest {
    quantity: number;
}

export interface PurchaseResponse {
    orderId: number;
    status: string;
    message?: string;
    expiresAt?: string;
}


export type PaymentMethod = 'EFECTIVO' | 'TARJETA' | 'PSE';
export type OrderFilter = 'UPCOMING' | 'PAST' | 'ALL';
export type TicketStatus = 'ACTIVA' | 'USADA' | 'CANCELADA' | 'RESERVADO';
export type OrderStatus = 'PENDIENTE' | 'PAGADA' | 'CANCELADA' | 'REEMBOLSADA';

export interface ConfirmPayRequest {
    paymentMethod: PaymentMethod;
    paymentReference: string;
}

export interface OrderResponse {
    orderId: string;
    status: string;
    totalAmount: number;
    expirationTime: string;
}


export interface MyOrderDTO {
    orderId: string;
    eventName: string;
    eventDate: string;
    orderStatus: OrderStatus;
}


export interface MyTicketDTO {
    ticketId: number;
    zoneName: string;
    code: string;
    status: TicketStatus;
}

export interface MyOrderDetailDTO {
    orderId: string;
    eventName: string;
    eventDate: string;
    orderStatus: OrderStatus;
    totalAmount: number;
    ticketQuantity: number;
    zoneName: string;
    tickets: MyTicketDTO[];
}