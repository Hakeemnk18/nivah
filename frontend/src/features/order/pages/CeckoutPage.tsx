import { useState } from "react";
import SectionTitle from "../../../shared/components/SectionTitle";
import CheckoutError from "../components/CheckooutError";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutSkeleton from "../components/CheckoutSckelton";
import CheckoutSummary from "../components/CheckoutSummery";
import type { OrderFormData, OrderFormErrors } from "../types/order.type";
import { validateCheckoutForm } from "../utils/checkout.form.validation";
import EmptyCart from "../../cart/component/EmptyCart";
import { useGetCheckoutItems } from "../../cart/hooks/use.get.checkout.item";
import { getGuestId } from "../../../shared/utils/guest";
import { useCreateOrder } from "../hooks/use.create.order";
import { handleApiError } from "../../../shared/utils/handle.api.error";
import { openRazorpayCheckoutFunction, openRazorpayCheckoutTestFunction } from "../../../shared/utils/razorpay";
import { verifyPaymentApi } from "../api/order.api";
import { useNavigate } from "react-router-dom";

// ─── Flip VITE_PAYMENT_MODE in frontend/.env  ───────────────────────────────
//   test  → calls verify-payment right after popup (no webhook needed locally)
//   live  → current production flow (webhook confirms the order)
// ────────────────────────────────────────────────────────────────────────────
const IS_TEST_MODE = import.meta.env.VITE_PAYMENT_MODE === "test";

const CheckoutPage = () => {
    const guestId = getGuestId()
    const { data: checkoutData, isLoading: isCheckoutLoading, isError: isCheckoutError } = useGetCheckoutItems(guestId);
    const { mutateAsync: createOrder } = useCreateOrder();
    const navigate = useNavigate()
    const checkoutSummary = checkoutData?.data;
    const checkoutItems = checkoutSummary?.items || [];
    const [formData, setFormData] = useState<OrderFormData>({
        name: "Lakshay Kumar",
        email: "lakshaykumar@example.com",
        phone: "9555555555",
        addressLine1: "california street 123",
        addressLine2: "United States",
        city: "New York",
        state: "New York",
        pincode: "673816",
        acceptedTerms: false,
    });
    const [errors, setErrors] = useState<OrderFormErrors>({});

    const handleChange = (
        field: keyof OrderFormData,
        value: string | boolean
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };


    const handlePaymentSuccess = async (orderId: string) => {
        console.log("handled payment called")
        navigate(`/order-status/${orderId}`)
    }

    const handleSubmit = async () => {
        const newErrors = validateCheckoutForm(formData);

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        try {
            const res = await createOrder({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                cartId: checkoutSummary?.cartId!,
                guestId: guestId,
                acceptedTerms: formData.acceptedTerms,
            });

            if (IS_TEST_MODE) {
                // TEST MODE: verify-payment called immediately after popup
                // so the order is confirmed without waiting for a webhook
                openRazorpayCheckoutTestFunction(
                    res?.data!,
                    handlePaymentSuccess,
                    verifyPaymentApi,
                );
            } else {
                // LIVE MODE: current production flow — webhook confirms the order
                openRazorpayCheckoutFunction(res?.data!, handlePaymentSuccess);
            }

        } catch (error) {
            const validateError = handleApiError(error);
            if (validateError) {
                setErrors(validateError);
            }
        }

    };

    return (
        <section className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-6 lg:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                {/* TITLE */}
                <SectionTitle label="Checkout" />

                {/* LOADING */}
                {isCheckoutLoading && <CheckoutSkeleton />}

                {/* ERROR */}
                {!isCheckoutLoading && isCheckoutError && <CheckoutError />}

                {!isCheckoutLoading && !isCheckoutError && checkoutItems.length === 0 && <EmptyCart />}

                {/* SUCCESS */}
                {!isCheckoutLoading && !isCheckoutError && checkoutItems.length > 0 && checkoutSummary && (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start w-full">
                        {/* LEFT — FORM */}
                        <div className="w-full min-w-0">
                            <CheckoutForm
                                formData={formData}
                                errors={errors}
                                onChange={handleChange}
                            />
                        </div>

                        {/* RIGHT — SUMMARY */}
                        <div className="w-full min-w-0">
                            <CheckoutSummary
                                onPlaceOrder={handleSubmit}
                                checkout={checkoutSummary}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default CheckoutPage;