import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useConfirmPayment } from "../hooks/useConfirmPayment";
import { useOrderDetail } from "../hooks/useOrderQueries";
import type { PaymentMethod } from "../types/orders.type";
import { ConfirmModal } from "@/design/molecules/ConfirmModal";
import { useCancelOrder } from "../hooks/useCancelOrders";

export function PaymentPage() {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();

    const [method, setMethod] = useState<PaymentMethod>('TARJETA');
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const { data: order, isLoading, isError } = useOrderDetail(orderId);

    const confirmMutation = useConfirmPayment();
    const cancelMutation = useCancelOrder();

    const handlePayment = () => {
        if (!orderId) return;
        const mockReference = `REF-${Math.floor(Math.random() * 1000000)}`;

        confirmMutation.mutate(
            { orderId, request: { paymentMethod: method, paymentReference: mockReference } },
            {
                onSuccess: () => navigate("/mis-boletas")
            }
        );
    };

    const handleConfirmCancel = () => {
        if (!orderId) return;
        cancelMutation.mutate(orderId, {
            onSuccess: () => {
                setIsCancelModalOpen(false);
                navigate("/mis-boletas");
            }
        });
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 font-bold text-blue-900">Cargando pasarela segura...</div>;
    if (isError || !order) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Error cargando la información de la orden.</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center relative">

            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">

                {/* HEADER CON BOTÓN DE RETROCESO */}
                <div className="bg-blue-900 p-6 text-center relative">
                    <button
                        onClick={() => navigate('/mis-boletas')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-blue-200 hover:text-white transition-colors rounded-full hover:bg-blue-800"
                        title="Volver a mis boletas"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <h2 className="text-2xl font-black text-white">Pasarela de Pago</h2>
                    <p className="text-blue-200 text-sm mt-1">Checkout Seguro EventHub</p>
                </div>

                <div className="p-8 space-y-8">

                    {/* RESUMEN DE COMPRA LÍMPIO (Directo del DTO) */}
                    <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                        <h3 className="text-xs font-black text-blue-800 uppercase tracking-wider mb-4">Resumen de tu compra</h3>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">Evento</span>
                                <span className="font-bold text-gray-900 truncate max-w-37.5">{order.eventName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">Ubicación</span>
                                <span className="font-medium text-gray-800">{order.zoneName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">Cantidad</span>
                                <span className="font-medium text-gray-800">
                                    {order.ticketQuantity} {order.ticketQuantity === 1 ? 'boleta' : 'boletas'}
                                </span>
                            </div>

                            <hr className="border-blue-100 my-2" />

                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 font-bold">Total a Pagar</span>
                                <span className="text-2xl font-black text-blue-600">
                                    ${order.totalAmount?.toLocaleString('es-CO')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* SELECTOR DE MÉTODO DE PAGO */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Selecciona tu método</label>
                        <div className="grid grid-cols-3 gap-3">
                            {(['TARJETA', 'PSE', 'EFECTIVO'] as PaymentMethod[]).map((pm) => (
                                <button
                                    key={pm}
                                    onClick={() => setMethod(pm)}
                                    className={`py-3 px-2 rounded-xl border-2 font-bold text-xs transition-all ${method === pm
                                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {pm}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    <div className="pt-2 space-y-3">
                        <button
                            onClick={handlePayment}
                            disabled={confirmMutation.isPending}
                            className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-black rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                        >
                            {confirmMutation.isPending ? 'Procesando pago...' : `Pagar $${order.totalAmount?.toLocaleString('es-CO')}`}
                        </button>

                        <button
                            onClick={() => setIsCancelModalOpen(true)}
                            disabled={cancelMutation.isPending || confirmMutation.isPending}
                            className="w-full py-3 bg-white border-2 border-red-50 hover:bg-red-50 text-red-500 hover:text-red-600 font-bold rounded-xl transition-colors disabled:opacity-50"
                        >
                            Cancelar Orden
                        </button>
                    </div>
                </div>
            </div>

            {/* MOLÉCULA MODAL DE CONFIRMACIÓN */}
            <ConfirmModal
                isOpen={isCancelModalOpen}
                title="¿Cancelar orden?"
                message={`Las ${order.ticketQuantity} boletas para ${order.eventName} se liberarán y perderás tu reserva.`}
                confirmText="Sí, cancelar orden"
                cancelText="No, volver al pago"
                onConfirm={handleConfirmCancel}
                onCancel={() => setIsCancelModalOpen(false)}
            />
        </div>
    );
}