import { FaEdit, FaTimes, FaPlus } from "react-icons/fa";
import { useAdminProductDetails } from "../hook/use.admin.product.detail";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditVariantModal from "./EditVariantModal";
import AddVariantModal from "./addVariantModal";
import { getOptimizedImageUrl } from "../../../shared/utils/cloudinary";
type Props = {
  productId: string;
  onClose: () => void;
};

const ProductDetailsModal = ({ productId, onClose }: Props) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useAdminProductDetails(productId);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [isEditvariantModal, setIsEditvariantModal] = useState(false);
  const [isAddvariantModal, setIsAddvariantModal] = useState(false);
  const product = data?.data;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (isError || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-[#1d1e33] text-white rounded-xl w-full max-w-3xl p-6 relative" >
        <button onClick={onClose} className="absolute top-4 right-4">
          <FaTimes />
        </button>

        <h3 className="text-lg font-semibold mb-4">{product.name}</h3>
        <h3 className="text-lg font-semibold mb-1">{product.category.name}</h3>

        <p className="text-sm text-gray-300 mb-4">{product.description}</p>

        {/* Images */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {product.images.map((img, idx) => (
            <div key={idx} className="relative group rounded overflow-hidden">
              <img src={getOptimizedImageUrl(img.url, 300, 112)} loading="lazy" className="w-full h-28 object-cover" />
              <button

                className="absolute top-2 right-2 hidden group-hover:block">
                <FaEdit />
              </button>
            </div>
          ))}
        </div>

        {/* Variants */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Variants</h4>
          <div className="space-y-2">
            {product.variants.map((v) => (
              <div
                key={v.id}
                className="flex justify-between items-center bg-[#232447] p-3 rounded"
              >
                <span>
                  {v.size} · ₹{v.price} · Stock {v.stock}
                </span>
                <FaEdit
                  onClick={() => {

                    setSelectedVariantId(v.id);
                    setIsEditvariantModal(true);
                  }}
                  className="cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-end">
          <button
            onClick={() => {

              navigate(`/admin/editProduct?productId=${productId}`);
            }}
            className="bg-[#232447] px-4 py-2 rounded cursor-pointer">
            Edit Product
          </button>
          <button
            onClick={() => setIsAddvariantModal(true)}
            className="bg-[#1f3b7a] px-4 py-2 rounded flex items-center gap-2 cursor-pointer">
            <FaPlus /> Add Variant
          </button>
        </div>
      </div>
      {isAddvariantModal && <AddVariantModal productId={productId} onClose={() => setIsAddvariantModal(false)} />}
      {(isEditvariantModal && selectedVariantId) && <EditVariantModal productId={productId} variantId={selectedVariantId} onClose={() => setIsEditvariantModal(false)} />}
    </div>
  );
};

export default ProductDetailsModal;
