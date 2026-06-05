import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyOrders, usePendingOrders } from "../hooks/useOrderQueries";
import type { OrderFilter } from "../types/orders.type";
import { OrderCard } from "../components/OrderCard";
import { CardSkeleton } from "@/design/atoms/CardSkeleton";
import { TicketModal } from "../components/TicketModal";

export function MyOrdersDashboard() {
    const navigate = useNavigate();

    // Estado para controlar la pestaña activa (UPCOMING, PAST, ALL)
    const [activeFilter, setActiveFilter] = useState<OrderFilter>('UPCOMING');
    const [page, setPage] = useState(0);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    // 1. Buscamos si hay alguna orden pendiente
    const { data: pendingOrders, isLoading: loadingPending } = usePendingOrders();
    const hasPending = pendingOrders && pendingOrders.length > 0;

    // 2. Traemos el historial paginado basado en la pestaña activa
    const { data: ordersData, isFetching, isError } = useMyOrders(activeFilter, page);

    const handleFilterChange = (filter: OrderFilter) => {
        setActiveFilter(filter);
        setPage(0); // Reiniciamos la paginación al cambiar de pestaña
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header del Dashboard */}
            <div className="bg-blue-900 text-white pt-16 pb-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Mis Boletas</h1>
                    <p className="text-blue-200 text-lg">Administra tus compras y accesos a eventos.</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 -mt-6 relative z-10">

                {/* 🌟 BANNER DE ORDEN PENDIENTE */}
                {!loadingPending && hasPending && pendingOrders.length > 0 && (
                    <div className="mb-8 space-y-4">
                        {pendingOrders.map(order => (
                            <div key={order.orderId} className="bg-yellow-400 p-6 rounded-2xl shadow-sm border border-yellow-500 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-yellow-500 rounded-full text-white">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-yellow-900">¡Tienes una compra en progreso!</h3>
                                        <p className="text-yellow-800 font-medium">
                                            Completa el pago para el evento <span className="font-bold">{order.eventName}</span>.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/pago/${order.orderId}`)}
                                    className="w-full md:w-auto px-6 py-3 bg-yellow-900 text-yellow-400 hover:bg-yellow-800 font-bold rounded-xl shadow-sm transition-colors whitespace-nowrap"
                                >
                                    Continuar al pago
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* 🌟 PESTAÑAS (Filtros) */}
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 inline-flex w-full md:w-auto mb-8 overflow-x-auto">
                    {(['UPCOMING', 'PAST', 'ALL'] as OrderFilter[]).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => handleFilterChange(filter)}
                            className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-bold rounded-lg transition-colors ${activeFilter === filter
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                        >
                            {filter === 'UPCOMING' ? 'Próximos' : filter === 'PAST' ? 'Pasados' : 'Historial Completo'}
                        </button>
                    ))}
                </div>

                {/* 🌟 LISTADO DE ÓRDENES */}
                <div className="space-y-4">
                    {isFetching ? (
                        <div className="space-y-4">
                            <CardSkeleton />
                            <CardSkeleton />
                        </div>
                    ) : isError ? (
                        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200 text-center font-medium">
                            No pudimos cargar tu historial. Intenta recargar la página.
                        </div>
                    ) : ordersData?.content.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 border-dashed">
                            <span className="text-5xl mb-4 block opacity-50">🎟️</span>
                            <h3 className="text-xl font-bold text-gray-800">No hay boletas aquí</h3>
                            <p className="text-gray-500 mt-2">Aún no tienes órdenes en esta categoría.</p>
                            <button
                                onClick={() => navigate('/catalogo')}
                                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                            >
                                Explorar eventos
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                                {ordersData?.content.map(order => (

                                    <OrderCard key={order.orderId} order={order} onClick={() => setSelectedOrderId(order.orderId)} />

                                ))}
                            </div>


                            {/* 🌟 CONTROLES DE PAGINACIÓN */}
                            {ordersData?.meta && ordersData.meta.totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-10">
                                    <button
                                        onClick={() => setPage(old => Math.max(old - 1, 0))}
                                        disabled={page === 0}
                                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Anterior
                                    </button>
                                    <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
                                        {page + 1} / {ordersData.meta.totalPages}
                                    </span>
                                    <button
                                        onClick={() => setPage(old => old + 1)}
                                        disabled={page >= ordersData.meta.totalPages - 1}
                                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

            </div>
            <TicketModal
                isOpen={!!selectedOrderId}
                orderId={selectedOrderId}
                onClose={() => setSelectedOrderId(null)}
            />
        </div>
    );
}