import { z } from "zod";
import { ObjectIdSchema } from "../../../core/utils/object.id.validation.js";

export const AddCartItemSchema = z.object({

  guestId: z
    .string()
    .trim()
    .uuid()
    .min(1, "Guest id is required"),

  productId: ObjectIdSchema.trim(),


  variantId: ObjectIdSchema.trim(),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1")
    .max(20, "Quantity cannot exceed 20"),
});

export type AddCartItemRequestDto = z.infer<
  typeof AddCartItemSchema
>;
