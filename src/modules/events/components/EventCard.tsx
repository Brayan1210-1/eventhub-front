import { useNavigate } from "react-router-dom";
import type { Event } from "../types/event.types";
import { Button } from "@/design/atoms/button";

interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    // Instanciamos el navegador directamente en la tarjeta
    const navigate = useNavigate();

    const formatearFecha = (fecha: string) => {
        if (!fecha) return "Fecha no definida";
        const date = new Date(fecha);
        return date.toLocaleDateString('es-CO', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow relative">

            {!event.placeActive && (
                <div className="absolute top-0 left-0 w-full bg-red-600 text-white text-xs font-bold text-center py-1.5 z-10 shadow-sm">
                    ⚠️ EL LUGAR YA NO ESTÁ DISPONIBLE
                </div>
            )}

            <div className={`h-48 bg-gray-200 relative ${!event.placeActive ? 'mt-6' : ''}`}>
                {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                        Sin imagen
                    </div>
                )}

                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-blue-900 shadow">
                    {event.status}
                </span>
            </div>

            <div className="p-5 grow flex flex-col">
                <p className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-1">{event.category}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1" title={event.name}>
                    {event.name}
                </h3>

                <div className="flex flex-col gap-1.5 text-sm text-gray-600 mt-auto">
                    <p className="flex items-center gap-2">
                        <span>📅</span> {formatearFecha(event.eventDate)}
                    </p>
                    <p className={`flex items-center gap-2 ${!event.placeActive ? 'text-red-500 font-semibold' : ''}`}>
                        <span>📍</span> {event.placeName}
                    </p>
                </div>
            </div>

            {/* 🌟 Contenedor de Acciones (Preparado para US-008 y US-009) */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 mt-auto flex justify-end gap-2 items-center">

                {/* Botón de Cambio de Lugar (Solo visible si está inactivo) */}
                {!event.placeActive && (
                    <Button className="grow bg-red-600 hover:bg-red-700 text-sm py-1.5">
                        Cambiar Lugar
                    </Button>
                )}

                {/* Futuro espacio para el botón de Publicar/Cancelar */}
                {/* <Button>...</Button> */}

                {/* Botón de Configuración (Engranaje) */}
                <button
                    title="Configurar Localidades"
                    onClick={() => navigate('/evento/configurar', {
                        state: {
                            eventId: event.id,
                            placeId: event.placeId,
                            eventName: event.name
                        }
                    })}
                    className="p-2 text-gray-600 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}