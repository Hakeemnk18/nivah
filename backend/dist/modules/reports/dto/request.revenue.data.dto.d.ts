import { z } from "zod";
export declare const RevenueReportQuerySchema: z.ZodObject<{
    option: z.ZodEnum<{
        custom: "custom";
        daily: "daily";
        this_week: "this_week";
        this_month: "this_month";
        last_6_months: "last_6_months";
        this_year: "this_year";
        all_time: "all_time";
    }>;
    customStartDate: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    customEndDate: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type RevenueReportQueryDto = z.infer<typeof RevenueReportQuerySchema>;
//# sourceMappingURL=request.revenue.data.dto.d.ts.map