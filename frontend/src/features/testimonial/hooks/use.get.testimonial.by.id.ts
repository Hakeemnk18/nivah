import { useQuery } from "@tanstack/react-query";
import { getTestimonialByIdApi } from "../api/testimonial.api";



export const useGetAdminTestimonialById = (id: string | null) => {
    return useQuery({
        queryKey: ["admin-testimonial", id],
        queryFn: () => getTestimonialByIdApi(id as string),
        enabled: !!id,
        retry: 1
    });
}; 