import type { UserVariantView } from "../type/product.type";

type Props = {
    variants: UserVariantView[];
    selected: string | undefined;
    onSelect: (variantId: string) => void;
};

export function SizeSelector({ variants, selected, onSelect }: Props) {
    return (
        <div>
            <p className="text-sm mb-2">Select Size</p>
            <div className="flex gap-3">
                {variants.map((variant) => (
                    <button
                        key={variant.variantId}
                        disabled={variant.stock === 0}
                        onClick={() => onSelect(variant.variantId)}
                        className={`
  min-w-[48px] h-12 px-4 rounded-xl border text-sm font-medium transition-all
  ${selected === variant.variantId
                                ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-lg"
                                : "border-[var(--muted)] hover:border-[var(--accent)]"
                            }
  ${variant.stock === 0 ? "opacity-40 cursor-not-allowed" : ""}
`}
                    >
                        {variant.size}
                    </button>
                ))}
            </div>
        </div>
    );
}
