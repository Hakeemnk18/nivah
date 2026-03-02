import { FaEdit, FaTrash, FaUnlock } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import AddButton from "../../admin/components/table/AddButton";
import AdminBreadcrumb from "../../admin/components/AdminBreadCrumb";
import AdminTableFullSkeleton from "../../admin/components/AdminTableSkeleton";
import AdminErrorState from "../../admin/components/AdminErrorState";
import { useGetAllAdminTestimonial } from "../hooks/use.get.admin.testimonial";
import { useBlockTestimonial } from "../hooks/use.block.testimonial";
import { useUnblockTestimonial } from "../hooks/use.unblock.testimonial";
import type { TestimonialView } from "../type/testimonial.type";

const TestimonialTable = () => {
    const navigate = useNavigate();
    const { data: testimonialList, isLoading, isError } = useGetAllAdminTestimonial();
    const { mutateAsync: blockTestimonial } = useBlockTestimonial();
    const { mutateAsync: unblockTestimonial } = useUnblockTestimonial();
    const testimonials: TestimonialView[] = testimonialList?.data || [];

    const crumbs = [{ label: "Testimonial" }];

    /* ---------- handlers ---------- */
    const handleEdit = (id: string) => {
        navigate(`/admin/editTestimonial?testimonialId=${id}`);
    };

    const handleBlock = async (id: string) => {
        await blockTestimonial(id);

    };

    const handleUnblock = async (id: string) => {
        await unblockTestimonial(id);
    };

    const handleAdd = () => {
        navigate("/admin/createTestimonial");
    };

    let content;

    if (isLoading) {
        content = <AdminTableFullSkeleton title="Testimonial" />;
    } else if (isError) {
        content = <AdminErrorState />;
    } else {
        content = (
            <>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                    <h2 className="text-xl font-semibold">Testimonial</h2>

                    <div className="flex flex-wrap gap-3 items-center">
                        {/* Only show Add button if there are no hero banners */}
                        {testimonials.length < 3 && (
                            <AddButton label="Add Testimonial" onClick={handleAdd} />
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-sm min-w-[700px]">
                        <thead>
                            <tr className="text-left text-gray-400 border-b border-[#2c2e4a]">
                                {/*   Author */}
                                <th className="py-3 w-[100px] sm:w-[120px]">Author</th>

                                {/* Comment */}
                                <th className="py-3 w-[100px] sm:w-[120px]">Comment</th>

                                {/* Status */}
                                <th className="w-[90px] sm:w-[110px]">Status</th>

                                {/* Actions */}
                                <th className="text-center sm:text-right w-[80px] sm:w-[120px]">
                                    <span className="hidden sm:inline">Actions</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {testimonials.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center text-gray-300">
                                        No testimonial found. Add one to display it on the homepage.
                                    </td>
                                </tr>
                            ) : (
                                testimonials.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-t border-[#2c2e4a] hover:bg-[#232447]"
                                    >
                                        {/* Author Column */}
                                        <td className="py-3 font-medium text-white truncate max-w-[200px]">
                                            {item.author || "-"}
                                        </td>

                                        {/* Comment Column */}
                                        <td className="text-gray-300 truncate max-w-[200px]">
                                            {item.comment || "-"}
                                        </td>
                                        {/* Status Column */}
                                        <td>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${item.isActive
                                                    ? "bg-[#1f3b7a] text-blue-300"
                                                    : "bg-[#3e3f5c] text-gray-300"
                                                    }`}
                                            >
                                                {item.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>

                                        {/* Actions Column */}
                                        <td className="flex justify-end py-3 sm:justify-end gap-3 sm:gap-4 min-w-[80px] sm:min-w-[120px] h-full items-center">
                                            <button
                                                onClick={() => handleEdit(item.id)}
                                                className="cursor-pointer p-2 rounded hover:bg-[#3e3f5c] transition"
                                                title="Edit Banner"
                                            >
                                                <FaEdit className="text-blue-400" size={16} />
                                            </button>

                                            {item.isActive ? (
                                                <button
                                                    onClick={() => handleBlock(item.id)}
                                                    className="cursor-pointer p-2 rounded hover:bg-[#3e3f5c] transition"
                                                    title="Block Testimonial"
                                                >
                                                    <FaTrash className="text-red-400" size={16} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleUnblock(item.id)}
                                                    className="cursor-pointer p-2 rounded hover:bg-[#3e3f5c] transition"
                                                    title="Unblock Testimonial"
                                                >
                                                    <FaUnlock className="text-yellow-400" size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

    return (
        <div className="pb-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-0">
                <AdminBreadcrumb crumbs={crumbs} />
            </div>

            <div className="bg-[#1d1e33] p-6 rounded-xl text-white w-full max-w-6xl mx-auto mt-4">
                {content}
            </div>
        </div>
    );
};

export default TestimonialTable;