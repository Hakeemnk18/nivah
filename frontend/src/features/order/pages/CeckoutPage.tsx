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

const CheckoutPage = () => {
    const guestId = getGuestId()
    const { data: checkoutData, isLoading: isCheckoutLoading, isError: isCheckoutError } = useGetCheckoutItems(guestId);
    const checkoutSummary = checkoutData?.data;
    const checkoutItems = checkoutSummary?.items || [];
    const [formData, setFormData] = useState<OrderFormData>({
        name: "",
        email: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [errors, setErrors] = useState<OrderFormErrors>({});

    const handleChange = (
        field: keyof OrderFormData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // clear field error while typing
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = () => {
        const newErrors = validateCheckoutForm(formData);

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        // 🔥 PLACE ORDER LOGIC LATER
        console.log("valid form", formData);
    };

    return (
        <section className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* TITLE */}

                <SectionTitle label="Checkout" />
                {/* LOADING */}
                {isCheckoutLoading && <CheckoutSkeleton />}

                {/* ERROR */}
                {!isCheckoutLoading && isCheckoutError && <CheckoutError />}

                {!isCheckoutLoading && !isCheckoutError && checkoutItems.length === 0 && <EmptyCart />}

                {/* SUCCESS */}
                {!isCheckoutLoading && !isCheckoutError && checkoutItems.length > 0 && checkoutSummary && (
                    <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
                        {/* LEFT — FORM */}
                        <CheckoutForm
                            formData={formData}
                            errors={errors}
                            onChange={handleChange}
                        />

                        {/* RIGHT — SUMMARY */}
                        <CheckoutSummary
                            onPlaceOrder={handleSubmit}
                            checkout={checkoutSummary} />
                    </div>
                )}
            </div>
        </section>
    );
}

export default CheckoutPage;