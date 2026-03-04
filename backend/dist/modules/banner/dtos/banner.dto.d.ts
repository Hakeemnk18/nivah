import { z } from "zod";
export declare const BannerImageSchema: z.ZodObject<{
    url: z.ZodString;
    publicId: z.ZodString;
}, z.core.$strip>;
export declare const CreateBannerSchema: z.ZodObject<{
    image: z.ZodObject<{
        url: z.ZodString;
        publicId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateBannerRequestDto = z.infer<typeof CreateBannerSchema>;
export declare const EditBannerSchema: z.ZodObject<{
    image: z.ZodObject<{
        url: z.ZodString;
        publicId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type EditBannerRequestDto = z.infer<typeof EditBannerSchema>;
//# sourceMappingURL=banner.dto.d.ts.map