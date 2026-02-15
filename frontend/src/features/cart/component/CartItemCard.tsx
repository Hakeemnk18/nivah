import { Minus, Plus, Trash2 } from "lucide-react";
import type { ActionType, CartItemView } from "../type/cart.type";

type CartItemCardProps = {
    item: CartItemView;
    handleUpdateCartItem: (action: ActionType, itemId: string) => void;
    handleRemoveCartItem: (itemId: string) => void;
};

const CartItemCard = ({ item, handleUpdateCartItem, handleRemoveCartItem }: CartItemCardProps) => {
    return (
        <article className="rounded-2xl bg-[var(--card)] border border-[var(--bg-secondary)] p-4 sm:p-5 shadow-sm hover:shadow-md transition">
            <div className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0">
                    <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate">
                        {item.product.name}
                    </h3>

                    <p className="text-[var(--muted)] text-xs mt-1">
                        Variant: {item.variantId}
                    </p>

                    <p className="text-[var(--accent)] font-semibold mt-2">
                        ₹{item.product.price}
                    </p>

                    {/* Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                        <div className="flex items-center border border-[var(--bg-secondary)] rounded-xl overflow-hidden">
                            <button
                                onClick={() => handleUpdateCartItem("decrement", item.itemId)}
                                className="px-3 py-1.5 hover:bg-[var(--bg-secondary)] transition cursor-pointer">
                                <Minus size={14} />
                            </button>

                            <span className="px-4 text-sm font-medium">
                                {item.quantity}
                            </span>

                            <button
                                onClick={() => handleUpdateCartItem("increment", item.itemId)}
                                className="px-3 py-1.5 hover:bg-[var(--bg-secondary)] transition cursor-pointer">
                                <Plus size={14} />
                            </button>
                        </div>

                        <button
                            onClick={() => handleRemoveCartItem(item.itemId)}
                            className="flex items-center gap-1 text-red-500 text-sm hover:opacity-80 transition cursor-pointer">
                            <Trash2 size={14} />
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CartItemCard;
