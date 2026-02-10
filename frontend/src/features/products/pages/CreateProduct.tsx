import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCreateProduct } from "../hook/use.create.product";
import { useAllSubCategoriesForUser } from "../../category/hooks/use.sub.categories";

import ImageCropInput from "../../../shared/components/ImageCropInput";
import VariantTable from "../component/VariantTable";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import type { CreateProductPayload } from "../type/product.type";
import { uploadToCloudinary } from "../../../shared/utils/cloudinary";
import AdminLoader from "../../admin/components/AdminLoader";
import type { ImageItem } from "../../../shared/types/image.type";

type Variant = {
    size: string;
    price: string;
    quantity: string;
};

type FormState = {
    name: string;
    description: string;
    categoryId: string;
    isFeatured: boolean;
    images: ImageItem[];
    variants: Variant[];
};

type FormErrors = {
    name?: string;
    description?: string;
    categoryId?: string;
    images?: string;
    variants?: string;
};

const CreateProductForm = () => {
    const navigate = useNavigate();
    const { data: categories } = useAllSubCategoriesForUser();
    const { mutateAsync: createProduct, isPending } = useCreateProduct();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormState>({
        name: "",
        description: "",
        categoryId: "",
        images: [],
        variants: [{ size: "", price: "", quantity: "" }],
        isFeatured: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});



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
        let uploadedImages: { url: string; publicId: string }[] = [];

        if (!formData.name.trim() || formData.name.length < 2)
            newErrors.name = "Minimum 2 characters";

        if (!formData.description.trim() || formData.description.length < 10)
            newErrors.description = "Minimum 10 characters";

        if (!formData.categoryId || formData.categoryId === "")
            newErrors.categoryId = "Category is required";

        if (formData.images.length === 0)
            newErrors.images = "At least one image is required";

        /* ---------- variants validation ---------- */
        const sizes = formData.variants.map(v => v.size.trim().toLowerCase());
        const hasDuplicate = new Set(sizes).size !== sizes.length;

        if (hasDuplicate) {
            newErrors.variants = "Duplicate size is not allowed";
        }
        for (const v of formData.variants) {
            if (!v.size.trim() || !v.price.trim() || !v.quantity.trim()) {
                newErrors.variants = "All variant fields are required";
                break;
            }
            if (isNaN(Number(v.price)) || isNaN(Number(v.quantity))) {
                newErrors.variants = "Price and quantity must be numbers";
                break;
            }
            if (Number(v.price) <= 0 || Number(v.quantity) <= 0) {
                newErrors.variants = "Price and quantity must be greater than 0";
                break;
            }
            if (v.size.trim().length > 9) {
                newErrors.variants = "Size must be at most 9 characters";
                break;
            }
        }

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        try {
            setSubmitting(true);
            try {
                const newImages = formData.images.filter(img => img.type === "new");
                uploadedImages = await Promise.all(newImages.map(img => uploadToCloudinary(img.file)));
            } catch (err: any) {
                //setSubmitting(false);
                setErrors({ images: "Image upload failed. Please try again." });
                console.log("Cloudinary error response:", err?.response?.data);
                return;
            }
            const payload: CreateProductPayload = {
                ...formData,
                variants: formData.variants.map(v => ({
                    size: v.size.trim(),
                    price: Number(v.price),
                    stock: Number(v.quantity),
                })),
                images: uploadedImages,
            };
            await createProduct(payload);
            setSubmitting(false);
            toast.success("Product created successfully");
            navigate("/admin/productManagement");
        } catch (err) {
            const fieldErrors = handleApiError(err);
            if (fieldErrors) setErrors(fieldErrors);
            setSubmitting(false);
        }
    };



    return (
        <>
            {submitting && <AdminLoader fullScreen label="Creating product..." />}
            <div className="pb-20">

                <div className="max-w-3xl mx-auto bg-[#1d1e33] p-6 rounded-xl text-white">

                    <h2 className="text-xl font-semibold mb-6">
                        Create Product
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
                            max={3}
                            aspect={4 / 5}
                            value={formData.images}
                            onChange={(files) => setFormData({ ...formData, images: files })}
                            error={errors.images}
                        />

                        {/* variants */}
                        <VariantTable
                            value={formData.variants}
                            onChange={(variants) => setFormData({ ...formData, variants })}
                            error={errors.variants}
                        />

                        {/* actions */}
                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-[#2c2e4a] rounded-lg">
                                Cancel
                            </button>
                            <button type="submit" disabled={isPending} className="px-5 py-2 bg-blue-600 rounded-lg">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateProductForm;
