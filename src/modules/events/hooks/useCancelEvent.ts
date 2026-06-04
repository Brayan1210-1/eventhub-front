import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelEvent } from "../service/eventService";


export const useCancelEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        // Empaquetamos el id y el motivo en un solo objeto
        mutationFn: ({ eventId, reason }: { eventId: number; reason: string }) =>
            cancelEvent(eventId, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myEvents'] });
        }
    });
};