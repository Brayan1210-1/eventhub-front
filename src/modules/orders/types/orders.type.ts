export interface PurchaseRequest {
    quantity: number; // Max 4
}

export interface PurchaseResponse {
    orderId: number;
    status: string;
    message?: string;
    expiresAt?: string; // (Opcional) Si el back te devuelve a qué hora caducan los 10 mins
}