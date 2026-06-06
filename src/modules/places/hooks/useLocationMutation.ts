import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLocation, updateLocation, deleteLocation } from "../service/location.service";
import type { CreateLocationDTO, UpdateLocationDTO } from "../types/places.types";

export const useLocationMutations = () => {
    const queryClient = useQueryClient();

    // Función auxiliar para decirle a TanStack: "¡Ey, los datos cambiaron, vuelve a pedir el GET!"
    const invalidateLocations = () => {
        queryClient.invalidateQueries({ queryKey: ["locations"] });
    };

    const createMutation = useMutation({
        mutationFn: (data: CreateLocationDTO) => createLocation(data),
        onSuccess: () => { invalidateLocations() },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateLocationDTO }) => updateLocation(id, data),
        onSuccess: () => { invalidateLocations() },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteLocation(id),
        onSuccess: () => { invalidateLocations() },
    });

    return {
        createLocation: createMutation.mutateAsync,
        isCreating: createMutation.isPending,

        updateLocation: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,

        deleteLocation: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending,
    };
};