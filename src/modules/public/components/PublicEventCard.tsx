import { useNavigate } from "react-router-dom";
import type { PublicEvent } from "../types/public.types";

interface Props {
    event: PublicEvent;
}

export function PublicEventCard({ event }: Props) {
    const navigate = useNavigate();

    const formatearFecha = (fecha: string) => {
        if (!fecha) return "Por definir";
        const date = new Date(fecha);
        return date.toLocaleDateString('es-CO', {
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
        }).toUpperCase();
    };

    const formatoDinero = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    });

    return (
        <div
            onClick={() => navigate(`/evento/${event.id}`)}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
            {/* Imagen promocional */}
            <div className="h-56 bg-gray-200 relative overflow-hidden">
                {event.imageUrl ? (
                    <img
                        src={event.imageUrl}
                        alt={event.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                        Próximamente
                    </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-900 tracking-wider shadow-sm">
                    {event.category}
                </div>
            </div>

            {/* Información del Evento */}
            <div className="p-6 grow flex flex-col">
                <p className="text-blue-600 font-bold text-sm mb-2">{formatearFecha(event.eventDate)}</p>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors">
                    {event.name}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span className="truncate">{event.placeName}, {event.city}</span>
                </div>

                {/* Rango de Precios */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                            {/* Si min y max son iguales, muestra precio único, si no, el rango */}
                            {event.minPrice === event.maxPrice ? "Precio" : "Rango de precios"}
                        </p>
                        <p className="text-sm font-black text-gray-900">
                            {event.minPrice === event.maxPrice
                                ? formatoDinero.format(event.minPrice)
                                : `${formatoDinero.format(event.minPrice)} - ${formatoDinero.format(event.maxPrice)}`
                            }
                        </p>
                    </div>
                    <div className="bg-blue-50 text-blue-700 p-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    );
}