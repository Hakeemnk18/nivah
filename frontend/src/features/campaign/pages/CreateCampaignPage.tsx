import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import ImageCropInput from "../../../shared/components/ImageCropInput";
import AdminLoader from "../../admin/components/AdminLoader";
import type { ImageItem } from "../../../shared/types/image.type";
import { useCreateCampaign } from "../hooks/use.create.campaign";
import { uploadToCloudinary } from "../../../shared/utils/cloudinary";
import type { CreateCampaignPayload } from "../types/campaign.type";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import { useGetAdminCampaignById } from "../hooks/use.get.campaign.by.id";
import { useEditCampaign } from "../hooks/use.edit.campaign";

type FormState = {
    title: string;
    subtitle: string;
    slug: string;
    images: ImageItem[];
};

type FormErrors = {
    title?: string;
    subtitle?: string;
    slug?: string;
    images?: string;
};

const slugify = (value: string) =>
    value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const CreateCampaignForm = () => {
    const [searchParams] = useSearchParams();
    const campaignId = searchParams.get("campaignId");
    const { data: campaign } = useGetAdminCampaignById(campaignId);
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const { mutateAsync: createCampaign } = useCreateCampaign();
    const { mutateAsync: updateCampaign } = useEditCampaign();

    const [formData, setFormData] = useState<FormState>({
        title: "",
        subtitle: "",
        slug: "",
        images: [],
    });

    const [slugTouched, setSlugTouched] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (campaign?.data) {
            setFormData({
                title: campaign.data.title,
                subtitle: campaign.data.subtitle,
                slug: campaign.data.slug,
                images: [{
                    url: campaign.data.image.url,
                    publicId: campaign.data.image.publicId,
                    type: "existing",
                }],
            });
            setSlugTouched(true);
        }
    }, [campaign]);

    /* ---------- handlers ---------- */

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            // auto-fill the slug from the title until the admin edits slug directly
            ...(name === "title" && !slugTouched ? { slug: slugify(value) } : {}),
        }));
        setErrors({ ...errors, [name]: "" });
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlugTouched(true);
        setFormData({ ...formData, slug: slugify(e.target.value) });
        setErrors({ ...errors, slug: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: FormErrors = {};
        let uploadedImages: { url: string; publicId: string }[] = [];

        // Validation
        if (!formData.title.trim() || formData.title.length < 2)
            newErrors.title = "Minimum 2 characters";

        if (!formData.subtitle.trim() || formData.subtitle.length < 5)
            newErrors.subtitle = "Minimum 5 characters";

        if (!formData.slug.trim() || formData.slug.length < 2)
            newErrors.slug = "Minimum 2 characters, letters/numbers/hyphens only";

        if (formData.images.length === 0)
            newErrors.images = "A campaign image is required";

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        try {
            setSubmitting(true);
            try {
                uploadedImages = await Promise.all(
                    formData.images.map(async img => {
                        if (img.type === "existing") {
                            return { url: img.url, publicId: img.publicId };
                        }
                        return uploadToCloudinary(img.file);
                    })
                )
            } catch (err: any) {
                setErrors({ images: "Image upload failed. Please try again." });
                console.log("Cloudinary error response:", err?.response?.data);
                return;
            }
            const payload: CreateCampaignPayload = {
                title: formData.title,
                subtitle: formData.subtitle,
                slug: formData.slug,
                image: {
                    url: uploadedImages[0].url,
                    publicId: uploadedImages[0].publicId,
                },
            };
            if (campaignId) {
                await updateCampaign({ id: campaignId, data: payload });
            } else {
                await createCampaign(payload);
            }
            setSubmitting(false);
            toast.success(campaignId ? "Campaign updated successfully" : "Campaign created successfully");
            navigate("/admin/campaignManagement");
        } catch (err) {
            const fieldErrors = handleApiError(err);
            if (fieldErrors) setErrors(fieldErrors);
            setSubmitting(false);
        }
    };

    return (
        <>
            {submitting && <AdminLoader fullScreen label={campaignId ? "Saving campaign..." : "Creating campaign..."} />}
            <div className="pb-20">
                <div className="max-w-3xl mx-auto bg-[#1d1e33] p-6 rounded-xl text-white mt-4">
                    <h2 className="text-xl font-semibold mb-6">{campaignId ? "Edit Campaign Page" : "Create Campaign Page"}</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Campaign Title eg: Onam Collections"
                                className="w-full px-4 py-2 rounded-lg bg-[#232447] focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.title && (
                                <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* Subtitle */}
                        <div>
                            <textarea
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Campaign Subtitle eg: Up to 30% off, for a limited time"
                                className="w-full px-4 py-2 rounded-lg bg-[#232447] focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.subtitle && (
                                <p className="text-red-400 text-sm mt-1">{errors.subtitle}</p>
                            )}
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="text-sm text-gray-300 mb-1 block">Page URL</label>
                            <div className="flex items-center gap-1 text-sm text-gray-400 bg-[#232447] rounded-lg px-4 py-2 focus-within:ring-1 focus-within:ring-blue-500">
                                <span className="whitespace-nowrap">/collections/</span>
                                <input
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleSlugChange}
                                    placeholder="onam-2026"
                                    className="w-full bg-transparent text-white focus:outline-none"
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                This is the web address customers will visit. Changing it after sharing links elsewhere (e.g. a banner) will break those links.
                            </p>
                            {errors.slug && (
                                <p className="text-red-400 text-sm mt-1">{errors.slug}</p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <h3 className="text-sm text-gray-300 mb-2">Campaign Hero Image</h3>
                            <ImageCropInput
                                title="Campaign Hero Image"
                                max={1}
                                aspect={16 / 9}
                                value={formData.images}
                                onChange={(files) =>
                                    setFormData({ ...formData, images: files })
                                }
                                error={errors.images}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-[#2c2e4a]">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 bg-[#2c2e4a] rounded-lg hover:bg-[#3e3f5c] transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                            >
                                {campaignId ? "Save" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateCampaignForm;
