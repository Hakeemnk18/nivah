import React from "react";
import AdminErrorState from "../../admin/components/AdminErrorState";
import AdminOrderDetailsSkeleton from "../components/AdminOrderDetailsSkelton";

/* ---------------- TYPES ---------------- */

type OrderStatus =
    | "created"
    | "confirmed"
    | "accepted"
    | "dispatched"
    | "cancelled";

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

/* ---------------- MOCK DATA ---------------- */

const isLoading = true;
const isError = false;

const mockOrder: AdminOrderFullView | null = {
    id: "1",
    orderNumber: "ORD-1001",
    orderStatus: "confirmed",

    user: {
        name: "Muhammed Hakeem",
        email: "hakeem@email.com",
        phone: "9876543210",
        addressLine1: "Green Villa House",
        city: "Calicut",
        state: "Kerala",
        pincode: "673001",
    },

    pricing: {
        subtotal: 4200,
        shippingFee: 399,
        totalAmount: 4599,
    },

    timeline: {
        createdAt: "2026-02-20T10:00:00Z",
        confirmedAt: "2026-02-20T10:05:00Z",
    },

    payment: {
        paymentId: "pay_123456",
        status: "paid",
        method: "UPI",
        paidAt: "2026-02-20T10:05:00Z",
    },

    items: [
        {
            productId: "p1",
            variantId: "v1",
            name: "Zero Gravity Jacket",
            size: "M",
            price: 2100,
            quantity: 2,
        },
        {
            productId: "p1",
            variantId: "v1",
            name: "Zero Gravity Jacket",
            size: "M",
            price: 2100,
            quantity: 2,
        },
        {
            productId: "p1",
            variantId: "v1",
            name: "Zero Gravity Jacket",
            size: "M",
            price: 2100,
            quantity: 2,
        },
        {
            productId: "p1",
            variantId: "v1",
            name: "Zero Gravity Jacket",
            size: "M",
            price: 2100,
            quantity: 2,
        },
        {
            productId: "p1",
            variantId: "v1",
            name: "Zero Gravity Jacket",
            size: "M",
            price: 2100,
            quantity: 2,
        },

    ],
};

/* ---------------- HELPERS ---------------- */

const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleString() : "-";

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case "created":
            return "bg-[#3e3f5c] text-gray-300";
        case "confirmed":
            return "bg-[#1f3b7a] text-blue-300";
        case "accepted":
            return "bg-[#2e4d7a] text-indigo-300";
        case "dispatched":
            return "bg-[#1f3b2a] text-green-300";
        case "cancelled":
            return "bg-[#4a1f1f] text-red-300";
        default:
            return "";
    }
};

/* ---------------- COMPONENT ---------------- */

const AdminOrderDetailsPage = () => {




    if (!mockOrder) {
        return (
            <div className="py-20 text-center text-gray-400">
                Order not found
            </div>
        );
    }

    const order = mockOrder;

    return (
        <div className="pb-16 px-4">
            <div className="bg-[#1d1e33] p-6 rounded-xl text-white w-full max-w-6xl mx-auto space-y-8">

                {isLoading && !isError && <AdminOrderDetailsSkeleton />}
                {!isLoading && isError && <AdminErrorState />}

                {!isLoading && !isError &&

                    <>

                        {/* HEADER */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#2c2e4a] pb-4">

                            <div>
                                <h2 className="text-xl font-semibold">
                                    Order {order.orderNumber}
                                </h2>
                                <p className="text-sm text-gray-400">
                                    Created: {formatDate(order.timeline.createdAt)}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">

                                {/* Download Invoice Button */}
                                <button
                                    onClick={() => console.log("Download invoice")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg transition"
                                >
                                    Download Invoice
                                </button>

                                {/* Status Badge */}
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                        order.orderStatus
                                    )}`}
                                >
                                    {order.orderStatus}
                                </span>

                            </div>
                        </div>
                        {/* CUSTOMER + PAYMENT */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* CUSTOMER */}
                            <div className="bg-[#232447] p-4 rounded-lg space-y-2">
                                <h3 className="text-sm font-semibold text-gray-300">
                                    Customer Information
                                </h3>
                                <p>{order.user.name}</p>
                                <p className="text-gray-400 text-sm">{order.user.email}</p>
                                <p className="text-gray-400 text-sm">{order.user.phone}</p>

                                <div className="pt-2 text-sm text-gray-400">
                                    <p>{order.user.addressLine1}</p>
                                    {order.user.addressLine2 && <p>{order.user.addressLine2}</p>}
                                    <p>
                                        {order.user.city}, {order.user.state} - {order.user.pincode}
                                    </p>
                                </div>
                            </div>

                            {/* PAYMENT */}
                            <div className="bg-[#232447] p-4 rounded-lg space-y-2">
                                <h3 className="text-sm font-semibold text-gray-300">
                                    Payment Details
                                </h3>

                                {order.payment ? (
                                    <>
                                        <p className="text-sm">ID: {order.payment.paymentId}</p>
                                        <p className="text-sm text-gray-400">
                                            Method: {order.payment.method || "-"}
                                        </p>
                                        <p className="text-sm text-green-400">
                                            Status: {order.payment.status}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Paid At: {formatDate(order.payment.paidAt)}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-gray-400 text-sm">
                                        No payment information
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ITEMS */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-300 mb-3">
                                Order Items
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm min-w-[600px]">
                                    <thead>
                                        <tr className="text-left text-gray-400 border-b border-[#2c2e4a]">
                                            <th className="py-2">Product</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {order.items.map((item) => (
                                            <tr
                                                key={item.variantId}
                                                className="border-t border-[#2c2e4a]"
                                            >
                                                <td className="py-2">{item.name}</td>
                                                <td>{item.size}</td>
                                                <td>₹{item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td className="font-medium">
                                                    ₹{item.price * item.quantity}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* PRICING */}
                        <div className="bg-[#232447] p-4 rounded-lg space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Subtotal</span>
                                <span>₹{order.pricing.subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Shipping</span>
                                <span>₹{order.pricing.shippingFee}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base pt-2 border-t border-[#2c2e4a]">
                                <span>Total</span>
                                <span>₹{order.pricing.totalAmount}</span>
                            </div>
                        </div>

                        {/* TIMELINE */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-300 mb-3">
                                Order Timeline
                            </h3>

                            <div className="space-y-4 border-l-2 border-[#2c2e4a] pl-4">
                                {[
                                    ["Created", order.timeline.createdAt],
                                    ["Confirmed", order.timeline.confirmedAt],
                                    ["Accepted", order.timeline.acceptedAt],
                                    ["Dispatched", order.timeline.dispatchedAt],
                                    ["Cancelled", order.timeline.cancelledAt],
                                ].map(([label, date]) => (
                                    <div key={label} className="relative">
                                        <div className="absolute -left-[11px] top-1 w-3 h-3 rounded-full bg-blue-400"></div>
                                        <p className="text-sm font-medium">{label}</p>
                                        <p className="text-xs text-gray-400">
                                            {formatDate(date as string | undefined)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default AdminOrderDetailsPage;