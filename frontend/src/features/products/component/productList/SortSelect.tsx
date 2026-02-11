type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function SortSelect({ value, onChange }: Props) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-[var(--card)] border border-[var(--muted)] px-4 py-2 text-sm rounded-lg"
        >
            <option value="newest">Sort by Newest</option>
            <option value="oldest">Sort by Oldest</option>
            <option value="price_low_high">Price: Low to High</option>
            <option value="price_high_low">Price: High to Low</option>
        </select>
    );
}
