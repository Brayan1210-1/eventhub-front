import { useState } from "react";
import { ZoneForm } from "./ZoneForm";
import { ConfirmModal } from "@/design/molecules/ConfirmModal";
import { useZonesByPlace, useDeleteZone } from "../hooks/zone.hooks";
import { Button } from '@/design/atoms/button'
import type { Zone } from "../types/zone.types";

interface PlaceBasicInfo {
    id: number;
    name: string;
    totalCapacity: number;
}

interface ZonesModalProps {
    place: PlaceBasicInfo;
    onClose: () => void;
}

export function ZonesModal({ place, onClose }: ZonesModalProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingZone, setEditingZone] = useState<Zone | null>(null);

    // 🌟 ESTADO NUEVO: Guarda el ID de la zona que se va a eliminar (si es null, el modal está cerrado)
    const [zoneToDelete, setZoneToDelete] = useState<number | null>(null);

    const { data, isLoading } = useZonesByPlace(place.id);
    const { mutate: deleteZone } = useDeleteZone(place.id);

    const zonas: Zone[] = data?.content || [];

    const capacidadOcupada = zonas.reduce((acc: number, zona: Zone) => acc + zona.capacity, 0);
    const capacidadDisponible = place.totalCapacity - capacidadOcupada;

    const handleAddNew = () => {
        setEditingZone(null);
        setIsFormOpen(true);
    };

    const handleEdit = (zona: Zone) => {
        setEditingZone(zona);
        setIsFormOpen(true);
    };

    // 🌟 AHORA EL BOTÓN DE BASURA SOLO ABRE EL MODAL
    const handleDeleteClick = (zonaId: number) => {
        setZoneToDelete(zonaId);
    };

    // 🌟 LA FUNCIÓN QUE SE EJECUTA SI DA CLIC EN "SÍ, ELIMINAR"
    const handleConfirmDelete = () => {
        if (zoneToDelete !== null) {
            deleteZone(zoneToDelete);
            setZoneToDelete(null); // Limpiamos el estado para que el modal se cierre
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-0 sm:p-4">
                <div className="bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl flex flex-col sm:rounded-xl shadow-2xl overflow-hidden transition-all">

                    <div className="bg-blue-900 text-white p-4 flex justify-between items-center shrink-0 shadow-md z-10">
                        <h2 className="text-lg sm:text-xl font-bold truncate pr-4">Zonas: {place.name}</h2>
                        <button onClick={onClose} className="text-white hover:text-red-400 font-bold text-3xl leading-none transition-colors">
                            &times;
                        </button>
                    </div>

                    <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between text-sm shrink-0 gap-1 sm:gap-0">
                        <p className="text-gray-700"><b>Capacidad Total:</b> {place.totalCapacity.toLocaleString()}</p>
                        <p className={`font-bold ${capacidadDisponible <= 0 && !editingZone ? 'text-red-600' : 'text-green-600'}`}>
                            Disponible: {capacidadDisponible.toLocaleString()}
                        </p>
                    </div>

                    <div className="p-4 sm:p-6 overflow-y-auto grow bg-white">
                        {isFormOpen ? (
                            <>
                                <h3 className="text-lg font-bold mb-4 border-b border-gray-100 pb-2 text-gray-800">
                                    {editingZone ? "Editar Zona" : "Añadir Nueva Zona"}
                                </h3>
                                <ZoneForm
                                    placeId={place.id}
                                    initialData={editingZone}
                                    onCancel={() => setIsFormOpen(false)}
                                    onSuccess={() => setIsFormOpen(false)}
                                />
                            </>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-gray-800">Zonas Actuales</h3>
                                    <Button
                                        onClick={handleAddNew}
                                        disabled={capacidadDisponible <= 0}
                                        className={`w-full sm:w-auto px-4 py-2.5 rounded text-sm text-white font-medium transition-colors ${capacidadDisponible <= 0
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 shadow-sm'
                                            }`}
                                    >
                                        + Añadir Zona
                                    </Button>
                                </div>

                                {isLoading ? (
                                    <p className="text-center py-8 text-gray-500 animate-pulse">Cargando localidades...</p>
                                ) : zonas.length === 0 ? (
                                    <p className="text-gray-500 text-sm text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                                        Aún no hay zonas configuradas en este lugar.
                                    </p>
                                ) : (
                                    <div className="border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
                                        <table className="w-full text-sm text-left text-gray-900 min-w-500px">
                                            <thead className="bg-gray-50 text-gray-700 border-b border-gray-200 font-semibold">
                                                <tr>
                                                    <th className="px-4 py-3">Nombre</th>
                                                    <th className="px-4 py-3">Capacidad</th>
                                                    <th className="px-4 py-3">Descripción</th>
                                                    <th className="px-4 py-3 text-center">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {zonas.map((zona: Zone) => (
                                                    <tr key={zona.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-4 py-3 font-semibold text-gray-900">{zona.name}</td>
                                                        <td className="px-4 py-3 text-gray-700">{zona.capacity.toLocaleString()}</td>
                                                        <td className="px-4 py-3 text-gray-500 truncate max-w-200px" title={zona.description}>
                                                            {zona.description}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center justify-center gap-3">
                                                                <button
                                                                    onClick={() => handleEdit(zona)}
                                                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                                                    title="Editar"
                                                                >
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteClick(zona.id)}
                                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                                    title="Eliminar"
                                                                >
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 🌟 AQUÍ LLAMAMOS A LA MOLÉCULA */}
            <ConfirmModal
                isOpen={zoneToDelete !== null}
                title="Eliminar Zona"
                message="¿Estás seguro de eliminar esta zona? Se perderán los datos asociados a la misma."
                confirmText="Sí, eliminar"
                onConfirm={handleConfirmDelete}
                onCancel={() => setZoneToDelete(null)}
            />
        </>
    );
}