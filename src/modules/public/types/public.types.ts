import type { EventCategory } from "@/modules/events/types/event.types";
import type { PaginationMeta } from "@/utils/types/paginationMeta";


export interface EventFilters {
    category?: EventCategory | "";
    city?: string;
    startingDate?: string;
    endDate?: string;
}

export interface PublicEvent {
    id: number;
    name: string;
    eventDate: string;
    placeName: string;
    city: string;
    imageUrl: string;
    minPrice: number;
    maxPrice: number;
    category: EventCategory;
}

export interface PaginatedPublicEvents {
    content: PublicEvent[];
    meta: PaginationMeta;
}

export interface ZoneDetail {
    id: number;
    zoneName: string;
    price: number;
    availableQuantity: number;
}

export interface EventDetailPublic {
    id: number;
    name: string;
    description: string;
    eventDate: string; // "YYYY-MM-DD"
    startTime: string; // "HH:mm:ss"
    imageUrl: string;
    placeName: string;
    city: string;
    address: string;
    salesOpen: boolean;
    zones: ZoneDetail[];
}