import { z } from "zod";
export declare const AddCartItemSchema: z.ZodObject<{
    guestId: z.ZodString;
    productId: z.ZodString;
    variantId: z.ZodString;
    quantity: z.ZodNumber;
}, z.core.$strip>;
export type AddCartItemRequestDto = z.infer<typeof AddCartItemSchema>;
//# sourceMappingURL=create.cart.dto.d.ts.map