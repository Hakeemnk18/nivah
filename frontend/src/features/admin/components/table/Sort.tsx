interface SortOption {
  label: string;
  value: string;
}

interface TableSortProps {
  sort: string;
  setSort: (val: string) => void;
  options: SortOption[];
  title?: string;
}

const TableSort = ({
  sort,
  setSort,
  options,
  title = "Sort by",
}: TableSortProps) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-[rgba(28,29,53,0.6)] border border-gray-700 rounded-lg shadow-lg p-4 z-50 text-white backdrop-blur">
      <label className="block mb-2 text-sm text-gray-300">
        {title}
      </label>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full p-2 rounded bg-[#3b3f63] text-sm text-white outline-none focus:ring-1 focus:ring-[#3b3c79]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableSort;
