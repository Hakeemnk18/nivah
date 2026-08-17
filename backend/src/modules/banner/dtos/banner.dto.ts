import { z } from "zod";

export const BannerImageSchema = z.object({
    url: z.string().url("Valid image URL is required"),
    publicId: z.string().min(1, "Image public ID is required"),
});

export const CreateBannerSchema = z.object({
    image: BannerImageSchema,
    link: z
        .string()
        .trim()
        .refine(
            (val) => val === "" || val.startsWith("/") || /^https?:\/\//.test(val),
            "Link must be a relative path (e.g. /collections/onam) or a full URL"
        )
        .optional(),
});

export type CreateBannerRequestDto = z.infer<typeof CreateBannerSchema>;

export const EditBannerSchema = CreateBannerSchema;

export type EditBannerRequestDto = z.infer<typeof EditBannerSchema>;
