import type { CheckoutItemView } from "../../cart/type/cart.type";


const CheckoutItem = ({ item }: { item: CheckoutItemView }) => {
    return (
        <div className="flex items-center gap-3 bg-[var(--bg-secondary)] rounded-xl p-2">
            <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-lg object-cover"
            />

            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-[var(--muted)]">
                    Size {item.size} • Qty {item.quantity}
                </p>
            </div>

            <p className="text-sm font-semibold whitespace-nowrap">
                ${item.price}
            </p>
        </div>
    );
}

export default CheckoutItem;
