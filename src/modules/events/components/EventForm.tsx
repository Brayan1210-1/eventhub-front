import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { createEventSchema, type CreateEventFormData } from "../schema/createEventSchema";
import { useCreateEvent } from "../hooks/useCreateEvent";
import { usePlaceDetail } from "../../places/hooks/usePlaceDetail";
import { useSearchPlaces } from '../../places/hooks/useSearchPlaces'
import { useDebounce } from "@/core/hooks/useDebounce";

import { Input } from "@/design/atoms/input";

import { Button } from "@/design/atoms/button";
import { SearchBar } from "@/design/molecules/SearchBar";
import type { LocationList } from "@/modules/places/types/places.types";
import FormError from "@/design/molecules/FormError";
import { getApiErrorMessage } from "@/utils/errorController";

export function EventForm() {

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // Espera medio segundo
    const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);

    const { data: placesData } = useSearchPlaces(debouncedSearchTerm);

    const { data: placeDetail } = usePlaceDetail(selectedPlaceId);

    const createEventMutation = useCreateEvent();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors }
    } = useForm<CreateEventFormData>({
        resolver: zodResolver(createEventSchema),
    });


    const handleSelectPlace = (placeId: number) => {
        setSelectedPlaceId(placeId);
        setValue("placeId", placeId);
        setSearchTerm("");
    };

    const handleRemovePlace = () => {
        setSelectedPlaceId(null);
        setValue("placeId", 0);
    };

    const onSubmit = (data: CreateEventFormData) => {

        createEventMutation.mutate(data, {
            onSuccess: () => {
                navigate('/organizador/dashboard')
            },

            onError: (error: any) => {

                const backendMessage = getApiErrorMessage(error);

                setError("root", { type: "manual", message: backendMessage });

            }
        });
    };




    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md flex flex-col gap-8">



            <div>
                <h2 className="text-2xl font-bold text-gray-900">Crear Nuevo Evento</h2>
                <p className="text-gray-500">Configura los detalles básicos de tu evento.</p>
            </div>

            {/* --- SECCIÓN 1: SELECCIÓN DEL LUGAR --- */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">1. Ubicación</h3>

                {/* Mostramos el buscador SOLO si no ha seleccionado un lugar */}
                {!selectedPlaceId && (
                    <div className="relative">
                        <SearchBar
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            label="Buscar Lugar"
                            placeholder="Ej: Teatro Pablo Tobón..."
                        />

                        {/* La lista desplegable de resultados */}
                        {placesData?.content && placesData.content.length > 0 && searchTerm.length >= 1 && (
                            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1">
                                {placesData.content.map((place: LocationList) => (
                                    <div
                                        key={place.id}
                                        onClick={() => handleSelectPlace(place.id)}
                                        className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-0"
                                    >
                                        <p className="font-bold text-gray-800">{place.name}</p>
                                        <p className="text-xs text-gray-500">
                                            📍 {place.city} • 👥 Capacidad: {place.totalCapacityZones} Cantidad de zonas: {place.totalZones} capacidad disponible: {place.totalCapacityZones}
                                        </p>

                                    </div>
                                ))}
                            </div>
                        )}
                        {errors.placeId && <p className="text-sm text-red-500 mt-1">{errors.placeId.message}</p>}
                    </div>
                )}

                {/* La Mini-Tarjeta de Vista Previa (Se muestra cuando YA seleccionó uno) */}
                {selectedPlaceId && placeDetail && (
                    <div className="bg-white border border-blue-200 rounded-lg overflow-hidden flex shadow-sm relative">
                        <Button
                            type="button"
                            onClick={handleRemovePlace}
                            className="absolute top-2 right-2 bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-200"
                            title="Cambiar lugar"
                        >
                            ✕
                        </Button>

                        <div className="w-1/3 bg-gray-200">
                            <img src={placeDetail.imageUrl} alt={placeDetail.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="p-4 w-2/3 flex flex-col justify-center">
                            <h4 className="text-lg font-bold text-blue-900">{placeDetail.name}</h4>
                            <p className="text-sm text-gray-600">📍 {placeDetail.city}</p>
                            <p className="text-sm font-medium text-gray-800 mt-2">
                                👥 Aforo máximo: {placeDetail.totalCapacityZones} personas
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* --- SECCIÓN 2: DETALLES DEL EVENTO --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <Input
                        label="Nombre del Evento"
                        {...register("name")}
                        error={errors.name?.message}
                    />
                </div>

                <div className="md:col-span-2">
                    <Input
                        label="Descripción"
                        {...register("description")}
                        error={errors.description?.message}
                    />
                </div>

                <Input
                    label="Fecha del Evento"
                    type="date"
                    {...register("eventDate")}
                    error={errors.eventDate?.message}
                />

                <div className="flex gap-4">
                    <Input
                        label="Apertura Puertas"
                        type="time"
                        {...register("openingTime")}
                        error={errors.openingTime?.message}
                    />
                    <Input
                        label="Inicio Show"
                        type="time"
                        {...register("startTime")}
                        error={errors.startTime?.message}
                    />
                </div>

                <Input
                    label="Inicio de Ventas"
                    type="datetime-local"
                    {...register("salesStartDate")}
                    error={errors.salesStartDate?.message}
                />

                <Input
                    label="Fin de Ventas"
                    type="datetime-local"
                    {...register("salesEndDate")}
                    error={errors.salesEndDate?.message}
                />

                <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Categoría</label>
                    <select
                        {...register("category")}
                        className="w-full px-4 py-2.5 mt-1.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Selecciona una categoría...</option>
                        <option value="CONCIERTO">Concierto</option>
                        <option value="CONFERENCIA">Conferencia</option>
                        <option value="TEATRO">Teatro</option>
                        <option value="DEPORTIVO">Deportivo</option>
                        <option value="OTRO">Otro</option>
                    </select>
                    {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
                </div>

                <div className="md:col-span-2">
                    <Input
                        label="URL de la Imagen"
                        placeholder="https://..."
                        {...register("imageUrl")}
                        error={errors.imageUrl?.message}
                    />
                </div>
            </div>

            {/* BOTÓN DE GUARDAR */}
            <div className="flex flex-col gap-3 pt-6 mt-4 border-t border-gray-200">
                {/* Aquí sigue viviendo tu mensaje de error */}
                <FormError message={errors.root?.message} type="global" />

                <div className="flex justify-end gap-4">
                    {/* Botón para retroceder */}
                    <button
                        type="button" // MUY IMPORTANTE que sea type="button" y no "submit"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>

                    {/* Tu botón de guardar original */}
                    <Button
                        type="submit"
                        disabled={createEventMutation.isPending || !selectedPlaceId}
                    >
                        {createEventMutation.isPending ? "Guardando..." : "Crear Evento en Borrador"}
                    </Button>
                </div>
            </div>
        </form>
    );
}