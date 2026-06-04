import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishEvent } from "../service/eventService"

export const usePublishEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (eventId: number) => publishEvent(eventId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myEvents'] });
        }
    });
};