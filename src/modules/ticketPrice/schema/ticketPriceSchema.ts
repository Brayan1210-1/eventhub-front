import { z } from "zod";
export const createTicketPriceSchema = z.object({
    eventId: z.number(),
    zoneId: z.number(),
    price: z.number().positive("El precio debe ser mayor a 0"),
    availableQuantity: z.number().int().positive("La cantidad debe ser mayor a 0")
});

export type CreateTicketPriceFormData = z.infer<typeof createTicketPriceSchema>;