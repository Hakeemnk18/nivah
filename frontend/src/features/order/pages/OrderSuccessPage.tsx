import OrderItemsCard from "../components/OrderItemCard";
import OrderAddressCard from "../components/AddressCard";
import OrderSummaryCard from "../components/OrderSummeryCard";
import SectionTitle from "../../../shared/components/SectionTitle";
import OrderSuccessSkeleton from "../components/OrderSuccessScelton";
import CheckoutError from "../components/CheckooutError";
import EmptyState from "../../../shared/components/EmptyState";
import { useSearchParams } from "react-router-dom";
import { useOrderSummaryById } from "../hooks/use.get.order.summery";
import { getGuestId } from "../../../shared/utils/guest";
import { useDownloadInvoice } from "../hooks/use.dowload.invoice";
import toast from "react-hot-toast";


const OrderSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const guestId = getGuestId()
    const { data: orderSummeryData, isLoading: orderLoading, isError: orderError } = useOrderSummaryById(orderId, guestId);
    const { mutateAsync: downloadInvoiceMutate, isPending: isDownloadingInvoice } = useDownloadInvoice();
    const order = orderSummeryData?.data;


    const handleDownloadInvoice = async () => {
        if (!order) return;
        try {
            const blob = await downloadInvoiceMutate({ orderId: order.id, guestId });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `invoice-${order.orderNumber}.pdf`;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            toast.error("Invoice download failed");
        }
    };


    return (
        <section className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-4">
                <SectionTitle label="Order Confirmed" />

                {orderLoading && (
                    <OrderSuccessSkeleton />
                )}

                {!orderLoading && orderError && (
                    <CheckoutError title="Order Summery Unavailable" message="Failed to load order" />
                )}

                {!orderLoading && !orderError && !order && (
                    <EmptyState />
                )}

                {!orderLoading && !orderError && order && (
                    <div className="grid lg:grid-cols-[1fr_380px] gap-8">



                        <div className="space-y-6">
                            <OrderItemsCard items={order.items} />
                            <OrderAddressCard snapshot={order.userSnapshot} />
                        </div>

                        <OrderSummaryCard
                            onDownloadInvoice={handleDownloadInvoice}
                            isDownloading={isDownloadingInvoice}
                            order={order} />

                    </div>
                )}
            </div>
        </section>
    );
};

export default OrderSuccessPage;