import SectionTitle from "../../../shared/components/SectionTitle";
import { getGuestId } from "../../../shared/utils/guest";
import CartErrorState from "../component/CartErrorState";
import CartItemCard from "../component/CartItemCard";
import CartItemSkeleton from "../component/CartItemSckelton";
import CheckoutSummary from "../component/CheckoutPanel";
import EmptyCart from "../component/EmptyCart";
import { useGetCartItems } from "../hooks/use.get.cart.item";
import { useRemoveCartItem } from "../hooks/use.remove.cart.item";
import { useUpdateCartItem } from "../hooks/use.update.cart.item";
import type { ActionType } from "../type/cart.type";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
    const guestId = getGuestId();
    const { data: cartData, isLoading: cartLoading, isError: cartError } = useGetCartItems(guestId);
    const { mutate: updateCartItem } = useUpdateCartItem();
    const { mutate: removeCartItem } = useRemoveCartItem();
    const navigate = useNavigate();
    const cart = cartData?.data;

    const handleUpdateCartItem = async (action: ActionType, itemId: string) => {

        await updateCartItem({
            guestId,
            cartId: cart?.id!,
            itemId,
            action,
        });


    };

    const handleRemoveCartItem = async (itemId: string) => {
        await removeCartItem({
            guestId,
            cartId: cart?.id!,
            itemId,
        });
    };


    return (
        <section className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4">
                <SectionTitle label="Your Cart" />

                {/* Loading */}
                {cartLoading && !cartError && (
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <CartItemSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Error */}
                {cartError && !cartLoading && (
                    <CartErrorState />
                )}

                {/* Empty */}
                {!cartLoading && !cartError && cart && cart.items.length === 0 && <EmptyCart />}

                {/* SUCCESS STATE */}
                {!cartLoading && !cartError && cart && cart.items.length > 0 && (
                    <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
                        {/* LEFT — ITEMS */}
                        <div className="space-y-4">
                            {cart.items.map((item) => (
                                <CartItemCard
                                    handleUpdateCartItem={handleUpdateCartItem}
                                    handleRemoveCartItem={handleRemoveCartItem}
                                    key={item.itemId} item={item} />
                            ))}
                        </div>

                        {/* RIGHT — STICKY SUMMARY */}
                        <CheckoutSummary
                            onCheckout={() => navigate("/checkout")}
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