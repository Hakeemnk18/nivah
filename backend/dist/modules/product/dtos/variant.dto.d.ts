import { z } from "zod";
export declare const VariantSchema: z.ZodObject<{
    size: z.ZodString;
    stock: z.ZodNumber;
    price: z.ZodNumber;
}, z.core.$strip>;
export declare const VariantArraySchema: z.ZodArray<z.ZodObject<{
    size: z.ZodString;
    stock: z.ZodNumber;
    price: z.ZodNumber;
}, z.core.$strip>>;
export type AddVariantRequestDto = z.infer<typeof VariantSchema>;
export declare const UpdateVariantSchema: z.ZodObject<{
    stock: z.ZodNumber;
    price: z.ZodNumber;
    isActive: z.ZodBoolean;
}, z.core.$strip>;
export type UpdateVariantRequestDto = z.infer<typeof UpdateVariantSchema>;
//# sourceMappingURL=variant.dto.d.ts.map