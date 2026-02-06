import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCreateProduct } from "../hook/use.create.product";
import { useAllSubCategoriesForUser } from "../../category/hooks/use.sub.categories";

import ImageCropInput from "../../../shared/components/ImageCropInput";
import VariantTable from "../component/VariantTable";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import type { CreateProductPayload } from "../type/product.type";

type Variant = {
    size: string;
    price: string;
    quantity: string;
};

type FormState = {
    name: string;
    description: string;
    categoryId: string;
    images: File[];
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


    const [formData, setFormData] = useState<FormState>({
        name: "",
        description: "",
        categoryId: "",
        images: [],
        variants: [{ size: "", price: "", quantity: "" }],
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
        console.log("call handle submit ")
        e.preventDefault();

        console.log("images ", formData.images)
        const newErrors: FormErrors = {};

        if (!formData.name.trim() || formData.name.length < 2)
            newErrors.name = "Minimum 2 characters";

        if (!formData.description.trim() || formData.description.length < 10)
            newErrors.description = "Minimum 10 characters";

        if (!formData.categoryId)
            newErrors.categoryId = "Category is required";

        if (formData.images.length === 0)
            newErrors.images = "At least one image is required";

        /* ---------- variants validation ---------- */
        const sizes = formData.variants.map(v => v.size.trim());
        const hasDuplicate = new Set(sizes).size !== sizes.length;

        if (hasDuplicate)
            newErrors.variants = "Duplicate size is not allowed";

        for (const v of formData.variants) {
            if (!v.size || !v.price || !v.quantity) {
                newErrors.variants = "All variant fields are required";
                break;
            }
        }

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        try {
            const payload: CreateProductPayload = {
                ...formData,
                variant: formData.variants.map(v => ({
                    size: v.size.trim(),
                    price: Number(v.price),
                    stock: Number(v.quantity),
                })),
                image: [{ url: "", publicId: "" }, { url: "", publicId: "" }, { url: "", publicId: "" }],
            };

            await createProduct(payload);

            navigate("/admin/productManagement");
        } catch (err) {
            const fieldErrors = handleApiError(err);
            if (fieldErrors) setErrors(fieldErrors);
        }
    };

    return (
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

                    {/* images */}
                    <ImageCropInput
                        max={3}
                        aspect={1}
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
    );
};

export default CreateProductForm;
