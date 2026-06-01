import api from "@/core/api/api-client";
import type { Zone, PaginatedZones } from "../types/zone.types";
import type { ZoneFormData } from "../schemas/zone.schema";

export const zoneService = {

    getZonesByPlace: async (lugarId: number) => {
        const response = await api.get<PaginatedZones>(`/zonas/lugar/${lugarId}`);
        return response.data;
    },

    createZone: async (lugarId: number, data: ZoneFormData) => {
        const response = await api.post<Zone>(`/zonas/lugar/${lugarId}/crear`, data);
        return response.data;
    },

    updateZone: async (lugarId: number, zonaId: number, data: ZoneFormData) => {
        const response = await api.put<Zone>(`/zonas/lugar/${lugarId}/actualizar/${zonaId}`, data);
        return response.data;
    },

    deleteZone: async (zoneId: number) => {
        const response = await api.delete<{ message: string }>(`/zonas/eliminar/${zoneId}`);
        return response.data;
    }
};