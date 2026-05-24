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
        // Added `overflow-x-hidden` to clip anything pushing the layout wide, removing the white gap.
        <section className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-8 md:py-10 w-full overflow-x-hidden">

            {/* Increased padding from px-4 to px-6 (and sm:px-8) to give left/right breathing space */}
            {/* Added `box-border` to ensure padding is calculated securely within the w-full constraint */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full box-border">
                <SectionTitle label="Your Cart" />

                {/* Loading */}
                {cartLoading && !cartError && (
                    <div className="space-y-4 w-full mt-6">
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
                    // Explicit grid-cols-1 for mobile forces items to stack without stretching the screen
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start w-full mt-6">

                        {/* LEFT — ITEMS */}
                        <div className="space-y-4 w-full min-w-0">
                            {cart.items.map((item) => (
                                <CartItemCard
                                    handleUpdateCartItem={handleUpdateCartItem}
                                    handleRemoveCartItem={handleRemoveCartItem}
                                    key={item.itemId}
                                    item={item}
                                />
                            ))}
                        </div>

                        {/* RIGHT — STICKY SUMMARY */}
                        <div className="w-full min-w-0 lg:sticky lg:top-24">
                            <CheckoutSummary
                                onCheckout={() => navigate("/checkout")}
                                totalItems={cart.totalItems}
                                totalPrice={cart.totalPrice}
                                deliveryCharge={cart.deliveryCharge}
                                total={cart.total}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CartPage;