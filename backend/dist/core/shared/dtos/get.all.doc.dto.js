import { z } from "zod";
export const GetAllQuerySchema = z.object({
    search: z.string().optional().default(""),
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(4),
    sortValue: z.string().optional().default("createdAt"),
    filters: z.record(z.string(), z.any()).default({}),
});
//# sourceMappingURL=get.all.doc.dto.js.map