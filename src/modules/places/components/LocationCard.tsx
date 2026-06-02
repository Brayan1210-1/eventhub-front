import { Card } from "@/design/atoms/card";
import { Button } from "@/design/atoms/button";
import type { Location } from "../types/places.types";

interface LocationCardProps {
    location: Location;
    onEdit: (location: Location) => void;
    onDelete: (id: number) => void;
    onManageZones: (location: Location) => void;
}

export function LocationCard({ location, onEdit, onDelete, onManageZones }: LocationCardProps) {

    return (
        <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow">

            <div className="h-48 w-full bg-gray-200 relative">
                <img
                    src={location.imageUrl}
                    alt={location.name}
                    className="h-full w-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x200' }}
                />

                <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded text-white ${location.active ? 'bg-green-500' : 'bg-red-500'}`}>
                    {location.active ? 'Activo' : 'Inactivo'}
                </div>
            </div>

            {/* Cuerpo de la tarjeta */}
            <div className="p-4 grow flex flex-col gap-2">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{location.name}</h3>
                <div className="text-sm text-gray-600 flex flex-col gap-1">
                    <p>📍 {location.city} - {location.address}</p>
                    <p>👥 Capacidad: {location.totalCapacity.toLocaleString()} personas</p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {location.description || "Sin descripción disponible."}
                    </p>
                </div>
            </div>

            {/* 🌟 BOTONERA MINIMALISTA CON ÍCONOS COMPATIBLE CON TU CÓDIGO */}
            <div className="p-4 border-t border-gray-100 flex gap-2 bg-gray-50/50">

                {/* Botón Editar (Lápiz) */}
                <Button
                    className="flex-1 flex justify-center items-center bg-white border border-gray-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors py-2"
                    onClick={() => onEdit(location)}
                    title="Editar Lugar"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </Button>

                {/* Botón Zonas (Mapa/Ubicación) */}
                <Button
                    className="flex-1 flex justify-center items-center bg-white border border-gray-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors py-2"
                    onClick={() => onManageZones(location)}
                    title="Gestionar Zonas"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                </Button>

                {/* Botón Eliminar (Basura) */}
                <Button
                    disabled={!location.active}
                    className={`flex-1 flex justify-center items-center py-2 transition-colors ${location.active
                            ? 'bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200'
                            : 'bg-gray-100 border border-gray-100 text-gray-300 cursor-not-allowed'
                        }`}
                    onClick={() => onDelete(location.id)}
                    title={location.active ? "Desactivar Lugar" : "Lugar Desactivado"}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </Button>
            </div>
        </Card>
    );
}