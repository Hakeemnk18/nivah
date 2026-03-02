import { useQuery } from "@tanstack/react-query";
import { getAllHeroForAdminApi } from "../api/hero.api";



export const useGetAllAdminHero = () => {
    return useQuery({
        queryKey: ["admin-heroes"],
        queryFn: () => getAllHeroForAdminApi(),
        staleTime: 5 * 60 * 1000,
    });
}; 