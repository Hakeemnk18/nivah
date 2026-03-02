import { useQuery } from "@tanstack/react-query";
import { getAllBannerForAdminApi } from "../api/banner.api";



export const useGetAllAdminBanner = () => {
    return useQuery({
        queryKey: ["admin-banners"],
        queryFn: () => getAllBannerForAdminApi(),
        staleTime: 5 * 60 * 1000,
    });
}; 