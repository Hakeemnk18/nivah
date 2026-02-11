type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
    return (
        <input
            type="text"
            placeholder="Search products..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-[var(--card)] border border-[var(--muted)] px-4 py-2 text-sm rounded-lg w-full sm:w-64"
        />
    );
}
