import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { publicService } from "../service/public.service";
import type { EventFilters } from "../types/public.types";

export const usePublicEvents = (filters: EventFilters, page: number = 0) => {
    return useQuery({

        queryKey: ['publicEvents', filters, page],
        queryFn: () => publicService.getPublicEvents(filters, page, 10),
        placeholderData: keepPreviousData,
    });
};