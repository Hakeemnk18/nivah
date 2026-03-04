import { z } from "zod";
export const RevenueRangeSchema = z.enum([
    "Year",
    "Month",
    "Week",
    "Daily",
]);
export const GetRevenueQuerySchema = z
    .object({
    range: RevenueRangeSchema,
})
    .strict();
//# sourceMappingURL=get.revenue.dto.js.map