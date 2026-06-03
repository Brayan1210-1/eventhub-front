import { useQuery } from "@tanstack/react-query";
import { getPlaceById } from "../service/location.service";

export const usePlaceDetail = (placeId: number | null) => {
    return useQuery({
        queryKey: ['places', 'detail', placeId],
        queryFn: () => getPlaceById(placeId!),
        enabled: placeId !== null,
    });
};