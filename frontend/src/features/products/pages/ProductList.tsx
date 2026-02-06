import { useEffect, useState } from "react";
import { FaTrash, FaUnlock, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import TableSearch from "../../admin/components/table/Search";
import AddButton from "../../admin/components/table/AddButton";
import TableSort from "../../admin/components/table/Sort";
import TableFilter from "../../admin/components/table/Filter";
import Pagination from "../../admin/components/table/Pagination";
import AdminBreadcrumb from "../../admin/components/AdminBreadCrumb";

import { useAdminProducts } from "../hook/use.admin.products";
import { useBlockProduct } from "../hook/use.block.product";
import { useUnblockProduct } from "../hook/use.unblock.product";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";

import ProductDetailsModal from "../component/ProductDetailsModal";
import { useParentCategories } from "../../category/hooks/use.parent.categories";
import { useAllSubCategoriesForAdmin } from "../../category/hooks/use.admin.sub.category";

/* ---------- SORT OPTIONS ---------- */
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
];

const ProductTable = () => {
  const navigate = useNavigate();
  const { data: parentCategoryRes } = useParentCategories();
  const { data: subCategoryRes } = useAllSubCategoriesForAdmin();

  const parentCategories = parentCategoryRes?.data ?? [];
  const subCategories = subCategoryRes?.data ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const [filters, setFilters] = useState<{
    isActive: string;
    parentCategoryId: string;
    subCategoryId: string;
  }>({
    isActive: "",
    parentCategoryId: "",
    subCategoryId: "",
  });

  const filterOptions = [
    {
      label: "Status",
      field: "isActive",
      options: [
        { label: "All", value: "" },
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
    },

    {
      label: "Parent Category",
      field: "parentCategoryId",
      options: [
        { label: "All", value: "" },
        ...parentCategories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        })),
      ],
    },

    {
      label: "Sub Category",
      field: "childCategoryId",
      options: [
        { label: "All", value: "" },
        ...subCategories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        })),
      ],
    },
  ];

  const { mutateAsync: blockProduct, isPending: isBlocking } =
    useBlockProduct();
  const { mutateAsync: unblockProduct, isPending: isUnblocking } =
    useUnblockProduct();

  const { data, isLoading, isFetching, isError, refetch } = useAdminProducts(
    currentPage,
    search,
    sort,
    filters,
  );

  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;
  const showFetching = isFetching && !isLoading;

  const crumbs = [{ label: "Products" }];

  /* ----- close filter/sort on change ----- */
  useEffect(() => {
    setShowFilter(false);
    setShowSort(false);
  }, [filters, sort, currentPage]);

  const handleReset = () => {
    setSearch("");
    setSort("");
    setFilters({
      isActive: "",
      parentCategoryId: "",
      subCategoryId: "",
    });
    setCurrentPage(1);
  };
  return (
    <div className="pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-0">
        <AdminBreadcrumb crumbs={crumbs} />
      </div>

      <div className="bg-[#1d1e33] p-6 rounded-xl text-white w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <h2 className="text-xl font-semibold">Products</h2>

          <div className="flex flex-wrap gap-3 items-center">
            <TableSearch search={search} setSearch={setSearch} />

            <button
              onClick={() => {
                setShowFilter(!showFilter);
                setShowSort(false);
              }}
              className="bg-[#232447] px-3 py-2 rounded-lg text-sm"
            >
              Filter
            </button>

            <button
              onClick={() => {
                setShowSort(!showSort);
                setShowFilter(false);
              }}
              className="bg-[#232447] px-3 py-2 rounded-lg text-sm"
            >
              Sort
            </button>

            <button
              onClick={handleReset}
              className="bg-[#3e3f5c] px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-[#4a4b6a]"
            >
              Reset
            </button>

            <AddButton
              label="Add Product"
              onClick={() => navigate("/admin/createProduct")}
            />
          </div>
        </div>

        {showSort && (
          <div className="relative mb-4">
            <TableSort sort={sort} setSort={setSort} options={sortOptions} />
          </div>
        )}

        {showFilter && (
          <div className="relative mb-4">
            <TableFilter
              filters={filters}
              setFilters={setFilters}
              filterOptions={filterOptions}
            />
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-gray-400 border-b border-[#2c2e4a]">
                <th className="py-3">Name</th>
                <th className="min-w-[160px]">Category</th>
                <th className="w-[100px]">Price</th>
                <th className="w-[90px]">Status</th>
                <th className="text-right w-[140px]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {showFetching ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-400">
                    Loading products...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-red-400">
                    Failed to load products
                    <button
                      onClick={() => refetch()}
                      className="ml-2 underline text-sm"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-300">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-[#2c2e4a] hover:bg-[#232447]"
                  >
                    <td className="py-3 font-medium">{item.name}</td>
                    <td className="text-gray-300">{item.category.name}</td>
                    <td>₹{item.price}</td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${item.isActive
                            ? "bg-[#1f3b7a] text-blue-300"
                            : "bg-[#3e3f5c] text-gray-300"
                          }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="flex justify-end gap-4 py-3">


                      {item.isActive ? (
                        <button
                          disabled={isBlocking || isUnblocking}
                          onClick={() =>
                            blockProduct(item.id)
                              .then(() => toast.success("Product blocked"))
                              .catch(handleApiError)
                          }
                        >
                          <FaTrash className="text-red-400" />
                        </button>
                      ) : (
                        <button
                          disabled={isBlocking || isUnblocking}
                          onClick={() =>
                            unblockProduct(item.id)
                              .then(() => toast.success("Product unblocked"))
                              .catch(handleApiError)
                          }
                        >
                          <FaUnlock className="text-yellow-400" />
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedProductId(item.id)}
                        className="px-2 py-1 text-xs rounded text-green-300 bg-[#1f3b2a] hover:bg-[#254836] transition cursor-pointer"
                      >
                        View Product
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      {selectedProductId && (
        <ProductDetailsModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
};

export default ProductTable;
