import { useQuery } from "@tanstack/react-query";
import { getLocations } from "../service/location.service";

export const useLocations = (page: number = 0, size: number = 10) => {
    return useQuery({

        queryKey: ["locations", page, size],
        queryFn: () => getLocations(page, size),

        placeholderData: (previousData) => previousData,
    });
};