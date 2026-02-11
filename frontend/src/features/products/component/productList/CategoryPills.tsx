type Props = {
    items: { id: string; name: string }[];
    activeId?: string;
    onSelect: (id: string) => void;
    variant?: "parent" | "child";
};



export default function CategoryPills({
    items,
    activeId,
    onSelect,
    variant = "parent",
}: Props) {
    const isParent = variant === "parent";

    return (
        <div className="relative">
            <div
                className="
          flex gap-3 overflow-x-auto no-scrollbar
          pb-2
        "
            >
                {items.map((item) => {
                    const active = activeId === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            className={`
                whitespace-nowrap
                px-4 py-2
                rounded-full
                text-sm font-medium
                transition-all duration-200
                border
                ${active
                                    ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-md"
                                    : isParent
                                        ? "border-[var(--card)] bg-[var(--card)] text-[var(--text)] hover:border-[var(--accent)]"
                                        : "border-transparent bg-transparent text-[var(--muted)] hover:text-[var(--text)]"
                                }
              `}
                        >
                            {item.name}
                        </button>
                    );
                })}
            </div>

            {/* subtle fade effect on right */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[var(--bg)] to-transparent" />
        </div>
    );
}
