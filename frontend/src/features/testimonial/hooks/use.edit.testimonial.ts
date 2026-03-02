import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "../../../shared/types/api.types";
import { editTestimonialApi } from "../api/testimonial.api";
import type { UpdateTestimonialParams } from "../type/testimonial.type";

export const useEditTestimonial = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, UpdateTestimonialParams>({
        mutationFn: ({ id, data }) => editTestimonialApi(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
        },
    });
};  