import { z } from "zod";
export const BannerImageSchema = z.object({
    url: z.string().url("Valid image URL is required"),
    publicId: z.string().min(1, "Image public ID is required"),
});
export const CreateBannerSchema = z.object({
    image: BannerImageSchema,
});
export const EditBannerSchema = CreateBannerSchema;
//# sourceMappingURL=banner.dto.js.map