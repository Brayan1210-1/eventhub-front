import { type PaginationMeta } from "@/utils/types/paginationMeta";

export interface Zone {
    id: number;
    name: string;
    capacity: number;
    description: string;
    place: number;
    createdAt: string;
    updatedAt: string;
}


export interface PaginatedZones {
    content: Zone[];
    meta: PaginationMeta
}
