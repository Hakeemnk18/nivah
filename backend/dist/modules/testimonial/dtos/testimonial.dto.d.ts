import { z } from "zod";
export declare const CreateTestimonialSchema: z.ZodObject<{
    comment: z.ZodString;
    author: z.ZodString;
}, z.core.$strip>;
export type CreateTestimonialRequestDto = z.infer<typeof CreateTestimonialSchema>;
export declare const EditTestimonialSchema: z.ZodObject<{
    comment: z.ZodString;
    author: z.ZodString;
}, z.core.$strip>;
export type EditTestimonialRequestDto = z.infer<typeof EditTestimonialSchema>;
//# sourceMappingURL=testimonial.dto.d.ts.map