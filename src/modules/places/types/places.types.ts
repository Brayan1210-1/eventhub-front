// 1. La entidad base (Lo que llega en el GET dentro de 'content')
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

// 2. La metadata de Paginación (Tu objeto 'meta')
export interface PaginationMeta {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

// 3. La respuesta completa del GET
export interface PaginatedLocations {
    content: Location[];
    meta: PaginationMeta;
}

// 4. Lo que enviamos al POST
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