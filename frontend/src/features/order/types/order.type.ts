import type { ApiResponse } from "../../../shared/types/api.types";



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


export type OrderStatus =
    | "created"
    | "confirmed"
    | "accepted"
    | "dispatched"
    | "cancelled";

export interface OrderItemView {
    itemId: string;
    productId: string;
    size: string;
    name: string;
    price: number;
    quantity: number;
}

export interface UserSnapshotView {
    name: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
}

export interface OrderSummaryView {
    id: string;
    orderNumber: string;
    userSnapshot: UserSnapshotView;
    subtotal: number;
    shippingFee: number;
    totalAmount: number;
    orderStatus: OrderStatus;
    createdAt: string;
    items: OrderItemView[];
}

export type OrderSummaryResponse = ApiResponse<OrderSummaryView>

export const mockOrder: OrderSummaryView = {
    id: "ord_123456",
    orderNumber: "NVH-2026-0001",
    orderStatus: "confirmed",
    createdAt: new Date().toISOString(),
    subtotal: 3200,
    shippingFee: 100,
    totalAmount: 3300,
    userSnapshot: {
        name: "Muhammed Hakeem",
        email: "hakeem@email.com",
        phone: "9876543210",
        addressLine1: "Iruvallur PO",
        addressLine2: "Chellannur",
        city: "Calicut",
        state: "Kerala",
        pincode: "673616",
    },
    items: [
        {
            productId: "p1",
            itemId: "i1",
            name: "Zero Gravity Hoodie",
            size: "L",
            price: 1600,
            quantity: 2,
        },
        {
            productId: "p2",
            itemId: "i2",
            name: "Zero Gravity Hoodie",
            size: "L",
            price: 1600,
            quantity: 2,
        },
        {
            productId: "p3",
            itemId: "i3",
            name: "Zero Gravity Hoodie",
            size: "L",
            price: 1600,
            quantity: 2,
        },
    ],
};

