export type PaymentMethod = 'EFECTIVO' | 'TARJETA';

export interface PhysicalSaleRequestDTO {
    quantity: number;
    buyerName: string;
    buyerLastName: string;
    buyerDocument: string;
    buyerEmail: string;
    buyerPhone: string;
    paymentMethod: PaymentMethod;
}

export interface OrderResponseDTO {
    orderId: string;
    status: string;
    totalAmount: number;
    // Omitimos expirationTime porque para taquilla no nos importa
}