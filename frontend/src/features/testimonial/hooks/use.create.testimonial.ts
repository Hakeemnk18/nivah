import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTestimonialApi } from "../api/testimonial.api";
import type { CreateTestimonialPayload } from "../type/testimonial.type";

export const useCreateTestimonial = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTestimonialPayload) => createTestimonialApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
        },
    });
};