import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZoneSchema, type ZoneFormData } from "../schemas/zone.schema";
import { Input } from "@/design/atoms/input";
import { TextArea } from "@/design/atoms/textarea";
import { Button } from "@/design/atoms/button";
import { FormError } from "@/design/molecules/FormError";
import { getApiErrorMessage } from "@/utils/errorController";
import { useCreateZone, useUpdateZone } from "../hooks/zone.hooks";
import type { Zone } from "../types/zone.types";
interface ZoneFormProps {
    placeId: number;
    initialData?: Zone | null;
    onCancel: () => void;
    onSuccess: () => void;
}

export function ZoneForm({ placeId, initialData, onCancel, onSuccess }: ZoneFormProps) {

    const { mutate: createZone, isPending: isCreating } = useCreateZone(placeId);

    const { mutate: updateZone, isPending: isUpdating } = useUpdateZone(placeId, initialData?.id || 0);

    const isEditing = !!initialData;
    const isPending = isCreating || isUpdating;

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ZoneFormData>({
        resolver: zodResolver(ZoneSchema),

        defaultValues: {
            name: initialData?.name || "",
            capacity: initialData?.capacity || 0,
            description: initialData?.description || ""
        }
    });

    const onSubmit = handleSubmit((data) => {
        const zoneData: ZoneFormData = {
            name: data.name,
            description: data.description,
            capacity: data.capacity,
        };

        // Decidimos cuál función ejecutar dependiendo de si estamos editando o creando
        const actionMutate = isEditing ? updateZone : createZone;

        actionMutate(zoneData, {
            onSuccess: () => onSuccess(),
            onError: (error) => {
                const errorMessage = getApiErrorMessage(error);
                setError('root', {
                    type: 'manual',
                    message: errorMessage,
                });
            },
        });
    });

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Input
                label="Nombre de la Localidad"
                placeholder="Ej: VIP, General, Platea..."
                {...register("name")}
                error={errors.name?.message}
            />

            <Input
                type="number"
                label="Capacidad de la Zona"
                placeholder="Ej: 500"
                {...register("capacity", { valueAsNumber: true })}
                error={errors.capacity?.message}
            />

            <TextArea
                label="Descripción"
                placeholder="Detalles sobre esta ubicación..."
                {...register("description")}
                error={errors.description?.message}
            />

            {errors.root && (
                <div className="mt-2">
                    <FormError message={errors.root.message} type="global" />
                </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
                <Button type="button" onClick={onCancel} disabled={isPending} className="bg-gray-200 text-black">
                    Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                    {/* Cambiamos el texto del botón dinámicamente */}
                    {isPending ? "Guardando..." : (isEditing ? "Actualizar Zona" : "Crear Zona")}
                </Button>
            </div>
        </form>
    );
}