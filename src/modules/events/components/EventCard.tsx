import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Event } from "../types/event.types";
import { Button } from "@/design/atoms/button";
import { useCancelEvent } from "../hooks/useCancelEvent";
import { usePublishEvent } from "../hooks/usePublishEvent";
import { getApiErrorMessage } from "@/utils/errorController";
import { PromptModal } from "@/design/molecules/TextAreaModal";
import { NotificationToast, type ToastType } from "@/design/molecules/NotificationToast";
import { QRScannerModal } from "./QRScannerModal";

interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    const navigate = useNavigate();
    const publishMutation = usePublishEvent();
    const cancelMutation = useCancelEvent();

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string, type: ToastType } | null>(null);
    const [isScannerOpen, setIsScannerOpen] = useState(false);


    const handlePublish = () => {
        publishMutation.mutate(event.id, {
            onError: (error: unknown) => {
                setToast({
                    message: getApiErrorMessage(error),
                    type: 'error'
                });
            },
            onSuccess: () => {
                setToast({
                    message: "Evento publicado con éxito",
                    type: 'success'
                });
            }
        });
    };

    // 🌟 AHORA RECIBE EL TEXTO DESDE EL MODAL
    const handleCancel = (reasonText: string) => {
        cancelMutation.mutate({ eventId: event.id, reason: reasonText }, {
            onSuccess: () => {
                setIsCancelModalOpen(false);
                setToast({
                    message: "Evento cancelado exitosamente",
                    type: 'success'
                });
            },
            onError: (error: unknown) => {
                setToast({
                    message: getApiErrorMessage(error),
                    type: 'error'
                });
            }
        });
    };

    const formatearFecha = (fecha: string) => {
        if (!fecha) return "Fecha no definida";
        const date = new Date(fecha);
        return date.toLocaleDateString('es-CO', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow relative">

            {!event.placeActive && event.status !== 'CANCELADO' && (
                <div className="absolute top-0 left-0 w-full bg-red-600 text-white text-xs font-bold text-center py-1.5 z-10 shadow-sm">
                    ⚠️ EL LUGAR YA NO ESTÁ DISPONIBLE
                </div>
            )}

            <div className={`h-48 bg-gray-200 relative ${!event.placeActive && event.status !== 'CANCELADO' ? 'mt-6' : ''}`}>
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

            {/* 🌟 Contenedor de Acciones Actualizado */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 mt-auto flex justify-end gap-2 items-center">

                {/* Botón de Cambio de Lugar */}
                {!event.placeActive && event.status !== 'CANCELADO' && (
                    <Button className="grow bg-red-600 hover:bg-red-700 text-sm py-1.5">
                        Cambiar Lugar
                    </Button>
                )}

                {event.status === 'PUBLICADO' && (
                    <Button
                        title="Validar Boletas"
                        onClick={() => setIsScannerOpen(true)}
                        className="p-2 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors focus:outline-none flex gap-2 items-center px-4 text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="5" height="5" rx="1" />
                            <rect x="16" y="3" width="5" height="5" rx="1" />
                            <rect x="3" y="16" width="5" height="5" rx="1" />
                            <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                            <path d="M21 21v.01" />
                            <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                            <path d="M3 12h.01" />
                            <path d="M12 3h.01" />
                            <path d="M12 16v.01" />
                            <path d="M16 12h1" />
                            <path d="M21 12v.01" />
                            <path d="M12 21v-1" />
                        </svg>
                        <span className="text-sm font-semibold">Validar</span>
                    </Button>
                )}

                {/* Botón Cancelar (Icono Tacho de Basura) */}
                {(event.status === 'BORRADOR' || event.status === 'PUBLICADO') && (
                    <Button
                        title="Cancelar Evento"
                        onClick={() => setIsCancelModalOpen(true)}
                        disabled={cancelMutation.isPending}
                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors focus:outline-none disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                    </Button>
                )}

                {event.status === 'BORRADOR' && (
                    <Button
                        title="Publicar Evento"
                        onClick={handlePublish}
                        disabled={publishMutation.isPending}
                        className="p-2 text-white bg-green-50 hover:bg-green-500 rounded-lg transition-colors focus:outline-none disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                        </svg>
                    </Button>
                )}

                {/* Botón de Configuración (Engranaje) - Solo en Borrador */}
                {event.status === 'BORRADOR' && (
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
                )}
            </div>

            <PromptModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={handleCancel}
                title="Cancelar Evento"
                message={
                    <p>Estás a punto de cancelar <strong>{event.name}</strong>. Esta acción no se puede deshacer y se notificará a los compradores para su reembolso.</p>
                }
                textareaLabel="Motivo de la cancelación"
                placeholder="Explica el motivo detalladamente..."
                confirmText="Confirmar Cancelación"
                cancelText="Volver"
                minLength={10}
                isPending={cancelMutation.isPending}
            />
            {/* 👇 EL NUEVO MODAL DEL ESCÁNER (Lo dejaremos comentado hasta que lo crees en el paso 4) */}
            {isScannerOpen && (
                <QRScannerModal
                    isOpen={isScannerOpen}
                    onClose={() => setIsScannerOpen(false)}
                    eventId={event.id}
                />
            )}

            {toast && (
                <NotificationToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}