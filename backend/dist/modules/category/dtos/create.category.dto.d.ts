import { z } from "zod";
export declare const CreateCategorySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    parentId: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export type CreateCategoryRequestDto = z.infer<typeof CreateCategorySchema>;
//# sourceMappingURL=create.category.dto.d.ts.map