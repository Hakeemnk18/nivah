import { z } from "zod";
export declare const GetAllQuerySchema: z.ZodObject<{
    search: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortValue: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    filters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
export type GetAllQueryDto = z.infer<typeof GetAllQuerySchema>;
//# sourceMappingURL=get.all.doc.dto.d.ts.map