import { useState } from "react";
import SectionTitle from "../../../shared/components/SectionTitle";
import { checkoutData } from "../../../shared/data/sample.checkout";
import CheckoutError from "../components/CheckooutError";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutSkeleton from "../components/CheckoutSckelton";
import CheckoutSummary from "../components/CheckoutSummery";
import type { OrderFormData, OrderFormErrors } from "../types/order.type";
import { validateCheckoutForm } from "../utils/checkout.form.validation";
import CartErrorState from "../../cart/component/CartErrorState";
import EmptyCart from "../../cart/component/EmptyCart";

const CheckoutPage = () => {
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
    const isLoading = false;
    const isError = false;

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
                {isLoading && <CheckoutSkeleton />}

                {/* ERROR */}
                {!isLoading && isError && <CheckoutError />}

                {!isLoading && !isError && checkoutData.items.length === 0 && <EmptyCart />}

                {/* SUCCESS */}
                {!isLoading && !isError && checkoutData.items.length > 0 && (
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
                            checkout={checkoutData} />
                    </div>
                )}
            </div>
        </section>
    );
}

export default CheckoutPage;