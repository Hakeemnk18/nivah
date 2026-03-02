import { useQuery } from "@tanstack/react-query";
import { getAllTestimonialForAdminApi } from "../api/testimonial.api";



export const useGetAllAdminTestimonial = () => {
    return useQuery({
        queryKey: ["admin-testimonials"],
        queryFn: () => getAllTestimonialForAdminApi(),
        staleTime: 5 * 60 * 1000,
    });
}; 