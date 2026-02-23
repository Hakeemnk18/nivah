import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-6">
                <ShoppingBag size={28} className="text-[var(--muted)]" />
            </div>

            <h2 className="text-2xl font-semibold tracking-wide mb-2">
                Your cart is empty
            </h2>

            <p className="text-[var(--muted)] max-w-md text-sm">
                Looks like you haven’t added anything yet. Explore products and start
                building your premium collection.
            </p>

            <button onClick={() => navigate("/products")}
                className="mt-8 px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold hover:opacity-90 transition cursor-pointer">
                Continue Shopping
            </button>
        </div>
    );
};

export default EmptyCart;
