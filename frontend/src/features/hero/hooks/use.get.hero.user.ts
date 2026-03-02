import { useQuery } from "@tanstack/react-query";
import { getHeroUserApi } from "../api/hero.api";



export const useGetAllUserHero = () => {
    console.log("useGetAllUserHero");
    return useQuery({
        queryKey: ["user-heroes"],
        queryFn: () => getHeroUserApi(),
        staleTime: 1 * 60 * 1000,
        select: (data) => data.data || null,
    });
}; 