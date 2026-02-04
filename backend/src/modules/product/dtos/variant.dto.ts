import { z } from "zod";

export const VariantSchema = z.object({
  size: z
    .string()
    .trim()
    .min(1, "Variant size is required"),

  stock: z
    .number()
    .int("Variant stock must be an integer")
    .min(0, "Variant stock cannot be negative"),

  price: z
    .number()
    .min(0, "Variant price cannot be negative"),
});

export const VariantArraySchema = z
  .array(VariantSchema)
  .min(1, "At least one product variant is required")
  .refine(
    (variants) => {
      const normalizedSizes = variants.map((v) =>
        v.size.trim().toLowerCase()
      );

      return new Set(normalizedSizes).size === normalizedSizes.length;
    },
    {
      message: "Variant sizes must be unique",
    }
  );

  export type AddVariantRequestDto = z.infer<
    typeof VariantSchema
  >;