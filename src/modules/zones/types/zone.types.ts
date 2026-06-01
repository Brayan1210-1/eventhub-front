// Esta es la respuesta que te da el backend cuando creas o consultas una zona
export interface Zone {
    id: number;
    name: string;
    capacity: number;
    description: string;
    place: number; // El backend devuelve un número representando el ID del lugar
    createdAt: string;
    updatedAt: string;
}

// Este es el formato de la paginación que devuelve tu GET
export interface PaginatedZones {
    content: Zone[];
    meta: {
        currentPage: number;
        pageSize: number;
        totalElements: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
}