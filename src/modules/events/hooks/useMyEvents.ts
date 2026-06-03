import { useQuery } from "@tanstack/react-query";
import { getMyEvents } from "../service/eventService";
import type { EventStatus } from "../types/event.types";

export const useMyEvents = (status: EventStatus, page = 0, size = 10) => {
    return useQuery({
        queryKey: ['my-events', status, page, size],
        queryFn: () => getMyEvents(status, page, size),

    });
};