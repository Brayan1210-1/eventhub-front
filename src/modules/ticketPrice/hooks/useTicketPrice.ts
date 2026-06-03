import { useMutation } from "@tanstack/react-query";
import { ticketService } from "../service/ticketPrice.service";
import type { CreateTicketPriceFormData } from "../schema/ticketPriceSchema";

export const useCreateTicketPrice = () => {
    return useMutation({
        mutationFn: (data: CreateTicketPriceFormData) => ticketService.createTicketPrice(data),

    });
};