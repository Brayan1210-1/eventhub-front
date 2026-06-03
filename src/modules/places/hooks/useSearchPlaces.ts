import { useQuery } from "@tanstack/react-query";
import { searchPlaces } from "../service/location.service";


export const useSearchPlaces = (nombre: string, page = 0, size = 10) => {
    return useQuery({
        queryKey: ['places', 'search', nombre, page, size],
        queryFn: () => searchPlaces(nombre, page, size),
        enabled: nombre.length >= 1,
    });
};