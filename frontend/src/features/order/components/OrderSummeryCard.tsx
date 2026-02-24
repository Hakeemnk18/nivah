import type { OrderSummaryView } from "../types/order.type";

interface OrderSummaryCardProps {
    order: OrderSummaryView;
    onDownloadInvoice: () => void;
    isDownloading: boolean;
}

const OrderSummaryCard = ({ order, onDownloadInvoice, isDownloading }: OrderSummaryCardProps) => {

    return (
        <aside className="lg:sticky lg:top-6">

            <div className="bg-[var(--card)] border border-[var(--bg-secondary)] rounded-2xl p-5 flex flex-col">

                {/* HEADER */}
                <div className="mb-5">
                    <h3 className="text-lg font-semibold">
                        Order Summary
                    </h3>

                    <p className="text-sm text-[var(--muted)] mt-1">
                        Order No: {order.orderNumber}
                    </p>
                </div>

                {/* PRICE DETAILS */}
                <div className="space-y-3 text-sm">

                    <div className="flex justify-between text-[var(--muted)]">
                        <span>Subtotal</span>
                        <span className="text-[var(--text)]">
                            ₹{order.subtotal}
                        </span>
                    </div>

                    <div className="flex justify-between text-[var(--muted)]">
                        <span>Shipping</span>
                        <span className="text-[var(--text)]">
                            {order.shippingFee === 0
                                ? "Free"
                                : `₹${order.shippingFee}`}
                        </span>
                    </div>

                    <div className="border-t border-[var(--bg-secondary)] pt-3 flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span className="text-[var(--text)]">
                            ₹{order.totalAmount}
                        </span>
                    </div>
                </div>

                {/* ACTION */}
                <button
                    onClick={onDownloadInvoice}
                    disabled={isDownloading}
                    className="w-full mt-6 bg-[var(--accent)] text-black font-semibold rounded-xl py-3 hover:opacity-90 transition"
                >
                    {isDownloading ? "Downloading..." : "Download Invoice"}
                </button>

                <p className="text-xs text-center text-[var(--muted)] mt-3">
                    Invoice includes tax breakdown & order details
                </p>

            </div>
        </aside>
    );
};

export default OrderSummaryCard;