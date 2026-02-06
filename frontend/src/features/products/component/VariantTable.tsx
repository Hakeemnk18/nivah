type Variant = {
    size: string;
    price: string;
    quantity: string;
};

type Props = {
    value: Variant[];
    onChange: (v: Variant[]) => void;
    error?: string;
};

const VariantTable = ({ value, onChange, error }: Props) => {
    const update = (i: number, field: keyof Variant, val: string) => {
        const updated = [...value];
        updated[i][field] = val;
        onChange(updated);
    };

    return (
        <div>
            <div className="flex justify-between mb-2">
                <p>Variants</p>
                <button
                    type="button"
                    onClick={() => onChange([...value, { size: "", price: "", quantity: "" }])}
                    className="text-blue-400"
                >
                    + Add
                </button>
            </div>

            <div className="space-y-2">
                {value.map((v, i) => (
                    <div key={i} className="grid grid-cols-3 gap-2">
                        <input placeholder="Size" value={v.size} onChange={e => update(i, "size", e.target.value)} className="bg-[#232447] px-2 py-1 rounded" />
                        <input placeholder="Price" value={v.price} onChange={e => update(i, "price", e.target.value)} className="bg-[#232447] px-2 py-1 rounded" />
                        <input placeholder="Qty" value={v.quantity} onChange={e => update(i, "quantity", e.target.value)} className="bg-[#232447] px-2 py-1 rounded" />
                    </div>
                ))}
            </div>

            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default VariantTable;
