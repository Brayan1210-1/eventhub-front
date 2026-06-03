import { useQuery } from "@tanstack/react-query";
import { zoneService } from "../services/zone.service";

export const useZonesByPlace = (placeId: number) => {
    return useQuery({

        queryKey: ['zones', placeId],
        queryFn: () => zoneService.getZonesByPlace(placeId),

        enabled: !!placeId,
    });
};
