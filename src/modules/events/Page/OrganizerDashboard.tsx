import { useState } from "react";
import { useMyEvents } from "../hooks/useMyEvents";
import { EventCard } from "../components/EventCard";
import type { EventStatus, Event } from "../types/event.types";
import { SalesHistoryTab } from "../../orders/components/SalesHistoryTab";

export function OrganizerDashboard() {

    const [currentStatus, setCurrentStatus] = useState<EventStatus>('BORRADOR');
    const [page, setPage] = useState(0);
    const [activeTab, setActiveTab] = useState<'events' | 'sales'>('events');


    const { data: eventsData, isLoading, isError } = useMyEvents(currentStatus, page);

    const handleStatusChange = (status: EventStatus) => {
        setCurrentStatus(status);
        setPage(0);
    };

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8">


            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Panel de Organizador</h1>
                    <p className="text-gray-500 mt-1">Administra tus eventos y monitorea tus ingresos.</p>
                </div>
            </div>

            <div className="flex border-b border-gray-200 mb-8 bg-gray-100">
                <button
                    className={`py-3 px-6 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'events'
                        ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                    onClick={() => setActiveTab('events')}
                >
                    Mis Eventos
                </button>
                <button
                    className={`py-3 px-6 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'sales'
                        ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                    onClick={() => setActiveTab('sales')}
                >
                    Historial de Ventas
                </button>
            </div>


            {activeTab === 'sales' && (
                <SalesHistoryTab />
            )}


            {activeTab === 'events' && (
                <>
                    {/* Filtros de estado */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {(['BORRADOR', 'PUBLICADO', 'FINALIZADO', 'CANCELADO'] as EventStatus[]).map((status) => (
                            <button
                                key={status}
                                onClick={() => handleStatusChange(status)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${currentStatus === status
                                    ? 'bg-blue-900 text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Estados de Carga y Error */}
                    {isLoading && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
                        </div>
                    )}

                    {isError && (
                        <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center font-semibold border border-red-100">
                            Ocurrió un error al cargar los eventos.
                        </div>
                    )}

                    {/* Estado Vacío */}
                    {eventsData && eventsData.content.length === 0 && (
                        <div className="bg-gray-50 text-gray-500 p-12 rounded-2xl text-center border border-gray-200 border-dashed">
                            <p className="text-lg font-medium">No tienes eventos en estado {currentStatus}.</p>
                        </div>
                    )}

                    {/* Grid de Eventos */}
                    {eventsData && eventsData.content.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {eventsData.content.map((event: Event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>

                            {/* Paginación */}
                            {eventsData.meta.totalPages > 1 && (
                                <div className="flex justify-center items-center gap-6 mt-10 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={() => setPage((old) => Math.max(old - 1, 0))}
                                        disabled={page === 0}
                                        className="px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        ← Anterior
                                    </button>

                                    <span className="text-sm font-medium text-gray-500">
                                        Página <span className="font-bold text-gray-900">{page + 1}</span> de {eventsData.meta.totalPages}
                                    </span>

                                    <button
                                        onClick={() => setPage((old) => old + 1)}
                                        disabled={page >= eventsData.meta.totalPages - 1}
                                        className="px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Siguiente →
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}

        </div>
    );
}