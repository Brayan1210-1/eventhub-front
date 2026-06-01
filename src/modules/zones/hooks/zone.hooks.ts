import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { zoneService } from '../services/zone.service';
import { type ZoneFormData } from '../schemas/zone.schema';




export const useZonesByPlace = (placeId: number) => {
    return useQuery({

        queryKey: ['zones', placeId],
        queryFn: () => zoneService.getZonesByPlace(placeId),

        enabled: !!placeId,
    });
};


export const useCreateZone = (placeId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ZoneFormData) => zoneService.createZone(placeId, data),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['zones', placeId] });
        },
    });
};


export const useUpdateZone = (placeId: number, zoneId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ZoneFormData) => zoneService.updateZone(placeId, zoneId, data),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['zones', placeId] });
        },
    });
};


export const useDeleteZone = (placeId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (zoneId: number) => zoneService.deleteZone(zoneId),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['zones', placeId] });
        },
    });
};