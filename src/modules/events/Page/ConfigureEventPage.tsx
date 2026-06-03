import { useLocation, useNavigate } from "react-router-dom";
import { useZonesByPlace } from "@/modules/zones/hooks/useZonesByPlace";
import type { Zone } from "@/modules/zones/types/zone.types";
import { ZonePriceCard } from "@/modules/ticketPrice/components/ZonePriceCard";
import { Button } from "@/design/atoms/button";
import type { TicketPrice } from "@/modules/ticketPrice/types/ticketPrice";
import { usePricesByEvent } from "@/modules/ticketPrice/hooks/usePriceEvent";

export function ConfigureEventPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const eventId = state?.eventId;
    const placeId = state?.placeId;
    const eventName = state?.eventName;

    const { data: zonesData, isLoading: isLoadingZones, isError: isErrorZones } = useZonesByPlace(placeId);
    const { data: pricesData, isLoading: isLoadingPrices } = usePricesByEvent(eventId);

    const isLoading = isLoadingZones || isLoadingPrices;

    if (!eventId || !placeId) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-5xl mb-4">⚠️</span>
                <h2 className="text-2xl font-bold text-gray-800">Faltan datos del evento</h2>
                <p className="text-gray-500 mb-6">No pudimos cargar la información necesaria para configurar los precios.</p>
                <Button onClick={() => navigate('/organizador/dashboard')}>
                    Volver al Dashboard
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-8">

            {/* Encabezado con Botón de Regreso/Finalizar */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6 gap-4">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-500 hover:text-gray-800 mb-2 flex items-center gap-2 font-medium transition-colors"
                    >
                        ← Volver
                    </button>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Configurar Localidades</h1>
                    <p className="text-gray-500 mt-1">
                        Evento: <span className="font-semibold text-blue-600">{eventName}</span>
                    </p>
                </div>

                {/* 🌟 Este es el botón clave que pediste para terminar el flujo */}
                <Button
                    onClick={() => navigate('/organizador/dashboard')}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-sm font-bold text-lg"
                >
                    Terminar y Volver
                </Button>
            </div>

            {/* Aviso informativo de reglas de negocio */}
            <div className="bg-blue-50 text-blue-800 p-5 rounded-xl mb-8 border border-blue-100 flex items-start gap-3 shadow-sm">
                <span className="text-xl">💡</span>
                <p className="text-sm font-medium mt-0.5">
                    <strong>Regla de configuración:</strong> Solo asigna precio y guarda las zonas donde vayas a vender boletas. Las zonas que dejes sin configurar simplemente no estarán disponibles para el público en este evento.
                </p>
            </div>

            {/* Estados de Carga y Error */}
            {isLoading && (
                <div className="py-16 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Cargando las zonas del lugar...</p>
                </div>
            )}

            {isErrorZones && (
                <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200 text-center font-medium">
                    Ocurrió un error al intentar cargar las zonas. Por favor, verifica tu conexión o intenta recargar.
                </div>
            )}

            {/* Mapeo de Tarjetas (Sin rastro de "any") */}
            {zonesData?.content && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {zonesData.content.map((zone: Zone) => {
                        const existingPrice = pricesData?.find(
                            (price: TicketPrice) => price.zoneId === zone.id
                        );
                        return (
                            <ZonePriceCard
                                key={zone.id}
                                zone={zone}
                                eventId={eventId}
                                existingPrice={existingPrice}
                            />
                        );
                    })}
                </div>
            )}

        </div>
    );
}