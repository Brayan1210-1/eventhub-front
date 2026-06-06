import { useState } from "react";
import { useGeneralReport } from "../hooks/useGeneralReports";

export function AdminDashboard() {

    const [activeTab, setActiveTab] = useState<'report' | 'users'>('report');

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const { data: report, isLoading, isError } = useGeneralReport({
        fechaInicio,
        fechaFin
    });

    // Helper para formatear dinero
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
    };

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-8">

            {/* Encabezado: Le damos un fondo oscuro para diferenciarlo claramente del dashboard del organizador */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-gray-900 text-white p-6 md:p-8 rounded-2xl shadow-lg">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Panel de Administrador</h1>
                    <p className="text-gray-300 mt-2 font-medium">Supervisa el rendimiento financiero de la plataforma y gestiona los accesos.</p>
                </div>
            </div>

            {/* Menú de Pestañas estilo Píldora */}
            <div className="flex mb-8 bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 w-full md:w-max overflow-x-auto">
                <button
                    className={`flex-1 md:flex-none py-2.5 px-6 font-bold text-sm transition-all rounded-lg whitespace-nowrap ${activeTab === 'report'
                        ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                        : 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                    onClick={() => setActiveTab('report')}
                >
                    📊 Reporte General
                </button>
                <button
                    className={`flex-1 md:flex-none py-2.5 px-6 font-bold text-sm transition-all rounded-lg whitespace-nowrap ${activeTab === 'users'
                        ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                        : 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                    onClick={() => setActiveTab('users')}
                >
                    👥 Gestión de Usuarios
                </button>
            </div>

            {/* =========================================
                VISTA 1: REPORTE GENERAL
            ========================================= */}
            {activeTab === 'report' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 min-h-125">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Métricas Globales de Ventas</h2>
                        <p className="text-sm text-gray-500">Selecciona un rango de fechas para consultar todas las transacciones exitosas.</p>
                    </div>

                    {/* Filtros de Fecha */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100 items-end">
                        <div className="flex flex-col gap-1 w-full md:w-auto grow md:grow-0">
                            <label className="text-xs font-bold text-gray-600 uppercase">Fecha Inicio</label>
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full"
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-full md:w-auto grow md:grow-0">
                            <label className="text-xs font-bold text-gray-600 uppercase">Fecha Fin</label>
                            <input
                                type="date"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full"
                            />
                        </div>
                    </div>

                    {/* Resultados Dinámicos */}
                    {!fechaInicio || !fechaFin ? (
                        <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                            <p className="text-gray-500 font-medium">Selecciona una fecha de inicio y fin para calcular el reporte.</p>
                        </div>
                    ) : isLoading ? (
                        <div className="flex flex-col items-center justify-center h-48 gap-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600"></div>
                            <p className="text-gray-500 font-medium">Procesando registros de la base de datos...</p>
                        </div>
                    ) : isError ? (
                        <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100">
                            <h3 className="font-bold text-lg">Ocurrió un error</h3>
                            <p>Verifica que la fecha de inicio no sea mayor a la fecha de fin o intenta nuevamente.</p>
                        </div>
                    ) : report ? (
                        <div className="space-y-8 animate-in fade-in duration-300">

                            {/* Tarjetas de Resumen Financiero */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col justify-center">
                                    <p className="text-xs font-bold text-blue-600 uppercase mb-2">Ingresos Brutos</p>
                                    <p className="text-3xl font-black text-blue-900">{formatCurrency(report.totalRevenue)}</p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex flex-col justify-center">
                                    <p className="text-xs font-bold text-green-600 uppercase mb-2">Boletas Vendidas</p>
                                    <p className="text-3xl font-black text-green-900">{report.totalTicketsSold}</p>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex flex-col justify-center">
                                    <p className="text-xs font-bold text-purple-600 uppercase mb-2">Órdenes Pagadas</p>
                                    <p className="text-3xl font-black text-purple-900">{report.totalOrders}</p>
                                </div>
                            </div>

                            {/* Widgets de Tablas Analíticas */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                {/* Top 5 Eventos */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col">
                                    <div className="bg-gray-50 p-4 border-b border-gray-200">
                                        <h3 className="font-bold text-gray-800">🏆 Top 5 Eventos con más Ingresos</h3>
                                    </div>
                                    <ul className="divide-y divide-gray-100 grow">
                                        {report.topEvents.map((event, index) => (
                                            <li key={index} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-black ${index === 0 ? 'bg-yellow-100 text-yellow-700' : index === 1 ? 'bg-gray-200 text-gray-700' : index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-600'}`}>
                                                        #{index + 1}
                                                    </span>
                                                    <span className="font-bold text-gray-900 line-clamp-1">{event.eventName}</span>
                                                </div>
                                                <div className="text-right ml-4">
                                                    <p className="font-black text-green-700">{formatCurrency(event.revenue)}</p>
                                                    <p className="text-xs text-gray-500 font-bold">{event.ticketsSold} boletas</p>
                                                </div>
                                            </li>
                                        ))}
                                        {report.topEvents.length === 0 && (
                                            <li className="p-8 text-center text-gray-500 font-medium">No se registraron ventas de eventos en este período.</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Desglose por Categoría */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col">
                                    <div className="bg-gray-50 p-4 border-b border-gray-200">
                                        <h3 className="font-bold text-gray-800">📊 Rendimiento por Categoría</h3>
                                    </div>
                                    <ul className="divide-y divide-gray-100 grow">
                                        {report.categoryBreakdown.map((cat, index) => (
                                            <li key={index} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                                <span className="font-bold text-gray-600 uppercase text-xs tracking-wider bg-gray-100 px-3 py-1 rounded-md">{cat.category}</span>
                                                <div className="text-right">
                                                    <p className="font-black text-green-700">{formatCurrency(cat.revenue)}</p>
                                                    <p className="text-xs text-gray-500 font-bold">{cat.ticketsSold} boletas</p>
                                                </div>
                                            </li>
                                        ))}
                                        {report.categoryBreakdown.length === 0 && (
                                            <li className="p-8 text-center text-gray-500 font-medium">No hay datos de categorías en este período.</li>
                                        )}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    ) : null}
                </div>
            )}

            {/* =========================================
                VISTA 2: GESTIÓN DE USUARIOS (EN CONSTRUCCIÓN)
            ========================================= */}
            {activeTab === 'users' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center justify-center min-h-125 animate-in fade-in zoom-in duration-300">
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-3">Gestión de Accesos</h2>
                    <p className="text-gray-500 max-w-lg text-lg">
                        Pronto podrás crear cuentas manuales, asignar roles (<span className="font-bold text-gray-700">Organizador, Vendedor, Validador</span>) y auditar a los usuarios de la plataforma desde aquí.
                    </p>
                </div>
            )}

        </div>
    );
}