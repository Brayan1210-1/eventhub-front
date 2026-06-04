import { useEffect, useState } from "react";
import { usePublicEvents } from "../hooks/usePublicEvents";
import type { EventFilters, PublicEvent } from "../types/public.types";
import { PublicEventCard } from "../components/PublicEventCard";
import { Input } from "@/design/atoms/input";
import { useDebounce } from "@/core/hooks/useDebounce";
import { SearchBar } from "@/design/molecules/SearchBar";
import type { EventCategory } from "@/modules/events/types/event.types";
import { NotificationToast, type ToastType } from "@/design/molecules/NotificationToast";
import { getApiErrorMessage } from "@/utils/errorController";
import { CardSkeleton } from "@/design/atoms/CardSkeleton";

const CATEGORIES: EventCategory[] = [
    'CONCIERTO',
    'CONFERENCIA',
    'TEATRO',
    'DEPORTIVO',
    'OTRO'
];


export function PublicEventsPage() {

    const [toast, setToast] = useState<{ message: string, type: ToastType } | null>(null);






    const [filters, setFilters] = useState<EventFilters>({});
    const [page, setPage] = useState(0);

    const debouncedFilters = useDebounce(filters, 500);
    const { data, isFetching, isError, error } = usePublicEvents(debouncedFilters, page);

    useEffect(() => {
        if (isError && error) {
            setToast({
                message: getApiErrorMessage(error),
                type: 'error'
            });
        }
    }, [isError, error]);

    const handleFilterChange = (key: keyof EventFilters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(0);
    };

    const renderSkeletons = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section & Buscador */}
            <div className="bg-blue-900 text-white pt-16 pb-24 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                    Descubre tu próximo gran evento
                </h1>
                <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
                    Explora conciertos, obras de teatro, eventos académicos y más.
                </p>

                {/* Barra de Filtros */}
                <div className="bg-white p-5 rounded-2xl shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-end text-left text-gray-800">

                    <div className="w-full md:w-1/4">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Categoría</label>
                        <select
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm h-42px"
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            value={filters.category || ""}
                        >
                            <option value="">Todas</option>
                            {/* Iteramos sobre el array tipado */}
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="w-full md:w-1/4">
                        <SearchBar
                            label="Ciudad"
                            placeholder="Ej. Medellín..."
                            searchTerm={filters.city || ""}
                            onSearchChange={(value) => handleFilterChange('city', value)}
                        />
                    </div>

                    <div className="w-full md:w-1/4">
                        <Input
                            type="date"
                            label="Desde"
                            onChange={(e) => handleFilterChange('startingDate', e.target.value)}
                            value={filters.startingDate || ""}
                        />
                    </div>

                    <div className="w-full md:w-1/4">
                        <Input
                            type="date"
                            label="Hasta"
                            onChange={(e) => handleFilterChange('endDate', e.target.value)}
                            value={filters.endDate || ""}
                        />
                    </div>
                </div>
            </div>
            {/* Grid de Resultados (Queda igual, usando el data.content del hook) */}
            <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
                {isFetching && renderSkeletons()}

                {isError && (
                    <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200 text-center font-medium shadow-sm">
                        No pudimos cargar el catálogo. Intenta de nuevo más tarde.
                    </div>
                )}

                {!isFetching && !isError && data?.content && (
                    <>
                        {data.content.length === 0 ? (
                            <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                                <span className="text-5xl mb-4 block">🔍</span>
                                <h3 className="text-xl font-bold text-gray-800">No encontramos eventos</h3>
                                <p className="text-gray-500 mt-2">Intenta ajustar tus filtros de búsqueda o prueba con otra ciudad.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {data.content.map((evento: PublicEvent) => (
                                    <PublicEventCard key={evento.id} event={evento} />
                                ))}
                            </div>
                        )}

                        {/* Controles de Paginación */}
                        {data.meta && data.meta.totalPages > 1 && (
                            <div className="flex justify-center gap-4 mt-12">
                                <button
                                    onClick={() => setPage(old => Math.max(old - 1, 0))}
                                    disabled={page === 0}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Anterior
                                </button>
                                <span className="flex items-center text-gray-500 font-medium">
                                    Página {page + 1} de {data.meta.totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(old => old + 1)}
                                    disabled={page >= data.meta.totalPages - 1}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

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