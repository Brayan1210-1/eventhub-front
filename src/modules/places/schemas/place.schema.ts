import { z } from "zod";

export const PlaceSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    address: z.string().min(5, "La dirección es muy corta"),
    city: z.string().min(2, "La ciudad es obligatoria"),

    totalCapacity: z.number({ error: "Debe ser un número" })
        .int("Debe ser un número entero")
        .positive("La capacidad debe ser mayor a 0"),


    description: z.string().min(10, "Añade una descripción un poco más detallada"),
    imageUrl: z.url("Debe ser una URL válida para la imagen"),
});

export type PlaceFormData = z.infer<typeof PlaceSchema>;