import { z } from 'zod';


export const physicalSaleSchema = z.object({
    quantity: z.number().min(1, 'Debe vender al menos 1 boleta'),
    buyerName: z.string().min(2, 'El nombre es obligatorio'),
    buyerLastName: z.string().min(2, 'El apellido es obligatorio'),
    buyerDocument: z.string().min(5, 'El documento es obligatorio'),
    buyerEmail: z.string().email('Email inválido'),
    buyerPhone: z.string().min(7, 'El teléfono es obligatorio'),
    paymentMethod: z.enum(['EFECTIVO', 'TARJETA'], {
        error: "El método de pago es obligatorio"
    })
});

export type PhysicalSaleRequestDTO = z.infer<typeof physicalSaleSchema>;
// ¡Y ya no necesitas definir la interfaz a mano! Zod la infiere por