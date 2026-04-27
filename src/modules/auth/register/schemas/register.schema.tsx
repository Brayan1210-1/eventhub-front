import { z } from "zod";

export const registerSchema = z.object({

    name: z
        .string()
        .min(3, "el nombre es obligatorio")
        .max(40, "No se pueden más de 40 caracteres"),

    lastName: z
        .string()
        .min(3, "el apellido es obligatorio")
        .max(80, "El máximo es de 80 caracteres"),

    email: z
        .string().trim().toLowerCase().pipe(z.email("email inválido")),

    password: z
        .string()
        .min(6, "la contraseña tener mínimo 6 caracteres"),

    document: z
        .string()
        .min(1, "Documento requerido"),
    
    phone: z
    .string()
    .regex(/^[0-9]+$/, "Solo números"),

});

export type RegisterType = z.infer<typeof registerSchema>;