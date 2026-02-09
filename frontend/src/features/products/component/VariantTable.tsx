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

    const remove = (i: number) => {
        onChange(value.filter((_, idx) => idx !== i));
    };

    return (
        <div>
            <div className="flex justify-between mb-2">
                <p>Variants</p>
                <button
                    type="button"
                    onClick={() =>
                        onChange([...value, { size: "", price: "", quantity: "" }])
                    }
                    className="text-blue-400"
                >
                    + Add
                </button>
            </div>

            <div className="space-y-2">
                {value.map((v, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center"
                    >
                        <input
                            placeholder="Size"
                            value={v.size}
                            onChange={e => update(i, "size", e.target.value)}
                            className="bg-[#232447] px-2 py-1 rounded min-w-0"
                        />
                        <input
                            placeholder="Price"
                            value={v.price}
                            onChange={e => update(i, "price", e.target.value)}
                            className="bg-[#232447] px-2 py-1 rounded min-w-0"
                        />
                        <input
                            placeholder="Qty"
                            value={v.quantity}
                            onChange={e => update(i, "quantity", e.target.value)}
                            className="bg-[#232447] px-2 py-1 rounded min-w-0"
                        />

                        {i > 0 && (
                            <button
                                type="button"
                                onClick={() => remove(i)}
                                className="text-red-400 text-sm h-8 w-8 flex items-center justify-center rounded bg-red-900/30 hover:bg-red-900/50"
                            >
                                −
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default VariantTable;
