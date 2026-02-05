import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUnlock } from "react-icons/fa";

import TableSearch from "../../admin/components/table/Search";
import AddButton from "../../admin/components/table/AddButton";
import TableSort from "../../admin/components/table/Sort";
import Pagination from "../../admin/components/table/Pagination";

import { useAdminCategories } from "../hooks/use.admin.categories";
import TableFilter from "../../admin/components/table/Filter";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminBreadcrumb from "../../admin/components/AdminBreadCrumb";
import { useBlockCategory } from "../hooks/use.block.category";
import { useUnblockCategory } from "../hooks/use.unblock.category";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import toast from "react-hot-toast";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const CategoryTable = () => {
  const [searchParams] = useSearchParams();
  let parentId = searchParams.get("parentId");
  if (!parentId) parentId = null;

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { mutateAsync: blockCategoryMutate, isPending: isBlocking } =
    useBlockCategory();
  const { mutateAsync: unblockCategoryMutate, isPending: isUnblocking } =
    useUnblockCategory();
  const crumbs = parentId
    ? [
        { label: "Categories", to: "/admin/categoryManagement" },
        { label: "Subcategories" },
      ]
    : [{ label: "Categories" }];

  const [filters, setFilters] = useState<{
    isActive: string;
  }>({
    isActive: "",
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
  ];

  const { data, isLoading, isFetching, isError, refetch } = useAdminCategories(
    parentId,
    currentPage,
    search,
    sort,
    filters,
  );

  const categories = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;
  const showFetching = isFetching && !isLoading;

  /* ----- set params when parentId changes */
  useEffect(() => {
    setCurrentPage(1);
    setSearch("");
    setSort("");
    setFilters({
      isActive: "",
    });
  }, [parentId]);

  /* ----- close filter/sort on change ----- */
  useEffect(() => {
    setShowFilter(false);
    setShowSort(false);
  }, [filters, sort, currentPage]);

  /* ---- reset ---- */
  const handleReset = () => {
    setSearch("");
    setSort("");
    setFilters({
      isActive: "",
    });
    setCurrentPage(1);
  };

  /* ---------- handlers ---------- */
  const handleEdit = (id: string) => {
    navigate(`/admin/editCategory?categoryId=${id}`);
  };

  const handleBlock = async (id: string) => {
    try {
      await blockCategoryMutate(id);
      toast.success("Category blocked successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUnblock = async (id: string) => {
    try {
      await unblockCategoryMutate(id);
      toast.success("Category unblocked successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleAdd = () => {
    navigate("/admin/createCategory");
  };

  return (
    <div className="pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-0">
        <AdminBreadcrumb crumbs={crumbs} />
      </div>

      <div className="bg-[#1d1e33]  p-6 rounded-xl text-white w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <h2 className="text-xl font-semibold">Categories</h2>

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

            <AddButton label="Add Category" onClick={handleAdd} />
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
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left text-gray-400 border-b border-[#2c2e4a]">
                {/* Name */}
                <th className="py-3 w-[160px] sm:w-[200px] md:w-[220px]">
                  Name
                </th>

                {/* Description */}
                <th className="min-w-[200px]">Description</th>

                {/* Status */}
                <th className="w-[90px] sm:w-[110px] md:w-[120px]">Status</th>

                {/* Actions */}
                <th className="text-center sm:text-right w-[80px] sm:w-[120px] md:w-[160px]">
                  <span className="hidden sm:inline">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {showFetching ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-400">
                    Loading categories...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-red-400">
                    Failed to load categories
                    <button
                      onClick={() => refetch()}
                      className="ml-2 underline text-sm"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-300">
                    No categories found
                  </td>
                </tr>
              ) : (
                categories.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-[#2c2e4a] hover:bg-[#232447]"
                  >
                    
                    <td className="py-3 font-medium">{item.name}</td>
                    <td className="text-gray-300">{item.description || "-"}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.isActive
                            ? "bg-[#1f3b7a] text-blue-300"
                            : "bg-[#3e3f5c] text-gray-300"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="flex justify-end  py-3 sm:justify-end gap-3 sm:gap-4 min-w-[80px] sm:min-w-[160px]">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="cursor-pointer"
                      >
                        <FaEdit className="text-blue-400" />
                      </button>

                      {item.isActive ? (
                        <button
                          disabled={isBlocking || isUnblocking}
                          onClick={() => handleBlock(item.id)}
                          className="cursor-pointer w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center"
                        >
                          <FaTrash className="text-red-400" />
                        </button>
                      ) : (
                        <button
                          disabled={isBlocking || isUnblocking}
                          onClick={() => handleUnblock(item.id)}
                          className="cursor-pointer w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center"
                        >
                          <FaUnlock className="text-yellow-400" />
                        </button>
                      )}
                      {parentId === null && (
                        <button
                          onClick={() => {
                            navigate(
                              `/admin/subCategoryManagement?parentId=${item.id}`,
                            );
                          }}
                          className="px-2 py-1 text-xs rounded text-green-300 bg-[#1f3b2a] hover:bg-[#254836] transition cursor-pointer"
                        >
                          Subcategories
                        </button>
                      )}
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
    </div>
  );
};

export default CategoryTable;
