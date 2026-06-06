import { useQuery } from '@tanstack/react-query';
import { getEventReport } from '../service/eventService';

export const useEventReport = (eventId: number | null) => {
    return useQuery({
        queryKey: ['event-report', eventId],
        queryFn: () => getEventReport(eventId as number),
        enabled: !!eventId,
    });
};