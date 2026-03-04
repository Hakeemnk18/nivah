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
import { openRazorpayCheckoutFunction } from "../../../shared/utils/razorpay";
import { useNavigate } from "react-router-dom";
import type { ApiResponse } from "../../../shared/types/api.types";
import api from '../../../api/axios.instance'

const CheckoutPage = () => {
    const guestId = getGuestId()
    const { data: checkoutData, isLoading: isCheckoutLoading, isError: isCheckoutError } = useGetCheckoutItems(guestId);
    const { mutateAsync: createOrder } = useCreateOrder();
    const navigate = useNavigate()
    const checkoutSummary = checkoutData?.data;
    const checkoutItems = checkoutSummary?.items || [];
    const [formData, setFormData] = useState<OrderFormData>({
        name: "lalu",
        email: "lalu@gmail.com",
        phone: "9856256545",
        addressLine1: "iruvallur, iruvallur po",
        addressLine2: "chellannur",
        city: "kannur",
        state: "kerala",
        pincode: "670641",
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

    const handlePaymentCancel = async (orderId: string, response: any) => {
        try {

            await api.post<ApiResponse>("/orders/payment-failure", {
                razorpay_order_id: response.error.metadata.order_id,
                razorpay_payment_id: response.error.metadata.payment_id,
                failure_reason: response.error.reason,
            });
            navigate(`/order-status/${orderId}`)
        } catch (error) {
            handleApiError(error)
            console.log("error inside verify subscription payment ", error)
        }

    }

    const handlePaymentSuccess = async (orderId: string, response: any) => {
        try {

            await api.post<ApiResponse>("/orders/verify-payment", {
                ...response,
            });
            navigate(`/order-status/${orderId}`)
        } catch (error) {
            handleApiError(error)
            console.log("error inside verify subscription payment ", error)
        }

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

            openRazorpayCheckoutFunction(res?.data!, handlePaymentSuccess, handlePaymentCancel)

        } catch (error) {
            const validateError = handleApiError(error);
            if (validateError) {
                setErrors(validateError);
            }
        }

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