interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  label: string;
  field: string;
  options: FilterOption[];
}

interface TableFilterProps<T extends Record<string, any>> {
  filters: T;
  setFilters: (filters: T) => void;
  filterOptions: FilterConfig[];
}

const TableFilter = <T extends Record<string, any>>({
  filters,
  setFilters,
  filterOptions,
}: TableFilterProps<T>) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-[rgba(28,29,53,0.6)] border border-gray-700 rounded-lg shadow-lg p-4 z-50 text-white backdrop-blur">
      {filterOptions.map((filter) => (
        <div key={filter.field} className="mb-4 last:mb-0">
          <label className="block mb-1 text-sm text-gray-300">
            {filter.label}
          </label>

          <select
            value={filters[filter.field] ?? ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                [filter.field]: e.target.value,
              })
            }
            className="w-full p-2 rounded bg-[#3b3f63] text-sm text-white outline-none focus:ring-1 focus:ring-[#3b3c79]"
          >
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default TableFilter;
