import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ImageCropInput from "../../../shared/components/ImageCropInput";
import AdminLoader from "../../admin/components/AdminLoader";
import type { ImageItem } from "../../../shared/types/image.type";
import { uploadToCloudinary } from "../../../shared/utils/cloudinary";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import { useCreateBanner } from "../hooks/use.create.banner";
import { useEditBanner } from "../hooks/use.edit.banner";
import { useGetAdminBannerById } from "../hooks/use.get.banner.by.id";
import type { CreateBannerPayload } from "../types/banner.type";

type FormState = {
    images: ImageItem[];
};

type FormErrors = {
    images?: string;
};

const CreateBannerForm = () => {
    const [searchParams] = useSearchParams();
    const bannerId = searchParams.get("bannerId");
    const { data: banner } = useGetAdminBannerById(bannerId);
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const { mutateAsync: createBanner } = useCreateBanner();
    const { mutateAsync: updateBanner } = useEditBanner();

    const [formData, setFormData] = useState<FormState>({
        images: [],
    });

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (banner?.data) {
            setFormData({
                images: [{
                    url: banner.data.image.url,
                    publicId: banner.data.image.publicId,
                    type: "existing",
                }],
            });
        }
    }, [banner]);

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
            const payload: CreateBannerPayload = {
                image: {
                    url: uploadedImages[0].url,
                    publicId: uploadedImages[0].publicId,
                },
            };
            if (bannerId) {
                await updateBanner({ id: bannerId, data: payload });
            } else {
                await createBanner(payload);
            }
            setSubmitting(false);
            toast.success("Banner created successfully");
            navigate("/admin/bannerManagement");
        } catch (err) {
            const fieldErrors = handleApiError(err);
            if (fieldErrors) setErrors(fieldErrors);
            setSubmitting(false);
        }
    };

    return (
        <>
            {submitting && <AdminLoader fullScreen label={bannerId ? "Editing banner..." : "Creating banner..."} />}
            <div className="pb-20">
                <div className="max-w-3xl mx-auto bg-[#1d1e33] p-6 rounded-xl text-white mt-4">
                    <h2 className="text-xl font-semibold mb-6">{bannerId ? "Edit Banner" : "Create Banner"}</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Image Upload */}
                        <div>
                            <h3 className="text-sm text-gray-300 mb-2">Banner Image</h3>
                            <ImageCropInput
                                title="Banner Image"
                                max={1}
                                aspect={5 / 2}
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
                                {(bannerId) ? "Editing" : "Creating"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateBannerForm;