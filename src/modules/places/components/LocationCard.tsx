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




            <div className="p-4 border-t border-gray-100 flex-col gap-2">
                <div className="flex gap-2">
                    <Button
                        className="flex-1 bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors"
                        onClick={() => onEdit(location)}

                    >
                        Editar
                    </Button>
                    <Button
                        // Si ya está inactivo, deshabilitamos el botón y cambiamos el estilo
                        disabled={!location.active}
                        className={`flex-1 ${location.active ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        onClick={() => onDelete(location.id)}
                    >
                        {location.active ? 'Desactivar' : 'Desactivado'}
                    </Button>
                </div>

                <Button
                    className="w-full bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors"
                    onClick={() => onManageZones(location)}
                >
                    Gestionar Zonas
                </Button>
            </div>
        </Card>
    );
}