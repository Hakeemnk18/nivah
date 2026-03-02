import { z } from "zod";

export const HeroImageSchema = z.object({
    url: z.string().url("Valid image URL is required"),
    publicId: z.string().min(1, "Image public ID is required"),
});

export const CreateHeroSchema = z.object({
    title: z
        .string()
        .min(2, "Title must be at least 2 characters")
        .max(100, "Title cannot exceed 100 characters"),
    subtitle: z
        .string()
        .min(5, "Subtitle must be at least 5 characters")
        .max(200, "Subtitle cannot exceed 200 characters"),
    image: HeroImageSchema,
});

export type CreateHeroRequestDto = z.infer<typeof CreateHeroSchema>;

export const EditHeroSchema = CreateHeroSchema;

export type EditHeroRequestDto = z.infer<typeof EditHeroSchema>;
