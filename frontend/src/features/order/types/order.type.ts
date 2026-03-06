import type { ApiResponse, GetAllDocResponse } from "../../../shared/types/api.types";



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
    acceptedTerms: boolean;
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
    acceptedTerms: boolean;
};

export type OrderFormErrors = {
    name?: string;
    email?: string;
    phone?: string;
    addressLine1?: string;
    city?: string;
    state?: string;
    pincode?: string;
    acceptedTerms?: string;
};

export const STATE_OPTIONS = [
    { value: "Kerala", label: "Kerala" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Telangana", label: "Telangana" },
    { value: "Delhi", label: "Delhi" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Goa", label: "Goa" },
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
    onPaymentFailed?: (response: any) => void;
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
    | "delivered"
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

export type AdminOrderListItem = {
    id: string;
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    totalAmount: number;
    orderStatus: OrderStatus;
    createdAt: string;
    itemsCount: number;
};

export type AdminOrderFullView = {
    id: string;
    orderNumber: string;

    user: {
        name: string;
        email: string;
        phone: string;

        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        pincode: string;
    };

    pricing: {
        subtotal: number;
        shippingFee: number;
        totalAmount: number;
    };

    orderStatus: OrderStatus;
    cancelReason?: string;

    timeline: {
        createdAt: string;
        confirmedAt?: string;
        acceptedAt?: string;
        dispatchedAt?: string;
        deliveredAt?: string;
        cancelledAt?: string;
    };

    payment?: {
        paymentId: string;
        status: string;
        method?: string;
        paidAt?: string;
    };

    items: {
        productId: string;
        variantId: string;
        name: string;
        size: string;
        price: number;
        quantity: number;
    }[];
};

export type AdminOrderFullResponse = ApiResponse<AdminOrderFullView>
export type AdminOrderListResponse = GetAllDocResponse<AdminOrderListItem[]>

export type AdminOrderQueryKey = [
    "admin-orders",
    {
        currentPage: number;
        search: string;
        sort: string;
        filters: Record<string, any>
    }
];

export type SyncPaymentResponse = ApiResponse<{ status: string }>






