import api from "@/core/api/api-client";
import type { CreateEventFormData } from "../schema/createEventSchema";
import type { EventStatus } from '../types/event.types';
import type { MessageResponse } from "@/utils/message.type";

export const getMyEvents = async (status: EventStatus, page: number, size: number) => {
    const { data } = await api.get(`/eventos/mis-eventos`, {
        params: { status, page, size }
    });
    return data;
};

export const createEvent = async (eventData: CreateEventFormData) => {
    const { data } = await api.post(`/eventos/crear`, eventData);
    return data;
}
export const publishEvent = async (eventId: number): Promise<{ message: MessageResponse }> => {
    const { data } = await api.patch(`/eventos/publicar/${eventId}`);
    return data;
}

// 🌟 US-009: Cancelar (Ahora recibe el motivo y lo manda como objeto)
export const cancelEvent = async (eventId: number, reason: string): Promise<{ message: MessageResponse }> => {
    const { data } = await api.patch(`/eventos/cancelar/${eventId}`, { reason });
    return data;
}