import api from "@/core/api/api-client";
import type {
    PaginatedLocations,
    CreateLocationDTO,
    UpdateLocationDTO
} from "../types/places.types";

import type { MessageResponse } from "@/utils/message.type";

export const getLocations = async (page: number = 0, size: number = 10): Promise<PaginatedLocations> => {
    const { data } = await api.get<PaginatedLocations>('/admin/lugaresactivos', {
        params: { page, size }
    });
    return data;
};

export const createLocation = async (locationData: CreateLocationDTO): Promise<UpdateLocationDTO> => {
    const { data } = await api.post('/admin/crearlugar', locationData);
    return data;
};

export const updateLocation = async (id: number, locationData: UpdateLocationDTO): Promise<UpdateLocationDTO> => {
    const { data } = await api.patch(`/admin/actualizarlugar/${id}`, locationData);
    return data;
};

export const deleteLocation = async (id: number): Promise<MessageResponse> => {
    const { data } = await api.delete(`/admin/eliminar/${id}`);
    return data;
};