import { z } from "zod";
export declare const RevenueRangeSchema: z.ZodEnum<{
    Year: "Year";
    Week: "Week";
    Month: "Month";
    Daily: "Daily";
}>;
export declare const GetRevenueQuerySchema: z.ZodObject<{
    range: z.ZodEnum<{
        Year: "Year";
        Week: "Week";
        Month: "Month";
        Daily: "Daily";
    }>;
}, z.core.$strict>;
export type GetRevenueQueryDto = z.infer<typeof GetRevenueQuerySchema>;
//# sourceMappingURL=get.revenue.dto.d.ts.map