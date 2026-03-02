import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import ImageCropInput from "../../../shared/components/ImageCropInput";
import AdminLoader from "../../admin/components/AdminLoader";
import type { ImageItem } from "../../../shared/types/image.type";
import { useCreateHero } from "../hooks/use.create.hero";
import { uploadToCloudinary } from "../../../shared/utils/cloudinary";
import type { CreateHeroPayload } from "../types/hero.type";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import { useGetAdminHeroById } from "../hooks/use.get.hero.by.id";
import { useEditHero } from "../hooks/use.edit.hero";

type FormState = {
    title: string;
    subtitle: string;
    images: ImageItem[];
};

type FormErrors = {
    title?: string;
    subtitle?: string;
    images?: string;
};

const CreateHeroForm = () => {
    const [searchParams] = useSearchParams();
    const heroId = searchParams.get("heroId");
    const { data: hero } = useGetAdminHeroById(heroId);
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const { mutateAsync: createHero } = useCreateHero();
    const { mutateAsync: updateHero } = useEditHero();

    const [formData, setFormData] = useState<FormState>({
        title: "",
        subtitle: "",
        images: [],
    });

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (hero?.data) {
            setFormData({
                title: hero.data.title,
                subtitle: hero.data.subtitle,
                images: [{
                    url: hero.data.image.url,
                    publicId: hero.data.image.publicId,
                    type: "existing",
                }],
            });
        }
    }, [hero]);

    /* ---------- handlers ---------- */

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
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

        if (formData.images.length === 0)
            newErrors.images = "A hero image is required";

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
            const payload: CreateHeroPayload = {
                title: formData.title,
                subtitle: formData.subtitle,
                image: {
                    url: uploadedImages[0].url,
                    publicId: uploadedImages[0].publicId,
                },
            };
            if (heroId) {
                await updateHero({ id: heroId, data: payload });
            } else {
                await createHero(payload);
            }
            setSubmitting(false);
            toast.success("Hero banner created successfully");
            navigate("/admin/heroManagement");
        } catch (err) {
            const fieldErrors = handleApiError(err);
            if (fieldErrors) setErrors(fieldErrors);
            setSubmitting(false);
        }
    };

    return (
        <>
            {submitting && <AdminLoader fullScreen label={heroId ? "Editing banner..." : "Creating banner..."} />}
            <div className="pb-20">
                <div className="max-w-3xl mx-auto bg-[#1d1e33] p-6 rounded-xl text-white mt-4">
                    <h2 className="text-xl font-semibold mb-6">{heroId ? "Edit Hero Banner" : "Create Hero Banner"}</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Banner Title"
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
                                placeholder="Banner Subtitle"
                                className="w-full px-4 py-2 rounded-lg bg-[#232447] focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.subtitle && (
                                <p className="text-red-400 text-sm mt-1">{errors.subtitle}</p>
                            )}
                        </div>




                        {/* Image Upload */}
                        <div>
                            <h3 className="text-sm text-gray-300 mb-2">Banner Image</h3>
                            <ImageCropInput
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
                                {(heroId) ? "Editing" : "Creating"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateHeroForm;