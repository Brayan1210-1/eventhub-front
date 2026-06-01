import { z } from "zod";

export const ZoneSchema = z.object({
    name: z.string().min(2, "El nombre de la zona es obligatorio"),
    description: z.string().min(5, "Añade una descripción breve (ej: Cerca a la tarima)"),


    capacity: z
        .number({ error: "Debes ingresar un número" })
        .int("Debe ser un número entero")
        .positive("La capacidad debe ser mayor a 0")


});


export type ZoneFormData = z.infer<typeof ZoneSchema>;