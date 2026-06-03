import { useMutation } from "@tanstack/react-query";
import { ticketService } from "../service/ticketPrice.service";
import type { CreateTicketPriceFormData } from "../schema/ticketPriceSchema";

interface CreatePriceParams {
    eventId: number;
    zoneId: number;
    data: CreateTicketPriceFormData;
}

export const useCreateTicketPrice = () => {
    return useMutation({
        mutationFn: ({ eventId, zoneId, data }: CreatePriceParams) =>
            ticketService.createPrice(eventId, zoneId, data),
    });
};