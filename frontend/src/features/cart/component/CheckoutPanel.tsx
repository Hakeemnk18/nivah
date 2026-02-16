
type CheckoutSummaryProps = {
    totalItems: number;
    totalPrice: number;
    onCheckout: () => void;
};

const CheckoutSummary = ({
    totalItems,
    totalPrice,
    onCheckout,
}: CheckoutSummaryProps) => {
    return (
        <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl bg-[var(--card)] border border-[var(--bg-secondary)] p-5 shadow-sm">
                <h3 className="text-lg font-semibold mb-5">Order Summary</h3>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-[var(--muted)]">
                        <span>Items</span>
                        <span>{totalItems}</span>
                    </div>

                    <div className="flex justify-between text-[var(--muted)]">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <div className="h-px bg-[var(--bg-secondary)] my-2" />

                    <div className="flex justify-between text-base font-semibold">
                        <span>Total</span>
                        <span className="text-[var(--accent)]">₹{totalPrice}</span>
                    </div>
                </div>

                <button
                    onClick={onCheckout}
                    className="mt-6 w-full py-3.5 rounded-xl bg-[var(--accent)] text-black font-semibold hover:opacity-90 transition shadow">
                    Checkout
                </button>
            </div>
        </aside>
    );
};

export default CheckoutSummary;
