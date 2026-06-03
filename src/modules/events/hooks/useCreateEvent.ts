import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../service/eventService";
import type { CreateEventFormData } from "../schema/createEventSchema";

export const useCreateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateEventFormData) => createEvent(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-events'] });
        },
    });
};