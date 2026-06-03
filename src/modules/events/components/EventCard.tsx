import type { Event } from "../types/event.types";
import { Button } from "@/design/atoms/button"; // Asumiendo que tienes tu botón aquí

interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    // Función nativa para que la fecha se vea bonita (ej: 2 de junio de 2026)
    const formatearFecha = (fecha: string) => {
        if (!fecha) return "Fecha no definida";
        const date = new Date(fecha);
        // Le sumamos el timezone offset si es necesario, o lo dejamos directo
        return date.toLocaleDateString('es-CO', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow relative">

            {/* 🌟 LA MAGIA DEL placeActive: Alerta gigante si el lugar fue desactivado */}
            {!event.placeActive && (
                <div className="absolute top-0 left-0 w-full bg-red-600 text-white text-xs font-bold text-center py-1.5 z-10 shadow-sm">
                    ⚠️ EL LUGAR YA NO ESTÁ DISPONIBLE
                </div>
            )}

            {/* Imagen del evento */}
            <div className={`h-48 bg-gray-200 relative ${!event.placeActive ? 'mt-6' : ''}`}>
                {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                        Sin imagen
                    </div>
                )}

                {/* Etiqueta del estado (BORRADOR, PUBLICADO...) */}
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-blue-900 shadow">
                    {event.status}
                </span>
            </div>

            {/* Información de la tarjeta */}
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

            {/* Botón de acción */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 mt-auto">
                {/* Si el lugar está inactivo, le pedimos que lo cambie. Si está activo, que configure precios */}
                <Button className={`w-full ${!event.placeActive ? 'bg-red-600 hover:bg-red-700' : ''}`}>
                    {!event.placeActive ? "Cambiar Lugar" : "Configurar Evento"}
                </Button>
            </div>
        </div>
    );
}