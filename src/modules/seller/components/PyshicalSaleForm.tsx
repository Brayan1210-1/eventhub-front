import { useState } from 'react';
import { physicalSaleSchema } from '../schema/phycalsale.schema';
import { usePhysicalSaleMutation } from '../hooks/usePhysicalSaleMutation';
import type { PhysicalSaleRequestDTO } from '../types/pyshicalSeller.types';
import { TicketModal } from '@/modules/orders/components/TicketModal';

interface Props {
    eventId: number;
    zoneId: number;
    eventName: string;
}

export function PhysicalSaleForm({ eventId, zoneId, eventName }: Props) {
    const saleMutation = usePhysicalSaleMutation();
    const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const initialFormState: PhysicalSaleRequestDTO = {
        quantity: 1,
        buyerName: '',
        buyerLastName: '',
        buyerDocument: '',
        buyerEmail: '',
        buyerPhone: '',
        paymentMethod: 'EFECTIVO'
    };

    const [formData, setFormData] = useState<PhysicalSaleRequestDTO>(initialFormState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'quantity' ? Number(value) : value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 🌟 Validación usando el esquema importado
        const result = physicalSaleSchema.safeParse(formData);

        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.issues.forEach(issue => {
                // Convertimos la clave a string explícitamente para evitar el error de symbol
                const fieldName = issue.path[0].toString();

                if (fieldName) {
                    errors[fieldName] = issue.message;
                }
            });
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        saleMutation.mutate({ eventId, zoneId, data: result.data }, {
            onSuccess: (response) => {
                setCompletedOrderId(response.orderId);
                setFormData(initialFormState);
            },
            onError: (error) => {
                alert('Error al procesar la venta. Verifica la capacidad.');
                console.error("Error en la venta física:", error);
            }
        });
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 h-full flex flex-col">
            <div className="mb-6 border-b pb-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    Completar Venta
                </h2>
                <p className="text-gray-500 mt-2">
                    Vendiendo boletas para: <strong className="text-gray-800">{eventName}</strong> (Zona #{zoneId})
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                {/* Transacción */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cantidad</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
                        {formErrors.quantity && <p className="text-red-500 text-xs">{formErrors.quantity}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Método Pago</label>
                        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full border rounded-lg px-4 py-2">
                            <option value="EFECTIVO">Efectivo</option>
                            <option value="TARJETA">Tarjeta</option>
                        </select>
                    </div>
                </div>

                {/* Cliente */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre</label>
                        <input type="text" name="buyerName" value={formData.buyerName} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
                        {formErrors.buyerName && <p className="text-red-500 text-xs">{formErrors.buyerName}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Apellido</label>
                        <input type="text" name="buyerLastName" value={formData.buyerLastName} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
                        {formErrors.buyerLastName && <p className="text-red-500 text-xs">{formErrors.buyerLastName}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Documento</label>
                    <input type="text" name="buyerDocument" value={formData.buyerDocument} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
                    {formErrors.buyerDocument && <p className="text-red-500 text-xs">{formErrors.buyerDocument}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                        <input type="email" name="buyerEmail" value={formData.buyerEmail} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
                        {formErrors.buyerEmail && <p className="text-red-500 text-xs">{formErrors.buyerEmail}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Teléfono</label>
                        <input type="tel" name="buyerPhone" value={formData.buyerPhone} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
                        {formErrors.buyerPhone && <p className="text-red-500 text-xs">{formErrors.buyerPhone}</p>}
                    </div>
                </div>

                <button type="submit" disabled={saleMutation.isPending} className="w-full py-4 bg-blue-600 text-white font-black rounded-xl mt-4">
                    {saleMutation.isPending ? 'Procesando...' : 'Confirmar Venta'}
                </button>
            </form>

            <TicketModal isOpen={!!completedOrderId} orderId={completedOrderId} onClose={() => setCompletedOrderId(null)} />
        </div>
    );
}