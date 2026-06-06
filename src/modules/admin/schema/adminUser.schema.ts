import { z } from 'zod';

// 1. Definimos los valores exactos de tu backend como una constante
export const USER_ROLES = ['ADMIN', 'ORGANIZADOR', 'VENDEDOR', 'CLIENTE'] as const;

// 2. Extraemos el tipo de TypeScript para poder usarlo en otras partes
export type UserRole = typeof USER_ROLES[number];

export const adminUserRegisterSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    lastName: z.string().min(1, 'El apellido es obligatorio'),
    document: z.string().min(1, 'El documento es obligatorio'),
    email: z.email('El formato del correo es inválido').min(1, 'El correo electrónico es obligatorio'),
    phone: z.string().optional(),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    roles: z.array(z.enum(USER_ROLES)).min(1, 'Debe especificar al menos un rol para el usuario'),
});

export type AdminUserRegisterType = z.infer<typeof adminUserRegisterSchema>;