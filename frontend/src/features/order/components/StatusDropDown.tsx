import { useState } from "react";

export type OrderStatus =
    | "created"
    | "confirmed"
    | "accepted"
    | "dispatched"
    | "cancelled";

/* ---------------- ALLOWED TRANSITIONS ---------------- */

const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
    created: ["cancelled"],
    confirmed: ["dispatched", "cancelled"],
    accepted: [],        // lock for now (you can extend later)
    dispatched: [],      // no change allowed
    cancelled: [],       // no change allowed
};

type Props = {
    currentStatus: OrderStatus;
    onChange: (newStatus: OrderStatus) => void;
    getStatusStyle: (status: OrderStatus) => string;
};

const OrderStatusDropdown = ({
    currentStatus,
    onChange,
    getStatusStyle,
}: Props) => {
    const [open, setOpen] = useState(false);

    const allowedOptions = STATUS_TRANSITIONS[currentStatus];

    const handleSelect = (status: OrderStatus) => {
        onChange(status);
        setOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            {/* Current Status Badge */}
            <button
                onClick={() => {
                    if (allowedOptions.length > 0) setOpen(!open);
                }}
                className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(
                    currentStatus
                )} ${allowedOptions.length ? "cursor-pointer" : "cursor-default"}`}
            >
                {currentStatus}
            </button>

            {/* Dropdown */}
            {open && allowedOptions.length > 0 && (
                <div className="absolute z-10 mt-2 w-32 bg-[#232447] rounded-md shadow-lg border border-[#2c2e4a]">
                    {allowedOptions.map((status) => (
                        <button
                            key={status}
                            onClick={() => handleSelect(status)}
                            className="block w-full text-left px-3 py-2 text-xs hover:bg-[#2c2e4a]"
                        >
                            {status}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderStatusDropdown;