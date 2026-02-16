import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

const Select = ({
    label,
    value,
    onChange,
    error,
    options,
    placeholder = "Select option",
}: SelectProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const selected = options.find((o) => o.value === value);

    /* close outside */
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full min-w-0" ref={ref}>
            {/* LABEL */}
            <label className="block text-xs mb-1 text-[var(--muted)] uppercase tracking-wide">
                {label}
            </label>

            {/* TRIGGER */}
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className={`
          w-full flex items-center justify-between
          rounded-lg px-3 py-2.5
          text-sm text-left
          bg-[var(--bg)]
          border transition
          focus:outline-none focus:ring-2
          focus:ring-[var(--accent)]
          ${error
                        ? "border-red-500"
                        : "border-[var(--footer-border)] hover:border-[var(--accent)]/40"
                    }
        `}
            >
                <span
                    className={`truncate ${selected ? "text-[var(--text)]" : "text-[var(--muted)]"
                        }`}
                >
                    {selected ? selected.label : placeholder}
                </span>

                <ChevronDown
                    size={16}
                    className={`text-[var(--muted)] transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* DROPDOWN */}
            <div
                className={`
          absolute z-50 mt-2 w-full
          bg-[var(--card)]
          border border-[var(--footer-border)]
          rounded-xl shadow-xl overflow-hidden
          transition-all duration-200
          ${open
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-2 invisible"
                    }
        `}
            >
                <div className="max-h-60 overflow-y-auto no-scrollbar">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setOpen(false);
                            }}
                            className={`
                w-full text-left px-4 py-2.5 text-sm
                hover:bg-[var(--bg-secondary)]
                transition-colors
                ${value === option.value
                                    ? "text-[var(--accent)] font-medium"
                                    : "text-[var(--text)]"
                                }
              `}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ERROR */}
            {error && (
                <p className="text-xs text-red-400 mt-1">{error}</p>
            )}
        </div>
    );
};

export default Select;
