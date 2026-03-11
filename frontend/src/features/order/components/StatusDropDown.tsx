import { useEffect, useRef, useState } from "react";
import type { OrderStatus } from "../types/order.type";


/* ---------------- ALLOWED TRANSITIONS ---------------- */

const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
    created: ["cancelled"],
    confirmed: ["accepted", "cancelled"],
    accepted: ["dispatched", "cancelled"],
    dispatched: ["delivered", "cancelled"],
    cancelled: [],
    delivered: []
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
    const dropdownRef = useRef<HTMLDivElement>(null);

    const allowedOptions = STATUS_TRANSITIONS[currentStatus];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (status: OrderStatus) => {
        onChange(status);
        setOpen(false);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
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