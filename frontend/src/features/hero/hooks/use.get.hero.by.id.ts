import { useQuery } from "@tanstack/react-query";
import { getHeroByIdApi } from "../api/hero.api";



export const useGetAdminHeroById = (id: string | null) => {
    return useQuery({
        queryKey: ["admin-hero", id],
        queryFn: () => getHeroByIdApi(id as string),
        enabled: !!id,
        retry: 1
    });
}; 