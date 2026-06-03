import { type PaginationMeta } from "@/utils/types/paginationMeta";


export type EventCategory = 'CONCIERTO' | 'CONFERENCIA' | 'TEATRO' | 'DEPORTIVO' | 'OTRO';

export type EventStatus = 'BORRADOR' | 'PUBLICADO' | 'FINALIZADO' | 'CANCELADO';

export interface Event {
    id: number;
    name: string;
    description: string;
    eventDate: string;
    startTime: string;
    openingTime: string;
    category: EventCategory;
    imageUrl: string;
    status: EventStatus;
    placeName: string;
    placeId: number;
    placeActive: boolean;
}

export interface PaginatedEvents {
    content: Event[];
    meta: PaginationMeta;
}