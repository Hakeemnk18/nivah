import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";
import { unblockTestimonialApi } from "../api/testimonial.api";

export const useUnblockTestimonial = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: unblockTestimonialApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
            toast.success("Testimonial unblocked successfully");
        },
        onError: (error) => {
            handleApiError(error)
        },
    });
}