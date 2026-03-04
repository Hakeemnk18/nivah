import { z } from "zod";
export declare const HandlePaymentFailureSchema: z.ZodObject<{
    razorpay_order_id: z.ZodString;
    razorpay_payment_id: z.ZodString;
    failure_reason: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type HandlePaymentFailureRequestDto = z.infer<typeof HandlePaymentFailureSchema>;
//# sourceMappingURL=failure.order.dto.d.ts.map