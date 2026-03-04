import { z } from "zod";
export declare const EditProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    isFeatured: z.ZodDefault<z.ZodBoolean>;
    images: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        publicId: z.ZodString;
    }, z.core.$strip>>;
    categoryId: z.ZodString;
}, z.core.$strict>;
export type EditProductRequestDto = z.infer<typeof EditProductSchema>;
//# sourceMappingURL=edit.product.dto.d.ts.map