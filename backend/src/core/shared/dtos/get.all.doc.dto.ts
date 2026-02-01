import { z } from "zod";

export const GetAllQuerySchema = z.object({
  search: z.string().optional().default(""),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(5),
  sortValue: z.string().optional().default("createdAt"),
  filters: z.record(z.string(), z.any()).default({}),
});

export type GetAllQueryDto = z.infer<typeof GetAllQuerySchema>;