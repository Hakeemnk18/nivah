import type { ApiResponse } from "../../../shared/types/api.types";

export type OrderStatus = "pending" | "completed" | "cancelled";

export type OrderView = {
    orderId: string;
    status: OrderStatus;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}



export type UserDetails = {
    name: string;
    email: string;
    phone: string;
}

export type Address = {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
}

export type OrderPlacementPayload = {
    guestId: string;
    cartId: string;
    name: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
}

export type OrderFormData = {
    name: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
};

export type OrderFormErrors = {
    name?: string;
    email?: string;
    phone?: string;
    addressLine1?: string;
    city?: string;
    state?: string;
    pincode?: string;
};

export const STATE_OPTIONS = [
    { value: "Kerala", label: "Kerala" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Telangana", label: "Telangana" },
    { value: "Delhi", label: "Delhi" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
];



export interface IRazorpayOrder {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
    attempts: number;
    notes: Record<string, any>;
    created_at: number;
}

export type CreateOrderResponse = ApiResponse<IRazorpayOrder>

export interface IRazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    order_id: string;
    notes?: Record<string, any>;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    modal?: {
        ondismiss?: () => void;
    };
    handler: (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }) => void;
}

export interface IRazorpayPayment {
    id: string;
    entity: string;
    amount: number;
    currency: string;
    status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed';
    order_id?: string | undefined;
    invoice_id?: string | undefined;
    international: boolean;
    method: string;
    amount_refunded: number;
    refund_status: string | null;
    captured: boolean;
    description?: string | undefined;
    card_id?: string | undefined;
    bank?: string | undefined;
    wallet?: string | undefined;
    vpa?: string | undefined;
    email: string;
    contact: string;
    notes?: Record<string, any> | undefined;
    fee?: number | undefined;
    tax?: number | undefined;
    error_code?: string | undefined;
    error_description?: string | undefined;
    created_at: number;
}

