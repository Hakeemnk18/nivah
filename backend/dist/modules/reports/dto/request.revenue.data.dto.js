import { z } from "zod";
export const RevenueReportQuerySchema = z
    .object({
    option: z.enum([
        "daily",
        "this_week",
        "this_month",
        "last_6_months",
        "this_year",
        "all_time",
        "custom",
    ]),
    customStartDate: z.string().optional().nullable(),
    customEndDate: z.string().optional().nullable(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).default(10),
})
    .refine((data) => {
    if (data.option !== "custom")
        return true;
    if (!data.customStartDate || !data.customEndDate)
        return false;
    const start = new Date(data.customStartDate);
    const end = new Date(data.customEndDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()))
        return false;
    // Allow same day
    return start.getTime() <= end.getTime();
}, {
    message: "For custom option, valid start and end dates are required and start must be before or equal to end",
    path: ["customStartDate"],
});
//# sourceMappingURL=request.revenue.data.dto.js.map