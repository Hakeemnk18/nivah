import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="relative w-full sm:w-72">
      {/* Icon */}
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none"
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search jewellery..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          bg-[var(--card)]
          border border-[var(--muted)]
          rounded-xl
          pl-10 pr-4
          py-2.5
          text-sm
          text-[var(--text)]
          placeholder:text-[var(--muted)]
          outline-none
          transition-all duration-300
          focus:border-[var(--accent)]
          focus:ring-2 focus:ring-[var(--accent)]/20
        "
      />
    </div>
  );
}
