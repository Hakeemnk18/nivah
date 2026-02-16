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
    userDetails: UserDetails;
    address: Address;
    cartId: string;
    guestId: string;
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