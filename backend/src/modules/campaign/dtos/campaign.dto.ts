import { z } from "zod";

export const CampaignImageSchema = z.object({
    url: z.string().url("Valid image URL is required"),
    publicId: z.string().min(1, "Image public ID is required"),
});

export const CreateCampaignSchema = z.object({
    title: z
        .string()
        .min(2, "Title must be at least 2 characters")
        .max(100, "Title cannot exceed 100 characters"),
    subtitle: z
        .string()
        .min(5, "Subtitle must be at least 5 characters")
        .max(200, "Subtitle cannot exceed 200 characters"),
    slug: z
        .string()
        .min(2, "Slug must be at least 2 characters")
        .max(60, "Slug cannot exceed 60 characters")
        .regex(
            /^[a-z0-9]+(-[a-z0-9]+)*$/,
            "Slug can only contain lowercase letters, numbers, and hyphens"
        ),
    image: CampaignImageSchema,
});

export type CreateCampaignRequestDto = z.infer<typeof CreateCampaignSchema>;

export const EditCampaignSchema = CreateCampaignSchema;

export type EditCampaignRequestDto = z.infer<typeof EditCampaignSchema>;
