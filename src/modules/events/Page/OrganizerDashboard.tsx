import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyEvents } from "../hooks/useMyEvents";
import { EventCard } from "../components/EventCard";
import type { EventStatus, Event } from "../types/event.types";

export function OrganizerDashboard() {
    const [currentStatus, setCurrentStatus] = useState<EventStatus>('BORRADOR');

    // 🌟 Instanciamos el hook de navegación
    const navigate = useNavigate();

    const { data: eventsData, isLoading, isError } = useMyEvents(currentStatus);

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8">

            {/* Encabezado */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-gray-50 p-4 rounded-xl">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Mis Eventos</h1>
                    <p className="text-gray-500 mt-1">Administra tus eventos, configura localidades y revisa su estado.</p>
                </div>
                {/* 🌟 Le pasamos la ruta directamente como un string */}
                <button
                    onClick={() => navigate('/crear')}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-sm hover:bg-blue-700 transition-all hover:shadow-md"
                >
                    + Crear Nuevo Evento
                </button>
            </div>

            {/* Pestañas de Filtro */}
            <div className="flex gap-2 border-b border-gray-200 mb-8 overflow-x-auto pb-2 bg-gray-50 px-2 pt-2 rounded-t-xl">
                {(['BORRADOR', 'PUBLICADO', 'FINALIZADO', 'CANCELADO'] as EventStatus[]).map((status) => (
                    <button
                        key={status}
                        onClick={() => setCurrentStatus(status)}
                        className={`px-5 py-2.5 font-semibold text-sm rounded-t-xl transition-all whitespace-nowrap ${currentStatus === status
                            ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                            : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Zona de Resultados */}
            {isLoading && (
                <div className="py-20 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Cargando tu información...</p>
                </div>
            )}

            {isError && (
                <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200 text-center font-medium">
                    Ocurrió un error al intentar cargar los eventos. Por favor, recarga la página.
                </div>
            )}

            {!isLoading && !isError && eventsData?.content && (
                <>
                    {eventsData.content.length === 0 ? (
                        <div className="text-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <span className="text-4xl mb-4 block">📭</span>
                            <h3 className="text-lg font-bold text-gray-700">No hay eventos aquí</h3>
                            <p className="text-gray-500 mt-1">No tienes ningún evento en estado {currentStatus}.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {/* 🌟 Adiós any, usamos nuestra interfaz Event */}
                            {eventsData.content.map((evento: Event) => (
                                <EventCard key={evento.id} event={evento} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}