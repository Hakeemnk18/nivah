type Props = {
    value: number;
    onChange: (value: number) => void;
    maxQuantity: number;
};

export function QuantitySelector({ value, onChange, maxQuantity }: Props) {
    return (
        <div className="flex items-center gap-4">
            <button
                onClick={() => onChange(Math.max(1, value - 1))}
                className="w-10 h-10 border border-[var(--muted)] rounded-lg hover:border-[var(--accent)] transition"
            >
                -
            </button>

            <span className="text-lg font-medium w-6 text-center">{value}</span>

            <button
                disabled={value >= maxQuantity}
                onClick={() => onChange(value + 1)}
                className="w-10 h-10 border border-[var(--muted)] rounded-lg hover:border-[var(--accent)] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                +
            </button>
        </div>
    );
}
