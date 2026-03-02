import { useQuery } from "@tanstack/react-query";
import { getTestimonialUserApi } from "../api/testimonial.api";



export const useGetAllUserTestimonial = () => {
    return useQuery({
        queryKey: ["user-testimonials"],
        queryFn: () => getTestimonialUserApi(),
        staleTime: 1 * 60 * 1000,
        select: (data) => data.data || null,
    });
}; 