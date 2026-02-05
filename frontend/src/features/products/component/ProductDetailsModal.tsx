import { FaEdit, FaTimes, FaPlus } from "react-icons/fa";
import { useAdminProductDetails } from "../hook/use.admin.product.detail";


type Props = {
  productId: string;
  onClose: () => void;
};

const ProductDetailsModal = ({ productId, onClose }: Props) => {

  console.log("inside product details ", productId)
  const { data, isLoading, isError } = useAdminProductDetails(productId);
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
      <div className="bg-[#1d1e33] text-white rounded-xl w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <FaTimes />
        </button>

        <h3 className="text-lg font-semibold mb-4">
          {product.name}
        </h3>

        {/* Images */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {product.images.map((img, idx) => (
            <div
              key={idx}
              className="relative group rounded overflow-hidden"
            >
              <img
                src={img.url}
                className="w-full h-28 object-cover"
              />
              <button className="absolute top-2 right-2 hidden group-hover:block">
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
                <FaEdit className="cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-end">
          <button className="bg-[#232447] px-4 py-2 rounded">
            Edit Product
          </button>
          <button className="bg-[#1f3b7a] px-4 py-2 rounded flex items-center gap-2">
            <FaPlus /> Add Variant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
