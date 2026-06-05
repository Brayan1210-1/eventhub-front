import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/modules/public/service/public.service';
import type { EventFilters } from '@/modules/public/types/public.types';

export const useSellerEvents = (filters: EventFilters, page: number = 0) => {
    return useQuery({
        queryKey: ['sellerEvents', filters, page],

        queryFn: () => publicService.getPublicEvents(filters, page, 20),
    });
};