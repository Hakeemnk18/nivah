import { useState } from "react";
import { FaEye } from "react-icons/fa";
import TableSort from "../../admin/components/table/Sort";
import TableFilter from "../../admin/components/table/Filter";
import TableSearch from "../../admin/components/table/Search";
import OrderStatusDropdown from "../components/StatusDropDown";

/* ---------------- TYPES ---------------- */

type OrderStatus =
    | "created"
    | "confirmed"
    | "accepted"
    | "dispatched"
    | "cancelled";

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

/* ---------------- MOCK DATA ---------------- */

const mockOrders: AdminOrderListItem[] = [
    {
        id: "1",
        orderNumber: "ORD-1001",
        customerName: "Muhammed Hakeem",
        customerPhone: "9876543210",
        totalAmount: 4599,
        orderStatus: "confirmed",
        createdAt: "2026-02-24T09:30:00Z",
        itemsCount: 2,
    },
    {
        id: "2",
        orderNumber: "ORD-1002",
        customerName: "Arjun Nair",
        customerPhone: "9123456780",
        totalAmount: 1299,
        orderStatus: "created",
        createdAt: "2026-02-23T12:15:00Z",
        itemsCount: 1,
    },
    {
        id: "3",
        orderNumber: "ORD-1003",
        customerName: "Rahul Das",
        customerPhone: "9988776655",
        totalAmount: 7899,
        orderStatus: "dispatched",
        createdAt: "2026-02-22T16:45:00Z",
        itemsCount: 4,
    },
];

const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
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
        ],
    },
];

/* ---------------- COMPONENT ---------------- */

const AdminOrdersTable = () => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [showSort, setShowSort] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState<{
        orderStatus: string;
    }>({
        orderStatus: "",
    });

    // Simulated states
    const [isLoading] = useState(false);
    const [isError] = useState(false);

    /* ---------------- FILTER / SEARCH / SORT LOGIC ---------------- */

    let filteredData = [...mockOrders];

    // Search
    if (search.trim()) {
        filteredData = filteredData.filter(
            (order) =>
                order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
                order.customerName.toLowerCase().includes(search.toLowerCase()) ||
                order.customerPhone.includes(search),
        );
    }

    // Status filter
    if (filters.orderStatus) {
        filteredData = filteredData.filter(
            (order) => order.orderStatus === filters.orderStatus,
        );
    }

    // Sort
    if (sort === "newest") {
        filteredData.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
        );
    } else if (sort === "oldest") {
        filteredData.sort(
            (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
        );
    }

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

    const handleStatusChange = (id: string, newStatus: OrderStatus) => {
        console.log("Status changed:", id, newStatus); // UI only

        // setOrders((prev) =>
        //     prev.map((order) =>
        //         order.id === id ? { ...order, orderStatus: newStatus } : order
        //     )
        // );
    };

    return (
        <div className="pb-10">
            <div className="bg-[#1d1e33] p-6 rounded-xl text-white w-full max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                    <h2 className="text-xl font-semibold">Orders</h2>

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
                            onClick={() => {
                                setSearch("");
                                setSort("");
                                setFilters({ orderStatus: "" });
                            }}
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

                {/* Table */}
                <div className="overflow-x-auto no-scrollbar">
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan={8} className="py-10 text-center text-gray-400">
                                        Loading orders...
                                    </td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td colSpan={8} className="py-10 text-center text-red-400">
                                        Failed to load orders
                                    </td>
                                </tr>
                            ) : filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-10 text-center text-gray-300">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((order) => (
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
                                            <button className="cursor-pointer">
                                                <FaEye className="text-blue-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrdersTable;