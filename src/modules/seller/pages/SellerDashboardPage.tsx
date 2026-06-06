import { useState } from "react";
import { useSellerEvents } from "../hooks/useSellerEvents";
import { PhysicalSaleForm } from "../components/PyshicalSaleForm";
import type { PublicEvent } from "@/modules/public/types/public.types";
import { useEventDetail } from "@/modules/public/hooks/useEventDetails";

export function SellerDashboardPage() {
    const [page,] = useState(0);

    const [selectedEvent, setSelectedEvent] = useState<PublicEvent | null>(null);
    const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);

    const { data: eventsData, isLoading: loadingEvents } = useSellerEvents({}, page);
    const { data: eventDetail, isLoading: loadingZones } = useEventDetail(selectedEvent?.id || 0);

    const handleSelectEvent = (event: PublicEvent) => {
        setSelectedEvent(event);
        setSelectedZoneId(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    Taquilla Física
                </h1>

                {/* 🌟 Corrección: md:grid-cols-12 para que no se bajen las columnas */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    {/* COLUMNA IZQUIERDA: 5 Columnas */}
                    <div className="md:col-span-5 space-y-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">1. Selecciona el Evento</h2>

                            {loadingEvents ? (
                                <p className="text-gray-500 text-center py-10">Cargando eventos...</p>
                            ) : (
                                <div className="space-y-3 max-h-100 overflow-y-auto pr-2">
                                    {eventsData?.content.map(event => (
                                        <div
                                            key={event.id}
                                            onClick={() => handleSelectEvent(event)}
                                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedEvent?.id === event.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200 bg-white'}`}
                                        >
                                            <h3 className="font-bold text-gray-900">{event.name}</h3>
                                            <p className="text-sm text-gray-500">{new Date(event.eventDate).toLocaleDateString()}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ZONAS DEL EVENTO SELECCIONADO */}
                            {selectedEvent && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold text-gray-800">2. Selecciona la Zona</h2>
                                        {eventDetail && (
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${eventDetail.salesOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {eventDetail.salesOpen ? '🟢 Ventas Abiertas' : '🔴 Ventas Cerradas'}
                                            </span>
                                        )}
                                    </div>

                                    {loadingZones ? (
                                        <p className="text-gray-500 text-sm animate-pulse">Cargando zonas disponibles...</p>
                                    ) : (
                                        <>
                                            {/* 🌟 CANDADO 1: Si salesOpen es falso, los botones de zona NO SE RENDERIZAN */}
                                            {eventDetail && !eventDetail.salesOpen ? (
                                                <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
                                                    <svg className="w-8 h-8 text-red-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                                    <h3 className="font-bold text-red-800">Evento Cerrado</h3>
                                                    <p className="text-sm text-red-600 mt-1">No se pueden vender boletas. El organizador ha cerrado las ventas.</p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-2 gap-3">
                                                    {eventDetail?.zones?.map(zone => {
                                                        const isSoldOut = zone.availableQuantity <= 0;
                                                        return (
                                                            <button
                                                                key={zone.id}
                                                                disabled={isSoldOut}
                                                                onClick={() => {
                                                                    // Doble verificación al hacer clic por si acaso
                                                                    if (!isSoldOut && eventDetail?.salesOpen) {
                                                                        setSelectedZoneId(zone.id);
                                                                    }
                                                                }}
                                                                className={`p-3 rounded-xl border-2 text-left transition-all ${selectedZoneId === zone.id
                                                                    ? 'border-green-500 bg-green-50 shadow-sm'
                                                                    : isSoldOut
                                                                        ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                                                                        : 'border-gray-200 hover:border-green-200 bg-white'
                                                                    }`}
                                                            >
                                                                <p className="font-bold text-sm text-gray-800">{zone.zoneName}</p>
                                                                <p className="text-xs text-gray-500">${zone.price.toLocaleString()}</p>
                                                                <p className={`text-[10px] mt-1 font-bold ${!isSoldOut ? 'text-gray-400' : 'text-red-500'}`}>
                                                                    {!isSoldOut ? `Disp: ${zone.availableQuantity}` : 'AGOTADO'}
                                                                </p>
                                                            </button>
                                                        )
                                                    })}
                                                    {(!eventDetail?.zones || eventDetail.zones.length === 0) && (
                                                        <p className="text-gray-500 text-sm col-span-2">No hay zonas configuradas.</p>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: 7 Columnas */}
                    <div className="md:col-span-7">
                        {/* 🌟 CANDADO 2: El formulario SOLO aparece si hay evento, hay zona Y las ventas están abiertas */}
                        {selectedEvent && selectedZoneId && eventDetail?.salesOpen ? (
                            <PhysicalSaleForm
                                eventId={selectedEvent.id}
                                zoneId={selectedZoneId}
                                eventName={selectedEvent.name}
                            />
                        ) : (
                            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-200 text-center h-full flex flex-col justify-center items-center">
                                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                                {eventDetail && !eventDetail.salesOpen ? (
                                    <h3 className="text-xl font-bold text-red-400">Ventas cerradas para este evento</h3>
                                ) : (
                                    <h3 className="text-xl font-bold text-gray-400">Selecciona un evento y una zona para continuar con la venta</h3>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}