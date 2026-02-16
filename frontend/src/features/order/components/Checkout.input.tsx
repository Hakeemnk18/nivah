
interface InputProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}

const Input = ({
    label,
    value,
    onChange,
    error,
}: InputProps) => {
    return (
        <div>
            <label className="block text-xs mb-1 text-[var(--muted)]">
                {label}
            </label>

            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full rounded-lg px-3 py-2 bg-[var(--bg)]
          border ${error
                        ? "border-red-500"
                        : "border-[var(--footer-border)]"
                    } focus:outline-none`}
            />

            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        </div>
    );
};
export default Input;