import { useState } from "react";
import { useOrganizerSalesHistory } from "../hooks/useOrderQueries";
import type { OrderStatus } from "../types/orders.type";
import { Button } from "@/design/atoms/button";

export function SalesHistoryTab() {
    const [page, setPage] = useState(0);
    const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
    const [dateFilter, setDateFilter] = useState<string>("");

    const { data, isLoading, isError } = useOrganizerSalesHistory({
        page,
        size: 10,
        status: statusFilter === "" ? null : statusFilter,
        purchaseDate: dateFilter === "" ? null : dateFilter,
    });

    const handleClearFilters = () => {
        setStatusFilter("");
        setDateFilter("");
        setPage(0);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 flex flex-col min-h-125">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Historial de Ventas</h2>
                    <p className="text-sm text-gray-500">Monitorea los ingresos y boletas de todos tus eventos.</p>
                </div>
            </div>

            {/* Barra de Filtros (Sin el ID del Evento) */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100 items-end">
                <div className="flex flex-col gap-1 w-full md:w-auto grow md:grow-0">
                    <label className="text-xs font-bold text-gray-600 uppercase">Estado</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value as OrderStatus | ""); setPage(0); }}
                        className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none w-full"
                    >
                        <option value="">Todos los estados</option>
                        <option value="PAGADA">PAGADA</option>
                        <option value="PENDIENTE">PENDIENTE</option>
                        <option value="CANCELADA">CANCELADA</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1 w-full md:w-auto grow md:grow-0">
                    <label className="text-xs font-bold text-gray-600 uppercase">Fecha de Compra</label>
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => { setDateFilter(e.target.value); setPage(0); }}
                        className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full"
                    />
                </div>

                <Button
                    onClick={handleClearFilters}
                    className="w-full md:w-auto md:ml-auto bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm py-2.5 px-4"
                >
                    Limpiar Filtros
                </Button>
            </div>

            {/* Tabla de Resultados Responsiva */}
            <div className="rounded-xl border border-gray-200 grow bg-white overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600 block md:table">
                    <thead className="hidden md:table-header-group bg-gray-50 border-b border-gray-200 text-gray-900">
                        <tr>
                            <th className="p-4 font-semibold uppercase text-xs tracking-wider">Fecha</th>
                            <th className="p-4 font-semibold uppercase text-xs tracking-wider">Evento</th>
                            <th className="p-4 font-semibold uppercase text-xs tracking-wider">Comprador</th>
                            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-center">Boletas</th>
                            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-right">Monto</th>
                            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-center">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 md:divide-gray-100 block md:table-row-group">
                        {isLoading ? (
                            <tr className="block md:table-row">
                                <td colSpan={6} className="p-8 text-center text-gray-400 block md:table-cell">Cargando ventas...</td>
                            </tr>
                        ) : isError ? (
                            <tr className="block md:table-row">
                                <td colSpan={6} className="p-8 text-center text-red-500 block md:table-cell">Error al cargar el historial.</td>
                            </tr>
                        ) : data?.content.length === 0 ? (
                            <tr className="block md:table-row">
                                <td colSpan={6} className="p-8 text-center text-gray-500 block md:table-cell">No se encontraron órdenes con estos filtros.</td>
                            </tr>
                        ) : (
                            data?.content.map((order) => (
                                <tr key={order.orderId} className="block md:table-row hover:bg-gray-50 transition-colors p-4 md:p-0">

                                    <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none border-gray-100">
                                        <span className="md:hidden font-bold text-gray-500 text-xs uppercase">Fecha</span>
                                        <span className="text-right">{order.purchaseDate}</span>
                                    </td>

                                    <td className="flex justify-between items-center md:table-cell p-2 md:p-4 font-medium text-gray-900 border-b md:border-none border-gray-100">
                                        <span className="md:hidden font-bold text-gray-500 text-xs uppercase">Evento</span>
                                        <span className="text-right md:text-left">{order.eventName}</span>
                                    </td>

                                    <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none border-gray-100">
                                        <span className="md:hidden font-bold text-gray-500 text-xs uppercase">Comprador</span>
                                        <span className="text-right md:text-left">{order.buyerName}</span>
                                    </td>

                                    <td className="flex justify-between items-center md:table-cell p-2 md:p-4 text-center md:text-center font-bold text-gray-700 border-b md:border-none border-gray-100">
                                        <span className="md:hidden font-bold text-gray-500 text-xs uppercase">Boletas</span>
                                        <span className="text-right">{order.quantity}</span>
                                    </td>

                                    <td className="flex justify-between items-center md:table-cell p-2 md:p-4 text-right md:text-right font-black text-green-700 border-b md:border-none border-gray-100">
                                        <span className="md:hidden font-bold text-gray-500 text-xs uppercase">Monto</span>
                                        <span className="text-right">{formatCurrency(order.totalAmount)}</span>
                                    </td>

                                    <td className="flex justify-between items-center md:table-cell p-2 md:p-4 text-center md:text-center">
                                        <span className="md:hidden font-bold text-gray-500 text-xs uppercase">Estado</span>
                                        <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-md ${order.status === 'PAGADA' ? 'bg-green-100 text-green-800' :
                                            order.status === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            {data && data.meta.totalPages > 1 && (
                <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-100 gap-4">
                    <span className="text-sm text-gray-500">
                        Página {data.meta.currentPage + 1} de {data.meta.totalPages}
                    </span>
                    <div className="flex gap-2 w-full md:w-auto justify-center">
                        <Button
                            disabled={!data.meta.hasPrevious}
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            className="px-4 py-2 grow md:grow-0 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm disabled:opacity-50"
                        >
                            Anterior
                        </Button>
                        <Button
                            disabled={!data.meta.hasNext}
                            onClick={() => setPage(p => p + 1)}
                            className="px-4 py-2 grow md:grow-0 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm disabled:opacity-50"
                        >
                            Siguiente
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}