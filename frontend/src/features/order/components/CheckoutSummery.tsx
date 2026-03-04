
import type { CheckoutView } from "../../cart/type/cart.type";
import Row from "./CheckoutRaw";
import CheckoutItem from "./CkeckoutItem";

interface CheckoutSummaryProps {
    checkout: CheckoutView;
    onPlaceOrder: () => void;
}

const CheckoutSummary = ({ checkout, onPlaceOrder }: CheckoutSummaryProps) => {
    return (
        <aside className="lg:sticky lg:top-6">
            <div className="bg-[var(--card)] border border-[var(--footer-border)] rounded-2xl p-5 flex flex-col h-[560px]">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                {/* SCROLLABLE ITEMS */}
                <div className="flex-1 overflow-y-auto no-scrollbar pr-1 space-y-3">
                    {checkout.items.map((item, idx) => (
                        <CheckoutItem key={idx} item={item} />
                    ))}
                </div>

                {/* TOTAL SECTION - FIXED */}
                <div className="pt-4 border-t border-[var(--footer-border)] space-y-2 mt-4">
                    <Row label="Subtotal" value={`₹${checkout.subTotal}`} />
                    <Row
                        label="Shipping"
                        value={
                            checkout.deliveryCharge === 0
                                ? "Free"
                                : `₹${checkout.deliveryCharge}`
                        }
                    />
                    <Row
                        label="Total"
                        value={`₹${checkout.total}`}
                        strong
                    />

                    <button
                        onClick={onPlaceOrder}
                        className="w-full mt-3 bg-[var(--accent)] text-black font-semibold rounded-xl py-3 hover:opacity-90 transition cursor-pointer">
                        Place Order
                    </button>

                    <p className="text-xs text-center text-[var(--muted)] mt-2">
                        Secure payment via Razorpay
                    </p>
                </div>
            </div>
        </aside>
    );
}

export default CheckoutSummary;
