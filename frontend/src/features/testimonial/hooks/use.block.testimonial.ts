import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockTestimonialApi } from "../api/testimonial.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";

export const useBlockTestimonial = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: blockTestimonialApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
            toast.success("Testimonial blocked successfully");
        },
        onError: (error) => {
            handleApiError(error)
        },
    });
};