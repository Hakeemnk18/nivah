import { FaSearch, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

interface TableSearchProps {
  search: string;
  setSearch: (val: string) => void;
  placeholder?: string;
  debounceMs?: number; // optional
}

const TableSearch = ({
  search,
  setSearch,
  placeholder = "Search",
  debounceMs = 300,
}: TableSearchProps) => {
  const [localValue, setLocalValue] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localValue);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [localValue, debounceMs, setSearch]);

  useEffect(() => {
    setLocalValue(search);
  }, [search]);

  return (
    <div className="flex items-center bg-[#232447] px-3 py-2 rounded-lg gap-2 w-full sm:w-auto">
      <FaSearch className="text-gray-400 text-sm" />

      <input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setLocalValue("");
            setSearch("");
          }
        }}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
      />

      {localValue && (
        <button
          onClick={() => {
            setLocalValue("");
            setSearch("");
          }}
          className="text-gray-400 hover:text-white transition"
        >
          <FaTimes className="text-xs" />
        </button>
      )}
    </div>
  );
};

export default TableSearch;
