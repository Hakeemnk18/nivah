import { useQuery } from "@tanstack/react-query";
import { getBannerByIdApi } from "../api/banner.api";



export const useGetAdminBannerById = (id: string | null) => {
    return useQuery({
        queryKey: ["admin-banner", id],
        queryFn: () => getBannerByIdApi(id as string),
        enabled: !!id,
        retry: 1
    });
}; 