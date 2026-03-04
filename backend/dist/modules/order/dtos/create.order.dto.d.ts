import { z } from "zod";
export declare const STATE_OPTIONS: readonly ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh", "Telangana", "Delhi", "Uttar Pradesh", "Maharashtra", "Gujarat", "Goa"];
export declare const CreateOrderSchema: z.ZodObject<{
    guestId: z.ZodString;
    cartId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    addressLine1: z.ZodString;
    addressLine2: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    city: z.ZodString;
    state: z.ZodEnum<{
        Kerala: "Kerala";
        "Tamil Nadu": "Tamil Nadu";
        Karnataka: "Karnataka";
        "Andhra Pradesh": "Andhra Pradesh";
        Telangana: "Telangana";
        Delhi: "Delhi";
        "Uttar Pradesh": "Uttar Pradesh";
        Maharashtra: "Maharashtra";
        Gujarat: "Gujarat";
        Goa: "Goa";
    }>;
    pincode: z.ZodString;
    acceptedTerms: z.ZodBoolean;
}, z.core.$strict>;
export type CreateOrderRequestDto = z.infer<typeof CreateOrderSchema>;
//# sourceMappingURL=create.order.dto.d.ts.map