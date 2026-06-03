


// Lo que responde el POST de crear precio
export interface TicketPrice {
    zoneId: number;
    id: number;
    eventName: string;
    zoneName: string;
    organizerEmail: string;
    price: number;
    availableQuantity: number;
    zoneMaxCapacity: number;
}