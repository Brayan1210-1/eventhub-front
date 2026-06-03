import { useQuery } from "@tanstack/react-query";
import { ticketService } from "../service/ticketPrice.service";

export const usePricesByEvent = (eventId: number) => {
    return useQuery({
        queryKey: ['ticketPrices', 'event', eventId],
        queryFn: () => ticketService.getPricesByEvent(eventId),
        // Solo ejecuta la petición si realmente tenemos un ID válido
        enabled: !!eventId,
    });
};