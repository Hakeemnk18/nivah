import { z } from "zod";
export declare const HeroImageSchema: z.ZodObject<{
    url: z.ZodString;
    publicId: z.ZodString;
}, z.core.$strip>;
export declare const CreateHeroSchema: z.ZodObject<{
    title: z.ZodString;
    subtitle: z.ZodString;
    image: z.ZodObject<{
        url: z.ZodString;
        publicId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateHeroRequestDto = z.infer<typeof CreateHeroSchema>;
export declare const EditHeroSchema: z.ZodObject<{
    title: z.ZodString;
    subtitle: z.ZodString;
    image: z.ZodObject<{
        url: z.ZodString;
        publicId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type EditHeroRequestDto = z.infer<typeof EditHeroSchema>;
//# sourceMappingURL=hero.dto.d.ts.map