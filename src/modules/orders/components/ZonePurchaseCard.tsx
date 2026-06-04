import { useState } from "react";
import { Button } from "@/design/atoms/button";
import type { ZoneDetail } from "../../public/types/public.types";

interface Props {
    zone: ZoneDetail;
    salesOpen: boolean;
    isPending: boolean;
    onPurchase: (zoneId: number, quantity: number) => void;
}

export function ZonePurchaseCard({ zone, salesOpen, isPending, onPurchase }: Props) {
    const [quantity, setQuantity] = useState(1);

    // El máximo a comprar es 4, pero si quedan menos de 4 boletas, el límite es el stock real
    const maxAllowed = Math.min(4, zone.availableQuantity);
    const isSoldOut = zone.availableQuantity === 0;
    const canBuy = salesOpen && !isSoldOut;

    const formatoDinero = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    });

    const handleIncrement = () => setQuantity(prev => Math.min(prev + 1, maxAllowed));
    const handleDecrement = () => setQuantity(prev => Math.max(prev - 1, 1));

    return (
        <div className={`bg-white rounded-2xl p-6 border ${isSoldOut ? 'border-red-100 bg-red-50/30' : 'border-gray-200 shadow-sm'} flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-md`}>

            {/* Info de la Zona */}
            <div className="flex-1 text-center md:text-left">
                <h4 className="text-xl font-black text-gray-900 uppercase tracking-wide">{zone.zoneName}</h4>
                <p className="text-2xl font-bold text-blue-600 my-1">
                    {formatoDinero.format(zone.price)}
                </p>
                <p className={`text-sm font-medium ${isSoldOut ? 'text-red-500' : 'text-gray-500'}`}>
                    {isSoldOut ? 'Agotado' : `${zone.availableQuantity} boletas disponibles`}
                </p>
            </div>

            {/* Controles de Compra */}
            <div className="flex flex-col items-center gap-4 w-full md:w-auto">
                {canBuy ? (
                    <>
                        <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100">
                            <button
                                onClick={handleDecrement}
                                disabled={quantity <= 1 || isPending}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                            >-</button>
                            <span className="font-bold w-4 text-center">{quantity}</span>
                            <button
                                onClick={handleIncrement}
                                disabled={quantity >= maxAllowed || isPending}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                            >+</button>
                        </div>
                        <Button
                            onClick={() => onPurchase(zone.id, quantity)}
                            disabled={isPending}
                            className="w-full md:w-40 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isPending ? 'Procesando...' : 'Comprar'}
                        </Button>
                    </>
                ) : (
                    <div className="px-6 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl text-center w-full md:w-48">
                        {isSoldOut ? 'Sin stock' : 'Ventas cerradas'}
                    </div>
                )}
            </div>
        </div>
    );
}