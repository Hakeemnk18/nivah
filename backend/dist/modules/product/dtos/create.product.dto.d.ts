import { z } from "zod";
export declare const CreateProductSchema: z.ZodObject<{
    name: z.ZodString;
    isFeatured: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodString;
    images: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        publicId: z.ZodString;
    }, z.core.$strip>>;
    categoryId: z.ZodString;
    variants: z.ZodArray<z.ZodObject<{
        size: z.ZodString;
        stock: z.ZodNumber;
        price: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type CreateProductRequestDto = z.infer<typeof CreateProductSchema>;
//# sourceMappingURL=create.product.dto.d.ts.map