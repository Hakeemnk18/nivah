import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import AdminLoader from "../../admin/components/AdminLoader";
import { useAddVariant } from "../hook/use.add.variant";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import VariantTable from "./VariantTable";
import toast from "react-hot-toast";


interface Props {
    productId: string;
    onClose: () => void;
}

type Variant = {
    size: string;
    price: string;
    quantity: string;
};

type FormState = {
    variants: Variant[];
};

type FormErrors = {
    variants?: string;
};

const AddVariantModal = ({ productId, onClose }: Props) => {
    const { mutateAsync, isPending } = useAddVariant();



    const [formData, setFormData] = useState<FormState>({
        variants: [{ size: "", price: "", quantity: "" }],
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleSubmit = async () => {
        const newErrors: FormErrors = {};

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
        } else {
            try {
                await mutateAsync({
                    productId,
                    data: formData.variants.map(v => ({
                        size: v.size.trim(),
                        price: Number(v.price),
                        stock: Number(v.quantity),
                    })),
                });
                toast.success("Variant added successfully");
                onClose();
            } catch (err) {
                const fieldErrors = handleApiError(err);
                if (fieldErrors) setErrors(fieldErrors);
            }
        }


    };

    return (
        <>
            {isPending && <AdminLoader fullScreen label="Adding variant..." />}
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-3">
                <div className="bg-[#1d1e33] text-white rounded-xl w-full max-w-md p-5 relative">
                    <button onClick={onClose} className="absolute top-4 right-4">
                        <FaTimes />
                    </button>

                    <h3 className="text-lg font-semibold mb-4">Add Variant</h3>

                    <VariantTable
                        value={formData.variants}
                        onChange={(variants) => setFormData({ ...formData, variants })}
                        error={errors.variants}

                    />

                    <div className="flex justify-end gap-3 mt-6">
                        <button onClick={onClose} className="px-4 py-2 rounded bg-[#232447]">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isPending}
                            className="px-4 py-2 rounded bg-[#1f3b7a]"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddVariantModal;
