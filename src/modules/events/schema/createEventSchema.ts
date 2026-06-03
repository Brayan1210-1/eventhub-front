import { z } from "zod";

export const createEventSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    description: z.string().min(10, "La descripción es muy corta"),
    eventDate: z.string().min(1, "La fecha del evento es obligatoria"),
    startTime: z.string().min(1, "La hora de inicio es obligatoria"),
    openingTime: z.string().min(1, "La hora de apertura es obligatoria"),

    category: z.enum(["CONCIERTO", "CONFERENCIA", "TEATRO", "DEPORTIVO", "OTRO"], {
        error: "Debe ingresar una categoria valida"
    }),

    imageUrl: z.url("Debe ser una URL válida de la imagen"),

    salesStartDate: z.string().min(1, "La fecha de inicio de ventas es requerida"),
    salesEndDate: z.string().min(1, "La fecha de fin de ventas es requerida"),

    placeId: z.number().positive("Debes seleccionar un lugar de la lista")
});

// Extraemos el tipo de TypeScript automáticamente desde Zod
export type CreateEventFormData = z.infer<typeof createEventSchema>;