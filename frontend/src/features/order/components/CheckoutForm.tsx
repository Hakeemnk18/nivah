import { Link } from "react-router-dom";
import { STATE_OPTIONS, type OrderFormData, type OrderFormErrors } from "../types/order.type";
import Input from "./Checkout.input";
import Select from "./CheckoutSelect";

interface CheckoutFormProps {
    formData: OrderFormData;
    errors: OrderFormErrors;
    onChange: (field: keyof OrderFormData, value: string | boolean) => void;

}

const CheckoutForm = ({
    formData,
    errors,
    onChange,

}: CheckoutFormProps) => {
    return (
        <div className="bg-[var(--card)] border border-[var(--footer-border)] rounded-2xl p-6 md:p-8 space-y-6">
            {/* Billing */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Billing Details</h2>
                <div className="grid gap-4">
                    <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(v) => onChange("name", v)}
                        error={errors.name}
                    />

                    <Input
                        label="Email"
                        value={formData.email}
                        onChange={(v) => onChange("email", v)}
                        error={errors.email}
                    />

                    <Input
                        label="Phone"
                        value={formData.phone}
                        onChange={(v) => onChange("phone", v)}
                        error={errors.phone}
                    />


                </div>
            </div>

            {/* Address */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
                <div className="grid gap-4">
                    <Input
                        label="House / Flat / Building"
                        value={formData.addressLine1}
                        onChange={(v) => onChange("addressLine1", v)}
                        error={errors.addressLine1}
                    />

                    <Input
                        label="Area / Locality"
                        value={formData.addressLine2}
                        onChange={(v) => onChange("addressLine2", v)}
                    />
                    <Input
                        label="City"
                        value={formData.city}
                        onChange={(v) => onChange("city", v)}
                        error={errors.city}
                    />
                    <Select
                        options={STATE_OPTIONS}
                        label="State"
                        value={formData.state}
                        placeholder="Select state"
                        onChange={(v) => onChange("state", v)}
                        error={errors.state}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Pincode"
                            value={formData.pincode}
                            onChange={(v) => onChange("pincode", v)}
                            error={errors.pincode}
                        />
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            checked={formData.acceptedTerms}
                            onChange={(e) => onChange("acceptedTerms", e.target.checked)}
                            className="mt-1 h-4 w-4 accent-[var(--accent)] cursor-pointer"
                        />
                        {errors.acceptedTerms && <p className="text-xs text-red-400 mt-1">{errors.acceptedTerms}</p>}
                        <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                            I agree to the{" "}
                            <Link
                                to="/terms-and-conditions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--accent)] underline hover:opacity-80"
                            >
                                Terms & Conditions
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Payment */}
            <div className="mt-4 rounded-2xl border border-[var(--footer-border)] bg-[var(--bg-secondary)] p-4">

                {/* Top row */}
                <div className="flex items-start gap-3">

                    {/* Security icon */}
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--bg)] border border-[var(--footer-border)]">
                        <span className="text-sm">🔒</span>
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-[var(--text)] leading-tight">
                            Secure payments
                        </p>
                        <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                            All transactions are encrypted and securely processed by our payment partner.
                        </p>
                    </div>
                </div>

                {/* Razorpay brand row */}
                <div className="mt-4 pt-3 border-t border-[var(--footer-border)] flex items-center gap-2">
                    <span className="text-xs text-[var(--muted)]">Powered by Razorpay</span>

                    <img
                        src="/images/razorpay-icon.png"
                        alt="Razorpay"
                        className="h-4 w-auto object-contain opacity-90"
                    />
                </div>
            </div>
        </div>
    );
}

export default CheckoutForm;
