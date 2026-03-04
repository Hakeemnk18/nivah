import AdminErrorState from "../../admin/components/AdminErrorState";
import AdminOrderDetailsSkeleton from "../components/AdminOrderDetailsSkelton";
import type { OrderStatus } from "../types/order.type";
import { useAdminOrderDetails } from "../hooks/use.get.admin.order.details";
import { useParams } from "react-router-dom";
import { useAdminDownloadInvoice } from "../hooks/use.admin.download.invoice";
import toast from "react-hot-toast";

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
      return "bg-[#1b3a46] text-cyan-300";
    case "delivered":
      return "bg-[#1f3b2a] text-green-300";
    case "cancelled":
      return "bg-[#4a1f1f] text-red-300";
    default:
      return "";
  }
};

const getStatusStyles = (label: string, date?: string) => {
  if (!date) {
    return {
      dot: "bg-gray-500",
      text: "text-gray-500",
      ring: "ring-gray-700",
    };
  }

  if (label === "Cancelled") {
    return {
      dot: "bg-red-500",
      text: "text-red-400",
      ring: "ring-red-500/30",
    };
  }

  return {
    dot: "bg-blue-500",
    text: "text-gray-200",
    ring: "ring-blue-500/30",
  };
};

/* ---------------- COMPONENT ---------------- */

const AdminOrderDetailsPage = () => {
  const { orderId } = useParams();
  const { mutateAsync: downloadInvoiceMutate } = useAdminDownloadInvoice();
  if (!orderId) {
    return <AdminErrorState />;
  }
  const {
    data: orderDetailsData,
    isLoading,
    isError,
  } = useAdminOrderDetails(orderId);
  const order = orderDetailsData?.data;

  const handleDownloadInvoice = async () => {
    if (!order) return;
    try {
      const blob = await downloadInvoiceMutate({ orderId: order.id });

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

  let content;

  if (isLoading) {
    content = <AdminOrderDetailsSkeleton />;
  } else if (isError) {
    content = <AdminErrorState />;
  } else if (!order) {
    content = <AdminErrorState />;
  } else {
    content = (
      <>
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#2c2e4a] pb-4">
          <div>
            <h2 className="text-xl font-semibold">Order {order.orderNumber}</h2>
            <p className="text-sm text-gray-400">
              Created: {formatDate(order.timeline.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Download Invoice Button */}
            <button
              onClick={handleDownloadInvoice}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg transition"
            >
              Download Invoice
            </button>

            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                order.orderStatus,
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
              <p className="text-gray-400 text-sm">No payment information</p>
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
        <div className="rounded-xl border border-[#2c2e4a] bg-[#16182b] p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Order Timeline
          </h3>

          <div className="relative space-y-5 border-l border-[#2c2e4a] pl-5">
            {[
              ["Created", order.timeline.createdAt],
              ["Confirmed", order.timeline.confirmedAt],
              ["Accepted", order.timeline.acceptedAt],
              ["Dispatched", order.timeline.dispatchedAt],
              ["Delivered", order.timeline.deliveredAt],
              ["Cancelled", order.timeline.cancelledAt],
            ].map(([label, date]) => {
              const styles = getStatusStyles(
                label!,
                date as string | undefined,
              );

              return (
                <div key={label} className="relative">
                  {/* Dot */}
                  <span
                    className={`absolute -left-[11px] top-1.5 w-3 h-3 rounded-full ${styles.dot} ring-4 ${styles.ring}`}
                  />

                  {/* Content */}
                  <div className="flex flex-col gap-0.5 pl-5">
                    <p className={`text-sm font-medium ${styles.text}`}>
                      {label}
                    </p>

                    <p className="text-xs text-gray-400">
                      {date ? formatDate(date as string) : "Not yet"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="pb-16 px-4">
      <div className="bg-[#1d1e33] p-6 rounded-xl text-white w-full max-w-6xl mx-auto space-y-8">
        {content}
      </div>
    </div>
  );
};

export default AdminOrderDetailsPage;
