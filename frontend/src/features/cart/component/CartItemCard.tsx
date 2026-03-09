import { Minus, Plus, Trash2 } from "lucide-react";
import type { ActionType, CartItemView } from "../type/cart.type";

type CartItemCardProps = {
    item: CartItemView;
    handleUpdateCartItem: (action: ActionType, itemId: string) => void;
    handleRemoveCartItem: (itemId: string) => void;
};

const CartItemCard = ({ item, handleUpdateCartItem, handleRemoveCartItem }: CartItemCardProps) => {
    return (
        // Added w-full to ensure it respects the parent grid container
        <article className="w-full rounded-2xl bg-[var(--card)] border border-[var(--bg-secondary)] p-3 sm:p-4 shadow-sm hover:shadow-md transition">

            <div className="flex items-start gap-4 w-full">

                {/* Image: fixed size, shrink-0 prevents it from squishing */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-[var(--bg-secondary)]">
                    <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content: flex-1 takes remaining space, min-w-0 absolutely prevents overflow */}
                <div className="flex flex-col flex-1 min-w-0 py-0.5">

                    {/* Title: truncate handles super long text gracefully */}
                    <h3 className="font-semibold text-sm sm:text-base text-[var(--text)] truncate w-full">
                        {item.product.name}
                    </h3>

                    <p className="text-[var(--muted)] text-xs mt-0.5">
                        Size: {item.variant.size}
                    </p>

                    <p className="text-[#E5B83B] font-semibold text-sm sm:text-base mt-1">
                        ₹{item.product.price}
                    </p>

                    {/* Controls & Remove: flex-wrap lets them stack safely on tiny devices (like iPhone SE) */}
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 mt-3 w-full">

                        {/* Clean, borderless quantity controls to match your original design */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleUpdateCartItem("decrement", item.itemId)}
                                disabled={item.quantity <= 1}
                                className="text-[var(--muted)] hover:text-[var(--text)] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Minus size={16} />
                            </button>

                            <span className="text-sm font-medium text-[var(--text)] min-w-[1.5rem] text-center">
                                {item.quantity}
                            </span>

                            <button
                                onClick={() => handleUpdateCartItem("increment", item.itemId)}
                                disabled={item.quantity >= 20}
                                className="text-[var(--muted)] hover:text-[var(--text)] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => handleRemoveCartItem(item.itemId)}
                            className="flex items-center gap-1.5 text-red-500 text-xs sm:text-sm hover:opacity-80 transition cursor-pointer ml-auto"
                        >
                            <Trash2 size={14} />
                            <span>Remove</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CartItemCard;