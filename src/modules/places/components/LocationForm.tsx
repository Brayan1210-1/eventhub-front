import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlaceSchema, type PlaceFormData } from "../schemas/place.schema";
import { Input } from "@/design/atoms/input";
import { Button } from "@/design/atoms/button";
import { TextArea } from "@/design/atoms/textarea";

interface LocationFormProps {
    initialData?: PlaceFormData;
    onSubmit: (data: PlaceFormData) => void;
    isLoading?: boolean;
    onCancel: () => void;
}

export function LocationForm({ initialData, onSubmit, isLoading, onCancel }: LocationFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<PlaceFormData>({
        resolver: zodResolver(PlaceSchema),
        defaultValues: initialData || {
            name: "",
            address: "",
            city: "",
            totalCapacity: 0,
            description: "",
            imageUrl: "",
        },
    });

    const imageUrl = watch("imageUrl");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Nombre del Lugar"
                    placeholder="Ej: Teatro Metropolitano"
                    className="bg-gray-100"
                    {...register("name")}
                    error={errors.name?.message}
                />
                <Input
                    label="Ciudad"
                    placeholder="Ej: Medellín"
                    {...register("city")}
                    className="bg-gray-100"
                    error={errors.city?.message}
                />
                <Input
                    label="Dirección"
                    placeholder="Ej: Calle 123 # 45-67"
                    className="bg-gray-100"
                    {...register("address")}
                    error={errors.address?.message}
                />
                <Input
                    type="number"
                    label="Capacidad Total"
                    placeholder="Ej: 1500"
                    className="bg-gray-100"
                    {...register("totalCapacity")}
                    error={errors.totalCapacity?.message}
                />
            </div>

            <TextArea
                label="Descripción"
                placeholder="Describe las facilidades, acústica, parqueaderos..."
                className="bg-gray-100"
                {...register("description")}
                error={errors.description?.message}
            />

            {/* Sección de Imagen con Previsualización */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1 w-full">
                    <Input
                        label="URL de la Imagen"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        {...register("imageUrl")}
                        error={errors.imageUrl?.message}
                        className="bg-gray-100"
                    />
                </div>

                {/* Cuadro de previsualización */}
                <div className="w-full md:w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 shrink-0">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            // Fallback si la URL que pegaron no es una imagen válida
                            onError={(e) => {
                                e.currentTarget.src = "https://placehold.co/400x200";
                            }}
                        />
                    ) : (
                        <span className="text-xs text-gray-400 text-center px-2">Sin imagen</span>
                    )}
                </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
                <Button
                    type="button"
                    className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors "
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
                <Button type="submit" disabled={isLoading} className="text-white">
                    {isLoading ? "Guardando..." : initialData ? "Actualizar Lugar" : "Crear Lugar"}
                </Button>
            </div>
        </form >
    );
}