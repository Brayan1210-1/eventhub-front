import { type PaginationMeta } from "@/utils/types/paginationMeta";
export interface Location {
    id: number;
    name: string;
    address: string;
    city: string;
    totalCapacity: number;
    description: string;
    imageUrl: string;
    active: boolean;
}

export interface LocationList {
    id: number,
    name: string,
    city: string,
    totalCapacityZones: number,
    totalZones: number
}

export interface PaginatedLocationList {
    content: LocationList[],
    meta: PaginationMeta
}

export interface PaginatedLocations {
    content: Location[];
    meta: PaginationMeta;
}


export interface CreateLocationDTO {
    name: string;
    address: string;
    city: string;
    totalCapacity: Number;
    description: string;
    imageUrl: string;
}

export interface UpdateLocationDTO {
    name: string;
    address: string;
    city: string;
    totalCapacity: number;
    description: string;
    imageUrl: string;
}