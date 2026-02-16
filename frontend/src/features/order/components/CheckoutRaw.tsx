const Row = ({
    label,
    value,
    strong,
}: {
    label: string;
    value: string;
    strong?: boolean;
}) => {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className={strong ? "font-semibold" : "text-[var(--muted)]"}>
                {label}
            </span>
            <span className={strong ? "font-semibold text-base" : ""}>
                {value}
            </span>
        </div>
    );
}

export default Row;