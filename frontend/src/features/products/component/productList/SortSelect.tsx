import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const options = [
  { label: "Sort by Newest", value: "newest" },
  { label: "Sort by Oldest", value: "oldest" },
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
];

export default function SortSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full sm:w-60">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-2
bg-[var(--card)] border border-[var(--muted)] 
px-3 py-1.5 rounded-lg text-xs sm:text-sm
hover:border-[var(--text)] transition-all duration-200"
      >
        <span className="block sm:inline truncate max-w-[110px] sm:max-w-none">
          {selected?.label}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute z-50 mt-2 w-full bg-[var(--card)] 
        border border-[var(--muted)] rounded-xl shadow-xl
        overflow-hidden transition-all duration-200
        ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        }`}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              onChange(option.value);
              setOpen(false);
            }}
            className={`w-full text-left px-4 py-3 text-sm 
              hover:bg-[var(--bg)] transition-colors
              ${
                value === option.value
                  ? "text-[var(--accent)] font-medium"
                  : "text-[var(--text)]"
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
