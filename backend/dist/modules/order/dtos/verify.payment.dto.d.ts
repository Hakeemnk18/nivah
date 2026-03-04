import { z } from "zod";
export declare const VerifyPaymentSchema: z.ZodObject<{
    razorpay_order_id: z.ZodString;
    razorpay_payment_id: z.ZodString;
    razorpay_signature: z.ZodString;
}, z.core.$strict>;
export type VerifyPaymentRequestDto = z.infer<typeof VerifyPaymentSchema>;
//# sourceMappingURL=verify.payment.dto.d.ts.map