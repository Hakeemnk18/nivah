import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import TableSort from "../../admin/components/table/Sort";
import TableFilter from "../../admin/components/table/Filter";
import TableSearch from "../../admin/components/table/Search";
import OrderStatusDropdown from "../components/StatusDropDown";
import AdminTableFullSkeleton from "../../admin/components/AdminTableSkeleton";
import AdminErrorState from "../../admin/components/AdminErrorState";
import Pagination from "../../admin/components/table/Pagination";
import AdminFetchingBar from "../../admin/components/AdminFetchingBar";
import { useAdminOrders } from "../hooks/use.admin.orders";
import type { OrderStatus } from "../types/order.type";
import { useDispatchOrder } from "../hooks/use.dispatch.order";
import { useDeliverOrder } from "../hooks/use.deliver.order";
import { useAcceptOrder } from "../hooks/use.accept.order";
import { useCancelOrder } from "../hooks/use.cancel.order";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import { Link } from "react-router-dom";

const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low to High", value: "price_low_high" },
    { label: "Price: High to Low", value: "price_high_low" },
];




const filterOptions = [
    {
        label: "Status",
        field: "orderStatus",
        options: [
            { label: "All", value: "" },
            { label: "Created", value: "created" },
            { label: "Confirmed", value: "confirmed" },
            { label: "Accepted", value: "accepted" },
            { label: "Dispatched", value: "dispatched" },
            { label: "Cancelled", value: "cancelled" },
            { label: "Delivered", value: "delivered" },
        ],
    },
];

/* ---------------- COMPONENT ---------------- */

const AdminOrdersTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [showSort, setShowSort] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const { mutateAsync: dispatchOrder } = useDispatchOrder();
    const { mutateAsync: deliverOrder } = useDeliverOrder();
    const { mutateAsync: acceptOrder } = useAcceptOrder();
    const { mutateAsync: cancelOrder } = useCancelOrder();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string>("");

    const [filters, setFilters] = useState<{
        orderStatus: string;
    }>({
        orderStatus: "",
    });

    const { data, isLoading, isFetching, isError, refetch } = useAdminOrders(
        currentPage,
        search,
        sort,
        filters,
    );

    const orders = data?.data ?? [];
    const totalPages = data?.totalPages ?? 0;
    const showFetching = isFetching && !isLoading;

    /* ----- close filter/sort on change ----- */
    useEffect(() => {
        setShowFilter(false);
        setShowSort(false);
    }, [filters, sort, currentPage]);

    const handleReset = () => {
        setSearch("");
        setSort("");
        setFilters({
            orderStatus: "",
        });
        setCurrentPage(1);
    };

    /* ---------------- STATUS BADGE ---------------- */

    const getStatusStyle = (status: OrderStatus) => {
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

    //set current page to 1 when filter or sort changes and search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sort, search]);

    const handleCancelOrder = async () => {
        setShowConfirmModal(false);
        await cancelOrder(selectedOrderId);
        setSelectedOrderId("");
    };

    const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
        if (!id || !newStatus) return;
        if (newStatus === "dispatched") {
            await dispatchOrder(id);
        } else if (newStatus === "delivered") {
            await deliverOrder(id);
        } else if (newStatus === "accepted") {
            await acceptOrder(id);
        } else if (newStatus === "cancelled") {
            setShowConfirmModal(true);
            setSelectedOrderId(id);
        }
    };

    let content

    if (isLoading) {
        content = <AdminTableFullSkeleton title="Orders" />
    } else if (isError) {
        content = <AdminErrorState onRetry={refetch} />
    } else {
        content = <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <h2 className="text-xl font-semibold">Orders</h2>

                {/* Controls */}
                <div className="flex flex-wrap gap-3 items-center">

                    {/* Search */}
                    <TableSearch search={search} setSearch={setSearch} />

                    {/* Filter */}
                    <button
                        onClick={() => {
                            setShowFilter(!showFilter);
                            setShowSort(false);
                        }}
                        className="bg-[#232447] px-3 py-2 rounded-lg text-sm"
                    >
                        Filter
                    </button>

                    {/* Sort */}
                    <button
                        onClick={() => {
                            setShowSort(!showSort);
                            setShowFilter(false);
                        }}
                        className="bg-[#232447] px-3 py-2 rounded-lg text-sm"
                    >
                        Sort
                    </button>

                    {/* Reset */}
                    <button
                        onClick={handleReset}
                        className="bg-[#3e3f5c] px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-[#4a4b6a]"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Sort Dropdown */}
            {showSort && (
                <div className="relative mb-4">
                    <TableSort sort={sort} setSort={setSort} options={sortOptions} />
                </div>
            )}

            {/* Filter Dropdown */}
            {showFilter && (
                <div className="relative mb-4">
                    <TableFilter filters={filters} setFilters={setFilters} filterOptions={filterOptions} />
                </div>
            )}

            {showFetching && <AdminFetchingBar />}

            {/* Table */}
            <div className="overflow-x-auto no-scrollbar pb-15">
                <table className="w-full text-sm min-w-[900px]">
                    <thead>
                        <tr className="text-left text-gray-400 border-b border-[#2c2e4a]">
                            <th className="py-3">Order No</th>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="py-12 text-center text-gray-400"
                                >
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-t border-[#2c2e4a] hover:bg-[#232447]"
                                >
                                    <td className="py-3 font-medium">
                                        {order.orderNumber}
                                    </td>

                                    <td>{order.customerName}</td>

                                    <td className="text-gray-300">
                                        {order.customerPhone}
                                    </td>

                                    <td>{order.itemsCount}</td>

                                    <td className="font-semibold">
                                        ₹{order.totalAmount}
                                    </td>

                                    <td>
                                        <OrderStatusDropdown
                                            currentStatus={order.orderStatus}
                                            getStatusStyle={getStatusStyle}
                                            onChange={(newStatus) =>
                                                handleStatusChange(order.id, newStatus)
                                            }
                                        />
                                    </td>

                                    <td className="text-gray-300">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="flex justify-end py-3">
                                        <Link
                                            to={`/admin/orderDetails/${order.id}`}
                                            className="inline-flex items-center gap-2 px-3 py-1.5 
                                            text-sm font-medium 
                                            bg-[#1b2238] hover:bg-[#243056] 
                                            text-blue-400 hover:text-blue-300
                                            rounded-md transition-colors duration-200"
                                        >
                                            <FaEye className="text-base" />
                                            Details
                                        </Link>

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    }

    return (
        <div className="pb-10">
            <div className="bg-[#1d1e33] p-6 rounded-xl text-white w-full max-w-6xl mx-auto">

                {content}

            </div>

            {showConfirmModal && (
                <ConfirmModal
                    isOpen={showConfirmModal}
                    title="Cancel Order"
                    message="Are you sure you want to cancel this order?"
                    onConfirm={() => {
                        handleCancelOrder();

                    }}
                    onCancel={() => {
                        setShowConfirmModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default AdminOrdersTable;