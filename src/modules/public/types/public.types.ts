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