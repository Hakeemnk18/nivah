import { useEffect, useState } from "react";
import { data, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAllSubCategoriesForUser } from "../../category/hooks/use.sub.categories";
import ImageCropInput from "../../../shared/components/ImageCropInput";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import type { UpdateProductPayload } from "../type/product.type";
import { uploadToCloudinary } from "../../../shared/utils/cloudinary";
import AdminLoader from "../../admin/components/AdminLoader";

import { useEditProduct } from "../hook/use.edit.product";
import type { ImageItem } from "../../../shared/types/image.type";
import { useAdminProductDetails } from "../hook/use.admin.product.detail";

type FormState = {
    name: string;
    description: string;
    categoryId: string;
    isFeatured: boolean;
    images: ImageItem[];
};

type FormErrors = {
    name?: string;
    description?: string;
    categoryId?: string;
    images?: string;
};



const EditProductForm = () => {
    const [searchParams] = useSearchParams();
    let productId = searchParams.get("productId");
    const { data: productData, isLoading } = useAdminProductDetails(productId);
    const navigate = useNavigate();
    const { data: categories } = useAllSubCategoriesForUser();
    const { mutateAsync: editProduct, isPending } = useEditProduct();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormState>({
        name: "",
        description: "",
        categoryId: "",
        images: [],
        isFeatured: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (!productData) return;
        setFormData({
            name: productData?.data?.name || "",
            description: productData?.data?.description || "",
            categoryId: productData?.data?.category?.id || "",
            images: productData?.data?.images.map(img => ({
                url: img.url,
                publicId: img.publicId,
                type: "existing",
            })) || [],
            isFeatured: productData?.data?.isFeatured || false,
        });
    }, [isLoading]);

    /* ---------- handlers ---------- */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: FormErrors = {};
        let allImages: { url: string; publicId: string }[] = [];

        if (!formData.name.trim() || formData.name.length < 2)
            newErrors.name = "Minimum 2 characters";

        if (!formData.description.trim() || formData.description.length < 10)
            newErrors.description = "Minimum 10 characters";

        if (!formData.categoryId || formData.categoryId === "")
            newErrors.categoryId = "Category is required";

        if (formData.images.length === 0)
            newErrors.images = "At least one image is required";


        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        try {
            setSubmitting(true);
            try {
                allImages = await Promise.all(
                    formData.images.map(async img => {
                        if (img.type === "existing") {
                            return { url: img.url, publicId: img.publicId };
                        }
                        return uploadToCloudinary(img.file);
                    })
                );



            } catch (err) {
                setErrors({ images: "Image upload failed. Please try again." });
                return;
            }
            const payload: UpdateProductPayload = {
                ...formData,
                images: allImages,
            };

            await editProduct({ id: productId!, data: payload });
            setSubmitting(false);
            toast.success("Product updated successfully");
            navigate("/admin/productManagement");
        } catch (err) {
            const fieldErrors = handleApiError(err);
            if (fieldErrors) setErrors(fieldErrors);
            setSubmitting(false);
        }
    };

    if (isLoading) return <AdminLoader fullScreen label="Loading product..." />

    return (
        <>
            {submitting && <AdminLoader fullScreen label="Updating product..." />}
            <div className="pb-20">

                <div className="max-w-3xl mx-auto bg-[#1d1e33] p-6 rounded-xl text-white">

                    <h2 className="text-xl font-semibold mb-6">
                        Edit Product
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* name */}
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Product name"
                            className="w-full px-4 py-2 rounded-lg bg-[#232447]"
                        />
                        {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

                        {/* description */}
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Product description"
                            className="w-full px-4 py-2 rounded-lg bg-[#232447]"
                        />
                        {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
                        {/* featured */}
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isFeatured}
                                onChange={(e) =>
                                    setFormData({ ...formData, isFeatured: e.target.checked })
                                }
                                className="h-4 w-4 accent-blue-600"
                            />
                            <span className="text-sm">Featured product</span>
                        </label>
                        {/* category */}
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-[#232447]"
                        >
                            <option value="">Select category</option>
                            {categories?.data?.map((cat: any) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.categoryId && <p className="text-red-400 text-sm">{errors.categoryId}</p>}
                        {/* images */}
                        <ImageCropInput
                            title="Product Images"
                            max={3}
                            aspect={4 / 5}
                            value={formData.images}
                            onChange={(files) => setFormData({ ...formData, images: files })}
                            error={errors.images}
                        />



                        {/* actions */}
                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-[#2c2e4a] rounded-lg">
                                Cancel
                            </button>
                            <button type="submit" disabled={isPending} className="px-5 py-2 bg-blue-600 rounded-lg">
                                Edit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProductForm;
