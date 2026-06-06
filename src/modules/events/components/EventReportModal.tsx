import { useEventReport } from "../hooks/useEventReport";
import { Button } from "@/design/atoms/button";

interface EventReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: number;
}

export function EventReportModal({ isOpen, onClose, eventId }: EventReportModalProps) {
    // El hook se dispara automáticamente al montarse el componente
    const { data: report, isLoading, isError } = useEventReport(eventId);

    if (!isOpen) return null;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden relative">

                {/* Cabecera */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                            Reporte del Evento
                        </h2>
                        {report && (
                            <p className="text-sm font-semibold text-purple-600 mt-1">
                                {report.eventName}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Contenido (Scrollable) */}
                <div className="p-6 overflow-y-auto flex-grow">

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-64 gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600"></div>
                            <p className="text-gray-500 font-medium">Calculando estadísticas...</p>
                        </div>
                    ) : isError ? (
                        <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100">
                            <h3 className="font-bold text-lg mb-2">Error de conexión</h3>
                            <p>No se pudo cargar el reporte de este evento. Intenta nuevamente.</p>
                        </div>
                    ) : report ? (
                        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">

                            {/* Grid de Métricas Generales */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                                    <p className="text-xs font-bold text-purple-600 uppercase mb-1">Ingresos Totales</p>
                                    <p className="text-xl md:text-2xl font-black text-purple-900">
                                        {formatCurrency(report.totalRevenue)}
                                    </p>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                                    <p className="text-xs font-bold text-blue-600 uppercase mb-1">Boletas Vendidas</p>
                                    <p className="text-xl md:text-2xl font-black text-blue-900">
                                        {report.totalTicketsSold}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Disponibles</p>
                                    <p className="text-xl md:text-2xl font-black text-gray-700">
                                        {report.totalTicketsRemaining}
                                    </p>
                                </div>

                                {/* Solo se muestra si el backend envía totalAttendees (evento ya pasó) */}
                                {report.totalAttendees !== undefined && report.totalAttendees !== null && (
                                    <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                                        <p className="text-xs font-bold text-green-600 uppercase mb-1">Asistentes Reales</p>
                                        <p className="text-xl md:text-2xl font-black text-green-900">
                                            {report.totalAttendees}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Tabla de Desglose por Zonas */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                    Desglose por Localidad
                                </h3>

                                <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase font-bold">
                                            <tr>
                                                <th className="px-4 py-3">Zona</th>
                                                <th className="px-4 py-3 text-center">Vendidas</th>
                                                <th className="px-4 py-3 text-center hidden sm:table-cell">Restantes</th>
                                                <th className="px-4 py-3 text-right">Recaudado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {report.zoneReports.map((zone, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3 font-semibold text-gray-900">{zone.zoneName}</td>
                                                    <td className="px-4 py-3 text-center text-blue-600 font-bold">{zone.ticketsSold}</td>
                                                    <td className="px-4 py-3 text-center text-gray-500 hidden sm:table-cell">{zone.ticketsRemaining}</td>
                                                    <td className="px-4 py-3 text-right font-bold text-purple-700">{formatCurrency(zone.revenue)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : null}

                </div>

                {/* Pie del modal */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <Button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2">
                        Cerrar Reporte
                    </Button>
                </div>
            </div>
        </div>
    );
}