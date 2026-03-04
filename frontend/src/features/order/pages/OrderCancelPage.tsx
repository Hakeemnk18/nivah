import { useNavigate, useSearchParams } from "react-router-dom";
import SectionTitle from "../../../shared/components/SectionTitle";

const OrderCancelledPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    return (
        <section className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-10 flex items-center">
            <div className="max-w-4xl mx-auto px-4 w-full">
                <SectionTitle label="Order Cancelled" />

                <div className="mt-10 bg-[var(--card)] border border-[var(--footer-border)] rounded-2xl p-6 sm:p-10 text-center shadow-sm">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-red-500/10 flex items-center justify-center text-3xl sm:text-4xl">
                            ❌
                        </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                        Your order was not completed
                    </h2>

                    {orderId && (
                        <p className="text-sm sm:text-base text-[var(--muted)] mb-4 break-all">
                            Order ID: {orderId}
                        </p>
                    )}

                    <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-xl mx-auto">
                        It looks like your payment was unsuccessful or the order was cancelled.
                        You can try again by returning to the checkout page.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate("/checkout")}
                            className="px-6 py-3 rounded-2xl bg-[var(--accent)] text-black font-semibold text-sm tracking-wide hover:opacity-90 transition cursor-pointer"
                        >
                            Back to Checkout
                        </button>

                        <button
                            onClick={() => navigate("/products")}
                            className="px-6 py-3 rounded-2xl border border-[var(--footer-border)] bg-[var(--bg-secondary)] text-[var(--text)] font-medium text-sm hover:opacity-90 transition cursor-pointer"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderCancelledPage;
