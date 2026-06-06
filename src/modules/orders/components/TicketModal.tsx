import { QRCode } from "react-qr-code";
import { useOrderDetail } from "../hooks/useOrderQueries";

interface TicketModalProps {
    isOpen: boolean;
    orderId: string | null;
    onClose: () => void;
}

export function TicketModal({ isOpen, orderId, onClose }: TicketModalProps) {
    // Si no hay orderId, no disparamos la petición
    const { data: order, isLoading } = useOrderDetail(isOpen && orderId ? orderId : "");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-100 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl relative shadow-2xl">

                {/* Botón de cerrar flotante */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                {isLoading ? (
                    <div className="p-12 text-center text-gray-500 font-bold">Generando tus boletas...</div>
                ) : !order ? (
                    <div className="p-12 text-center text-red-500 font-bold">Error cargando las boletas.</div>
                ) : (
                    <div className="p-6 space-y-6">
                        <div className="text-center mb-2">
                            <h2 className="text-2xl font-black text-gray-800">Tus Entradas</h2>
                            <p className="text-sm text-gray-500">Muestra este código en la puerta</p>
                        </div>

                        {/* Iteramos sobre los tickets de la orden */}
                        {order.tickets?.map((ticket, index) => (
                            <div key={ticket.ticketId || index} className="bg-white rounded-2xl flex flex-col shadow-sm overflow-hidden border border-gray-200 relative">

                                {/* Decoración de boleta (círculos laterales) */}
                                <div className="absolute top-26 -left-4 w-8 h-8 bg-gray-100 rounded-full border-r border-gray-200"></div>

                                <div className="absolute top-26 -right-4 w-8 h-8 bg-gray-100 rounded-full border-l border-gray-200"></div>

                                {/* Cabecera de la boleta */}
                                <div className="bg-blue-900 text-white p-5 text-center">
                                    <span className="uppercase text-[10px] font-bold tracking-widest text-blue-300">Ticket {index + 1} de {order.ticketQuantity}</span>
                                    <h3 className="text-xl font-black mt-1 leading-tight">{order.eventName}</h3>
                                    <p className="text-sm text-blue-200 mt-1">{order.eventDate}</p>
                                </div>

                                {/* Cuerpo central con el QR */}
                                <div className="p-8 flex flex-col items-center justify-center border-b-2 border-dashed border-gray-200 bg-white">
                                    <div className="p-3 bg-white border rounded-xl shadow-sm">
                                        {<QRCode
                                            value={ticket.code || "CODIGO-PENDIENTE"}
                                            size={160}
                                            level="H" // Alta corrección de errores para escáneres
                                        />}
                                    </div>
                                    <p className="mt-4 font-mono text-xs text-gray-400 tracking-widest">
                                        {ticket.code || "Generando código..."}
                                    </p>
                                </div>

                                {/* Pie de la boleta */}
                                <div className="p-4 bg-gray-50 flex justify-between items-center px-6">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">Ubicación</p>
                                        <p className="font-black text-gray-800">{ticket.zoneName}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 uppercase font-bold">Estado</p>
                                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md">
                                            {ticket.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}