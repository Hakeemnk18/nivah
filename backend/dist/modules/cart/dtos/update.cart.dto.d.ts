import { z } from "zod";
export declare const UpdateCartItemQuantitySchema: z.ZodObject<{
    guestId: z.ZodString;
    cartId: z.ZodString;
    itemId: z.ZodString;
    action: z.ZodEnum<{
        increment: "increment";
        decrement: "decrement";
    }>;
}, z.core.$strip>;
export type UpdateCartItemQuantityRequestDto = z.infer<typeof UpdateCartItemQuantitySchema>;
//# sourceMappingURL=update.cart.dto.d.ts.map