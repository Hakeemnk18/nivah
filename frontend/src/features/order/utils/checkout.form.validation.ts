import type { OrderFormData, OrderFormErrors } from "../types/order.type";

export const validateCheckoutForm = (
    data: OrderFormData
): OrderFormErrors => {
    const errors: OrderFormErrors = {};

    if (!data.name.trim()) errors.name = "Name is required";

    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = "Invalid email";
    }

    if (!data.phone.trim()) {
        errors.phone = "Phone is required";
    } else if (data.phone.length < 10) {
        errors.phone = "Invalid phone number";
    }

    if (!data.addressLine1.trim())
        errors.addressLine1 = "Address is required";

    if (!data.city.trim()) errors.city = "City is required";

    if (!data.state.trim()) errors.state = "State is required";

    if (!data.pincode.trim()) {
        errors.pincode = "Pincode is required";
    } else if (!/^\d{5,6}$/.test(data.pincode)) {
        errors.pincode = "Invalid pincode";
    }

    return errors;
};