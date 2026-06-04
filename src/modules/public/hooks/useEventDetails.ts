import { useQuery } from "@tanstack/react-query";
import { publicService } from "../service/public.service";

export const useEventDetail = (eventId: number) => {
    return useQuery({
        queryKey: ['eventDetail', eventId],
        queryFn: () => publicService.getEventDetail(eventId),
        enabled: !!eventId,
    });
};