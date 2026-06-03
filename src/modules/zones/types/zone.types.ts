import { type PaginationMeta } from "@/utils/types/paginationMeta";

// Esta es la respuesta que te da el backend cuando creas o consultas una zona
export interface Zone {
    id: number;
    name: string;
    capacity: number;
    description: string;
    place: number;
    createdAt: string;
    updatedAt: string;
}

// Este es el formato de la paginación que devuelve tu GET
export interface PaginatedZones {
    content: Zone[];
    meta: PaginationMeta
}