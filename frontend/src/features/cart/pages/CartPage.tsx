import SectionTitle from "../../../shared/components/SectionTitle";
import { demoCart } from "../../../shared/data/sample.cart";
import CartErrorState from "../component/CartErrorState";
import CartItemCard from "../component/CartItemCard";
import CartItemSkeleton from "../component/CartItemSckelton";
import CheckoutSummary from "../component/CheckoutPanel";
import EmptyCart from "../component/EmptyCart";

const CartPage: React.FC = () => {
    // DEMO STATES (no hooks/api as requested)
    const isLoading = false;
    const isError = false;
    const cart = demoCart;

    return (
        <section className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4">
                <SectionTitle label="Your Cart" />

                {/* Loading */}
                {isLoading && !isError && (
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <CartItemSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Error */}
                {isError && !isLoading && (
                    <CartErrorState />
                )}

                {/* Empty */}
                {!isLoading && !isError && cart.items.length === 0 && <EmptyCart />}

                {/* SUCCESS STATE */}
                {!isLoading && !isError && cart.items.length > 0 && (
                    <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
                        {/* LEFT — ITEMS */}
                        <div className="space-y-4">
                            {cart.items.map((item) => (
                                <CartItemCard key={item.id} item={item} />
                            ))}
                        </div>

                        {/* RIGHT — STICKY SUMMARY */}
                        <CheckoutSummary
                            totalItems={cart.totalItems}
                            totalPrice={cart.totalPrice}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default CartPage;