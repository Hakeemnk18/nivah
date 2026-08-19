import { FaEdit, FaTrash, FaUnlock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddButton from "../../admin/components/table/AddButton";
import AdminBreadcrumb from "../../admin/components/AdminBreadCrumb";
import AdminTableFullSkeleton from "../../admin/components/AdminTableSkeleton";
import AdminErrorState from "../../admin/components/AdminErrorState";
import { useGetAllAdminCampaign } from "../hooks/use.get.all.admin.campaign";
import { useBlockCampaign } from "../hooks/use.block.campaign";
import { useUnblockCampaign } from "../hooks/use.unblock.campaign";

const CampaignTable = () => {
    const navigate = useNavigate();
    const { data: campaignsList, isLoading, isError } = useGetAllAdminCampaign();
    const { mutateAsync: blockCampaign } = useBlockCampaign();
    const { mutateAsync: unblockCampaign } = useUnblockCampaign();
    const campaigns = campaignsList?.data || [];

    const crumbs = [{ label: "Campaign Pages" }];

    /* ---------- handlers ---------- */
    const handleEdit = (id: string) => {
        navigate(`/admin/editCampaign?campaignId=${id}`);
    };

    const handleBlock = async (id: string) => {
        await blockCampaign(id);
    };

    const handleUnblock = async (id: string) => {
        await unblockCampaign(id);
    };

    const handleAdd = () => {
        navigate("/admin/createCampaign");
    };

    let content;

    if (isLoading) {
        content = <AdminTableFullSkeleton title="Campaign Pages" />;
    } else if (isError) {
        content = <AdminErrorState />;
    } else {
        content = (
            <>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                    <h2 className="text-xl font-semibold">Campaign Pages</h2>

                    <div className="flex flex-wrap gap-3 items-center">
                        <AddButton label="Add Campaign" onClick={handleAdd} />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-sm min-w-[760px]">
                        <thead>
                            <tr className="text-left text-gray-400 border-b border-[#2c2e4a]">
                                {/* Image */}
                                <th className="py-3 w-[100px] sm:w-[120px]">Image</th>

                                {/* Title */}
                                <th className="w-[180px] sm:w-[220px]">Title</th>

                                {/* Slug */}
                                <th className="min-w-[160px]">Page URL</th>

                                {/* Status */}
                                <th className="w-[90px] sm:w-[110px]">Status</th>

                                {/* Actions */}
                                <th className="text-center sm:text-right w-[80px] sm:w-[120px]">
                                    <span className="hidden sm:inline">Actions</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {campaigns.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center text-gray-300">
                                        No campaign pages yet. Add one to launch a promotional collection page.
                                    </td>
                                </tr>
                            ) : (
                                campaigns.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-t border-[#2c2e4a] hover:bg-[#232447]"
                                    >
                                        {/* Image Column */}
                                        <td className="py-3 pr-4">
                                            {item.image?.url ? (
                                                <div className="w-20 h-12 rounded overflow-hidden bg-[#2c2e4a]">
                                                    <img
                                                        src={item.image.url}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-20 h-12 rounded bg-[#3e3f5c] flex items-center justify-center text-xs text-gray-400">
                                                    No Img
                                                </div>
                                            )}
                                        </td>

                                        {/* Title Column */}
                                        <td className="py-3 font-medium text-white truncate max-w-[200px]">
                                            {item.title || "-"}
                                        </td>

                                        {/* Slug Column */}
                                        <td className="text-gray-300 truncate max-w-[200px] font-mono text-xs">
                                            /collections/{item.slug}
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
                                                title="Edit Campaign"
                                            >
                                                <FaEdit className="text-blue-400" size={16} />
                                            </button>

                                            {item.isActive ? (
                                                <button
                                                    onClick={() => handleBlock(item.id)}
                                                    className="cursor-pointer p-2 rounded hover:bg-[#3e3f5c] transition"
                                                    title="Block Campaign"
                                                >
                                                    <FaTrash className="text-red-400" size={16} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleUnblock(item.id)}
                                                    className="cursor-pointer p-2 rounded hover:bg-[#3e3f5c] transition"
                                                    title="Unblock Campaign"
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

export default CampaignTable;
