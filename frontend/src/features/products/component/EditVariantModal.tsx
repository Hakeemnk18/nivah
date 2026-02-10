import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAdminProductVariant } from "../hook/use.admin.product.variant";
import { useUpdateVariant } from "../hook/use,update,variant";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import AdminLoader from "../../admin/components/AdminLoader";
import toast from "react-hot-toast";

interface Props {
  productId: string;
  variantId: string;
  onClose: () => void;
}

type FormData = {
  price: string;
  stock: string;
  isActive: boolean;
};

type FormErrors = {
  price?: string;
  stock?: string;
  isActive?: string;
};

const EditVariantModal = ({ productId, variantId, onClose }: Props) => {
  const { data, isLoading, isError } = useAdminProductVariant(productId, variantId);
  const variant = data?.data;
  const { mutateAsync: updateMutation, isPending: submitting } = useUpdateVariant();

  const [formData, setFormData] = useState<FormData>({
    price: "",
    stock: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  /* preload data */
  useEffect(() => {
    if (variant) {
      setFormData({
        price: String(variant.price),
        stock: String(variant.stock),
        isActive: variant.isActive!,
      });
    }
  }, [variant]);

  const handleSubmit = async () => {
    const newErrors: FormErrors = {};

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.stock || Number(formData.stock) < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateMutation({
        productId,
        variantId,
        data: {
          size: variant?.size!,
          price: Number(formData.price),
          stock: Number(formData.stock),
          isActive: formData.isActive,
        },
      });
      toast.success("Variant updated successfully");
      onClose();
    } catch (err) {
      const fieldErrors = handleApiError(err);
      if (fieldErrors) {
        console.log("inside field ", fieldErrors);
        setErrors(fieldErrors);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (isError || !variant) return null;

  return (
    <>
      {submitting && <AdminLoader fullScreen label="Updating variant..." />}
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-3">
        <div className="bg-[#1d1e33] text-white rounded-xl w-full max-w-md p-5 relative">
          <button onClick={onClose} className="absolute top-4 right-4">
            <FaTimes />
          </button>

          <h3 className="text-lg font-semibold mb-4">Edit Variant</h3>

          <div className="space-y-4">
            {/* Size */}
            <div>
              <label className="text-sm text-gray-300">Size</label>
              <input
                value={variant.size}
                disabled
                className="w-full mt-1 px-3 py-2 rounded bg-[#232447] text-gray-400"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm text-gray-300">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 rounded bg-[#232447]"
              />
              {errors.price && (
                <p className="text-sm text-red-400">{errors.price}</p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="text-sm text-gray-300">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 rounded bg-[#232447]"
              />
              {errors.stock && (
                <p className="text-sm text-red-400">{errors.stock}</p>
              )}
            </div>

            {/* Active */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Active</span>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-5 h-5 accent-blue-500"
              />
            </div>
            {errors.isActive && (
              <p className="text-sm text-red-400">{errors.isActive}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#232447]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 rounded bg-[#1f3b7a]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditVariantModal;
