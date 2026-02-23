import type { OrderItemView } from "../types/order.type";

interface OrderItemsCardProps {
    items: OrderItemView[];
}

const OrderItemsCard = ({ items }: OrderItemsCardProps) => {
    return (
        <div className="bg-[var(--card)] border border-[var(--bg-secondary)] rounded-2xl p-5">

            {/* TITLE */}
            <h3 className="text-lg font-semibold mb-4">
                Order Items
            </h3>

            {/* SCROLLABLE AREA */}
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 no-scrollbar">

                {items.map((item) => (
                    <div
                        key={item.variantId}
                        className="flex justify-between items-start border-b border-[var(--bg-secondary)] pb-4"
                    >

                        {/* LEFT */}
                        <div className="flex flex-col gap-1">
                            <p className="font-medium text-[var(--text)]">
                                {item.name}
                            </p>

                            <p className="text-sm text-[var(--muted)]">
                                Size: {item.size}
                            </p>

                            <p className="text-sm text-[var(--muted)]">
                                Qty: {item.quantity}
                            </p>
                        </div>

                        {/* RIGHT */}
                        <div className="text-right">
                            <p className="font-semibold text-[var(--text)]">
                                ₹{item.price * item.quantity}
                            </p>

                            <p className="text-xs text-[var(--muted)]">
                                ₹{item.price} each
                            </p>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default OrderItemsCard;