import { useState } from "react";
import { FaEdit, FaTrash, FaUnlock, FaEye } from "react-icons/fa";

import TableSearch from "../../admin/components/table/Search";
import AddButton from "../../admin/components/table/AddButton";
import TableSort from "../../admin/components/table/Sort";
import Pagination from "../../admin/components/table/Pagination";

import { useAdminCategories } from "../hooks/use.admin.categories";
import TableFilter from "../../admin/components/table/Filter";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const CategoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

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

  const { data, isLoading, isFetching, isError, error, refetch } =
    useAdminCategories(currentPage, search, sort, filters);

  const categories = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;
  const showFetching = isFetching && !isLoading;
  /* ---------- handlers ---------- */
  const handleEdit = (id: string) => {
    console.log("edit", id);
  };

  const handleBlock = (id: string) => {
    console.log("block", id);
  };

  const handleUnblock = (id: string) => {
    console.log("unblock", id);
  };

  const handleViewSub = (id: string) => {
    console.log("view sub", id);
  };

  const handleAdd = () => {
    console.log("add category");
  };

  return (
    <div className="pt-32 pb-20">
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
                <th className="py-3">Name</th>
                <th>Description</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
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

                    <td className="flex justify-end gap-4 py-3">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="cursor-pointer"
                      >
                        <FaEdit className="text-blue-400" />
                      </button>

                      {item.isActive ? (
                        <button
                          onClick={() => handleBlock(item.id)}
                          className="cursor-pointer"
                        >
                          <FaTrash className="text-red-400" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnblock(item.id)}
                          className="cursor-pointer"
                        >
                          <FaUnlock className="text-yellow-400" />
                        </button>
                      )}

                      <button
                        onClick={() => handleViewSub(item.id)}
                        className="px-2 py-1 text-xs rounded text-green-300 bg-[#1f3b2a] hover:bg-[#254836] transition cursor-pointer"
                      >
                        Subcategories
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
    </div>
  );
};

export default CategoryTable;
