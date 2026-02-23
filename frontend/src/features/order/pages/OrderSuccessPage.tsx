import { useState } from "react";
import { mockOrder, type OrderSummaryView } from "../types/order.type";
import OrderItemsCard from "../components/OrderItemCard";
import OrderAddressCard from "../components/AddressCard";
import OrderSummaryCard from "../components/OrderSummeryCard";
import SectionTitle from "../../../shared/components/SectionTitle";
import OrderSuccessSkeleton from "../components/OrderSuccessScelton";
import CheckoutError from "../components/CheckooutError";
import EmptyState from "../../../shared/components/EmptyState";


const OrderSuccessPage = () => {
    /* ---- Local State Simulation ---- */
    const [isLoading] = useState(false);
    const [isError] = useState(true);
    const [order] = useState<OrderSummaryView | null>(mockOrder);

    return (
        <section className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-4">
                <SectionTitle label="Order Confirmed" />

                {isLoading && (
                    <OrderSuccessSkeleton />
                )}

                {!isLoading && isError && (
                    <CheckoutError title="Order Summery Unavailable" message="Failed to load order" />
                )}

                {!isLoading && !isError && !order && (
                    <EmptyState />
                )}

                {!isLoading && !isError && order && (
                    <div className="grid lg:grid-cols-[1fr_380px] gap-8">



                        <div className="space-y-6">
                            <OrderItemsCard items={order.items} />
                            <OrderAddressCard snapshot={order.userSnapshot} />
                        </div>

                        <OrderSummaryCard order={order} />

                    </div>
                )}
            </div>
        </section>
    );
};

export default OrderSuccessPage;