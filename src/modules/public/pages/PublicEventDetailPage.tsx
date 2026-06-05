import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEventDetail } from "@/modules/public/hooks/useEventDetails";
import { useCreateOrder } from "@/modules/orders/hooks/useCreateOrders";
import { useAuthStore } from "@/core/store/auth.store";
import { ZonePurchaseCard } from "@/modules/orders/components/ZonePurchaseCard";
import { NotificationToast, type ToastType } from "@/design/molecules/NotificationToast";
import { getApiErrorMessage } from "@/utils/errorController";
import { CardSkeleton } from "@/design/atoms/CardSkeleton";
import { ConfirmModal } from "@/design/molecules/ConfirmModal";

export function PublicEventDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    const [toast, setToast] = useState<{ message: string, type: ToastType } | null>(null);

    const [showAuthModal, setShowAuthModal] = useState(false);

    const [purchaseIntent, setPurchaseIntent] = useState<{
        zoneId: number;
        quantity: number;
        zoneName: string;
        totalAmount: number;
    } | null>(null);

    const { data: event, isLoading, isError } = useEventDetail(Number(id));
    const createOrderMutation = useCreateOrder();

    const formatoDinero = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    });


    const handlePurchaseClick = (zoneId: number, quantity: number) => {
        if (!isAuthenticated) {

            setShowAuthModal(true);
            return;
        }

        // Buscamos la info de la zona para mostrar un mensaje claro en el modal
        const zone = event?.zones.find(z => z.id === zoneId);
        if (zone) {
            setPurchaseIntent({
                zoneId,
                quantity,
                zoneName: zone.zoneName,
                totalAmount: zone.price * quantity
            });
        }
    };

    // 🌟 Paso 2: La función que realmente dispara la petición al confirmar
    const executePurchase = () => {
        if (!purchaseIntent) return;

        createOrderMutation.mutate(
            { eventId: Number(id), zoneId: purchaseIntent.zoneId, request: { quantity: purchaseIntent.quantity } },
            {
                onSuccess: () => {
                    setPurchaseIntent(null);
                    setToast({ message: "¡Boletas reservadas! Redirigiendo al pago...", type: "success" });
                    // setTimeout(() => navigate(`/pago/${response.orderId}`), 1500);
                },
                onError: (error) => {
                    setPurchaseIntent(null); // Cerramos el modal
                    setToast({ message: getApiErrorMessage(error), type: "error" });
                }
            }
        );
    };

    if (isLoading) return <div className="max-w-4xl mx-auto p-6 mt-10"><CardSkeleton /></div>;
    if (isError || !event) return <div className="text-center mt-20 text-red-500 font-bold">Error cargando el evento</div>;

    const formatearFecha = (fecha: string) => {
        return new Date(fecha).toLocaleDateString('es-CO', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero del Evento */}
            <div className="bg-blue-900 text-white relative h-[40vh] min-h-75">


                {event.imageUrl && (
                    <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
                )}

                <div className="absolute inset-0 bg-linear-to-t from-blue-900 via-blue-900/40 to-transparent pointer-events-none"></div>


                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-6xl mx-auto">

                    <button
                        onClick={() => navigate('/eventos')}
                        className="flex items-center gap-3 text-blue-200 hover:text-white transition-all font-bold text-lg md:text-xl mb-10 group w-fit outline-none"
                    >
                        <svg
                            className="w-7 h-7 transform group-hover:-translate-x-2 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {/* Aumentamos el strokeWidth a 2.5 para que la flecha sea más gordita */}
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Volver al catálogo
                    </button>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight drop-shadow-md">
                        {event.name}

                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm md:text-lg text-blue-100 font-medium">
                        <span className="flex items-center gap-2">📅 {formatearFecha(event.eventDate)} a las {event.startTime}</span>
                        <span className="flex items-center gap-2">📍 {event.placeName}, {event.city}</span>
                    </div>
                </div>
            </div>

            {/* Contenido Principal y Zonas */}
            <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Acerca del evento</h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                            {event.description}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Localidades Disponibles</h3>
                        {!event.salesOpen && (
                            <div className="mb-6 bg-yellow-50 text-yellow-800 p-4 rounded-xl font-medium flex items-center gap-3">
                                ⚠️ Las ventas para este evento se encuentran cerradas por el momento.
                            </div>
                        )}

                        <div className="flex flex-col gap-4 mt-6">
                            {event.zones?.length > 0 ? (
                                event.zones.map(zone => (
                                    <ZonePurchaseCard
                                        key={zone.id}
                                        zone={zone}
                                        salesOpen={event.salesOpen}
                                        isPending={false} // Ya no bloqueamos la tarjeta entera, bloquearemos el modal
                                        onPurchase={handlePurchaseClick}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-6">No hay zonas configuradas aún.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Ubicación</h4>
                        <p className="font-semibold text-gray-800">{event.placeName}</p>
                        <p className="text-gray-500 text-sm mt-1">{event.address}, {event.city}</p>
                    </div>


                    {event.imageUrl && (
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden w-full h-87.5 group">
                            <img
                                src={event.imageUrl}
                                alt={`Poster de ${event.name}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* 🌟 Renderizamos el ConfirmModal */}
            {purchaseIntent && (
                <ConfirmModal
                    isOpen={!!purchaseIntent}
                    title="Confirmar Reserva"
                    message={`¿Estás seguro que deseas reservar ${purchaseIntent.quantity} boleta(s) para la zona ${purchaseIntent.zoneName} por un total de ${formatoDinero.format(purchaseIntent.totalAmount)}? Tendrás 10 minutos para completar el pago una vez confirmes.`}
                    onConfirm={executePurchase}
                    onCancel={() => setPurchaseIntent(null)}
                    confirmText={createOrderMutation.isPending ? "Procesando..." : "Sí, reservar boletas"}
                    cancelText="Cancelar"
                // Si tu modal soporta desactivar botones mientras carga, puedes pasarle un isLoading={createOrderMutation.isPending}
                />
            )}

            {showAuthModal && (
                <ConfirmModal
                    isOpen={showAuthModal}
                    title="Acción requerida"
                    message="Para poder reservar y comprar boletas, necesitas una cuenta en EventHub. ¿Deseas registrarte ahora mismo para continuar?"
                    onConfirm={() => {
                        setShowAuthModal(false);
                        navigate('/auth/registro'); // Redirige al registro como solicitaste
                    }}
                    onCancel={() => setShowAuthModal(false)} // Cierra el modal sin hacer nada brusco
                    confirmText="Ir al registro"
                    cancelText="Volver al evento"
                />
            )}

            {toast && (
                <NotificationToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
        </div>
    );
}