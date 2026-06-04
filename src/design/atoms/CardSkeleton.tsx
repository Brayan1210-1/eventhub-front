export function CardSkeleton() {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-420px animate-pulse">
            {/* Imagen Skeleton (Gris claro) */}
            <div className="h-56 bg-gray-200 w-full" />

            <div className="p-6 grow flex flex-col gap-4">
                {/* Fecha Skeleton */}
                <div className="h-4 bg-gray-200 rounded-md w-1/3" />

                {/* Título Skeleton (Dos líneas) */}
                <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded-md w-full" />
                    <div className="h-6 bg-gray-200 rounded-md w-4/5" />
                </div>

                {/* Lugar y Ciudad Skeleton */}
                <div className="h-4 bg-gray-200 rounded-md w-2/3 mt-2" />

                {/* Footer (Precios y Botón) Skeleton */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded-md w-16" />
                        <div className="h-7 bg-gray-200 rounded-md w-24" />
                    </div>
                    {/* El cuadrito del ícono de flecha */}
                    <div className="h-10 w-10 bg-gray-200 rounded-xl shrink-0" />
                </div>
            </div>
        </div>
    );
}