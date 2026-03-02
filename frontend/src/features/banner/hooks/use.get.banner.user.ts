import { useQuery } from "@tanstack/react-query";
import { getBannerUserApi } from "../api/banner.api";



export const useGetAllUserBanner = () => {
    console.log("useGetAllUserBanner");
    return useQuery({
        queryKey: ["user-banners"],
        queryFn: () => getBannerUserApi(),
        staleTime: 1 * 60 * 1000,
        select: (data) => data.data || null,
    });
}; 