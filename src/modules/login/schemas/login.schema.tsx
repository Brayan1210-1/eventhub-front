import { z } from "zod";

export  const loginSchema = z.object({

    email: z
    .string().trim().toLowerCase().pipe(z.email("email inválido")),

    password: z
        .string()
        .min(6, "la contraseña tener mínimo 6 caracteres")
})