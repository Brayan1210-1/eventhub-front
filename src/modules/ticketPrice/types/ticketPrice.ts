import { type PaginationMeta } from "@/utils/types/paginationMeta";

// --- TIPOS (TypeScript) ---

// Lo que responde el GET de zonas por lugar
export interface ZoneDetail {
    id: number;
    name: string;
    capacity: number;
    description: string;
    place: number;
    createdAt: string;
    updatedAt: string;
}

export interface PaginatedZonesDetail {
    content: ZoneDetail[];
    meta: PaginationMeta;
}

// Lo que responde el POST de crear precio
export interface TicketPriceResponse {
    id: number;
    eventId: number;
    eventName: string;
    zoneName: string;
    organizerEmail: string;
    price: number;
    availableQuantity: number;
    zoneMaxCapacity: number;
}