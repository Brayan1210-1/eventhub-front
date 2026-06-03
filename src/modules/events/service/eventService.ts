import api from "@/core/api/api-client";
import type { CreateEventFormData } from "../schema/createEventSchema";
import type { EventStatus } from '../types/event.types';

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