
import type { MyOrderDTO, OrderStatus } from "../types/orders.type";

interface Props {
    order: MyOrderDTO;
    onClick: () => void;
}

export function OrderCard({ order, onClick }: Props) {


    const renderStatusBadge = (status: OrderStatus) => {
        const styles = {
            PAGADA: "bg-green-100 text-green-700 border-green-200",
            PENDIENTE: "bg-yellow-100 text-yellow-700 border-yellow-200",
            CANCELADA: "bg-red-100 text-red-700 border-red-200",
            REEMBOLSADA: "bg-gray-100 text-gray-700 border-gray-200"
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${styles[status]}`}>
                {status}
            </span>
        );
    };

    const formatearFecha = (fecha: string) => {
        return new Date(fecha).toLocaleDateString('es-CO', {
            weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <div
            onClick={onClick}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
        >
            <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 font-mono">#{order.orderId.substring(0, 8)}...</span>
                    {renderStatusBadge(order.orderStatus)}
                </div>
                <h3 className="text-xl font-black text-gray-900 truncate">
                    {order.eventName}
                </h3>
                <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {formatearFecha(order.eventDate)}
                </p>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                className="w-full md:w-auto px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
                Ver Detalle
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </div>

    );
}