import { z } from "zod";
export declare const RemoveCartItemSchema: z.ZodObject<{
    guestId: z.ZodString;
    cartId: z.ZodString;
    itemId: z.ZodString;
}, z.core.$strip>;
export type RemoveCartItemRequestDto = z.infer<typeof RemoveCartItemSchema>;
//# sourceMappingURL=remove.cart.dto.d.ts.map