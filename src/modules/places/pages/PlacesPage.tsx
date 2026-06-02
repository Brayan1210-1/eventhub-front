import { useState } from "react";
import { useLocations } from "../hooks/useLocations";
import { useLocationMutations } from "../hooks/useLocationMutation";
import { LocationCard } from "../components/LocationCard";
import { LocationForm } from "../components/LocationForm";
import { Button } from "@/design/atoms/button";
import { Card } from "@/design/atoms/card";
import type { Location } from "../types/places.types";
import type { PlaceFormData } from "../schemas/place.schema";
import { ZonesModal } from "@/modules/zones/Components/ZonesModal";
import { ConfirmModal } from "@/design/molecules/ConfirmModal";

export default function PlacesPage() {

    const [page, setPage] = useState(0);
    const size = 6;

    // Estados para controlar el flujo de la UI (Lista vs Formulario)
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    const { data, isLoading, isError } = useLocations(page, size);
    const { createLocation, updateLocation, deleteLocation, isCreating, isUpdating } = useLocationMutations();
    const [locationToDelete, setLocationToDelete] = useState<number | null>(null);
    const [placeForZones, setPlaceForZones] = useState<Location | null>(null);

    // Handlers para las acciones
    const handleCreateSubmit = async (formData: PlaceFormData) => {
        try {
            await createLocation(formData);
            setIsFormOpen(false);
        } catch (error) {
            console.error("Error al crear el lugar:", error);
        }
    };

    const handleUpdateSubmit = async (formData: PlaceFormData) => {
        if (!selectedLocation) return;
        try {
            await updateLocation({ id: selectedLocation.id, data: formData });
            setSelectedLocation(null);
        } catch (error) {
            console.error("Error al actualizar el lugar:", error);
        }
    };

    const handleDeleteClick = (id: number) => {
        setLocationToDelete(id);
    };

    //  Si le da "Sí, desactivar" en el modal, ejecutamos el hook
    const handleConfirmDelete = async () => {
        if (locationToDelete !== null) {
            try {
                await deleteLocation(locationToDelete);
            } catch (error) {
                console.error("Error al desactivar el lugar:", error);
            } finally {
                setLocationToDelete(null);
            }
        }
    };

    // Determinar si mostramos el formulario o el listado
    const isEditing = selectedLocation !== null;
    const showForm = isFormOpen || isEditing;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-400px">
                <p className="text-gray-500 animate-pulse font-medium">Cargando los lugares de EventHub...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <Card className="p-6 border-red-200 bg-red-50 text-center max-w-xl mx-auto mt-8">
                <h3 className="text-red-800 font-bold text-lg mb-2">Error de conexión</h3>
                <p className="text-red-600 text-sm">No pudimos cargar los lugares. Asegúrate de que el backend esté corriendo correctamente.</p>
            </Card>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">

            {/* Cabecera dinámica */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 bg-gray-50 border-8  rounded-2xl">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {showForm ? (isEditing ? "Editar Lugar" : "Nuevo Lugar") : "Gestión de Lugares"}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {showForm ? "Completa los campos para guardar el recurso." : "Administra las locaciones físicas disponibles para los eventos."}
                    </p>
                </div >

                {/* El botón de crear solo se muestra si estamos viendo la lista */}
                {
                    !showForm && (
                        <Button onClick={() => setIsFormOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                            ➕ Añadir Lugar
                        </Button>
                    )
                }
            </div >

            {/* RENDERIZADO CONDICIONAL: FORMULARIO vs LISTA */}
            {
                showForm ? (
                    <Card className="p-6 shadow-md max-w-3xl mx-auto w-full">
                        <LocationForm
                            // Mapeamos los datos para el modo edición (pasando la descripción vacía por defecto si el listado no la trae)
                            initialData={
                                selectedLocation
                                    ? {
                                        name: selectedLocation.name,
                                        city: selectedLocation.city,
                                        address: selectedLocation.address,
                                        totalCapacity: selectedLocation.totalCapacity,
                                        imageUrl: selectedLocation.imageUrl,
                                        description: selectedLocation.description,
                                    }
                                    : undefined
                            }
                            isLoading={isCreating || isUpdating}
                            onCancel={() => {
                                setIsFormOpen(false);
                                setSelectedLocation(null);
                            }}
                            onSubmit={isEditing ? handleUpdateSubmit : handleCreateSubmit}
                        />
                    </Card>
                ) : (
                    /* VISTA DEL LISTADO CON PAGINACIÓN */
                    <div className="flex flex-col gap-6">
                        {data?.content.length === 0 ? (
                            <div className="text-center py-12 text-gray-400">
                                No hay lugares registrados actualmente. ¡Crea el primero!
                            </div>
                        ) : (

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data?.content.map((location) => (
                                    <LocationCard
                                        key={location.id}
                                        location={location}
                                        onEdit={(loc) => setSelectedLocation(loc)}
                                        onDelete={handleDeleteClick}
                                        onManageZones={(loc) => setPlaceForZones(loc)}
                                    />
                                ))}
                            </div>
                        )}

                        {/* CONTROLES DE PAGINACIÓN  */}
                        {data?.meta && data.meta.totalPages > 1 && (
                            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
                                <span className="text-sm text-gray-600 bg-gray-100 rounded-xs p-2">
                                    Página <strong className="text-gray-900">{data.meta.currentPage + 1}</strong> de{" "}
                                    <strong className="text-gray-900">{data.meta.totalPages}</strong> ({data.meta.totalElements} lugares en total)
                                </span>

                                <div className="flex gap-2">
                                    <Button

                                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                                        disabled={!data.meta.hasPrevious}
                                        className="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                    >
                                        ◀ Anterior
                                    </Button>
                                    <Button

                                        onClick={() => setPage((prev) => prev + 1)}
                                        disabled={!data.meta.hasNext}
                                        className="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                    >
                                        Siguiente ▶
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
            {/* RENDERIZADO DEL MODAL DE ZONAS */}
            {
                placeForZones && (
                    <ZonesModal
                        place={{
                            id: placeForZones.id,
                            name: placeForZones.name,
                            totalCapacity: placeForZones.totalCapacity
                        }}
                        onClose={() => setPlaceForZones(null)}
                    />
                )
            }
            <ConfirmModal
                isOpen={locationToDelete !== null}
                title="Desactivar Lugar"
                message="¿Estás seguro de desactivar este lugar? No se podrán crear eventos nuevos aquí."
                confirmText="Sí, desactivar"
                onConfirm={handleConfirmDelete}
                onCancel={() => setLocationToDelete(null)}
            />

        </div >
    );
}