import type { UserSnapshotView } from "../types/order.type";

interface OrderAddressCardProps {
    snapshot: UserSnapshotView;
}

const OrderAddressCard = ({ snapshot }: OrderAddressCardProps) => {
    return (
        <div className="bg-[var(--card)] border border-[var(--bg-secondary)] rounded-2xl p-5">

            {/* TITLE */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                    Shipping Address
                </h3>

                <span className="text-xs text-[var(--accent)] font-medium">
                    Delivery Details
                </span>
            </div>

            {/* ADDRESS CONTENT */}
            <div className="text-sm space-y-2 text-[var(--muted)] leading-relaxed">

                <p className="font-semibold text-[var(--text)] text-base">
                    {snapshot.name}
                </p>

                <p>{snapshot.phone}</p>

                <p>{snapshot.addressLine1}</p>

                {snapshot.addressLine2 && (
                    <p>{snapshot.addressLine2}</p>
                )}

                <p>
                    {snapshot.city}, {snapshot.state}
                </p>

                <p className="font-medium text-[var(--text)]">
                    {snapshot.pincode}
                </p>
            </div>
        </div>
    );
};

export default OrderAddressCard;