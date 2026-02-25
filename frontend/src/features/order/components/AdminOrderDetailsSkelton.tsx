import { motion } from "framer-motion";

const shimmer = {
    animate: { opacity: [0.4, 1, 0.4] },
    transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse" as const,
    },
};

const AdminOrderDetailsSkeleton = () => {
    return (

        <>
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#2c2e4a] pb-4">
                <div className="space-y-2">
                    <motion.div {...shimmer} className="h-5 w-40 bg-[#232447] rounded" />
                    <motion.div {...shimmer} className="h-4 w-52 bg-[#232447] rounded" />
                </div>

                <div className="flex items-center gap-3">
                    <motion.div {...shimmer} className="h-8 w-32 bg-[#232447] rounded-lg" />
                    <motion.div {...shimmer} className="h-6 w-20 bg-[#232447] rounded-full" />
                </div>
            </div>

            {/* CUSTOMER + PAYMENT */}
            <div className="grid md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-[#232447] p-4 rounded-lg space-y-3">
                        <motion.div {...shimmer} className="h-4 w-40 bg-[#2c2e4a] rounded" />
                        <motion.div {...shimmer} className="h-4 w-full bg-[#2c2e4a] rounded" />
                        <motion.div {...shimmer} className="h-4 w-3/4 bg-[#2c2e4a] rounded" />
                        <motion.div {...shimmer} className="h-4 w-1/2 bg-[#2c2e4a] rounded" />
                    </div>
                ))}
            </div>

            {/* ITEMS TABLE */}
            <div>
                <motion.div {...shimmer} className="h-4 w-32 bg-[#232447] rounded mb-4" />

                <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                        <thead>
                            <tr className="border-b border-[#2c2e4a]">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <th key={i} className="py-2">
                                        <motion.div {...shimmer} className="h-4 w-20 bg-[#2c2e4a] rounded" />
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {Array.from({ length: 4 }).map((_, row) => (
                                <tr key={row} className="border-t border-[#2c2e4a]">
                                    {Array.from({ length: 5 }).map((_, col) => (
                                        <td key={col} className="py-3">
                                            <motion.div {...shimmer} className="h-4 w-full max-w-[100px] bg-[#232447] rounded" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PRICING */}
            <div className="bg-[#232447] p-4 rounded-lg space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                        <motion.div {...shimmer} className="h-4 w-24 bg-[#2c2e4a] rounded" />
                        <motion.div {...shimmer} className="h-4 w-16 bg-[#2c2e4a] rounded" />
                    </div>
                ))}
            </div>

            {/* TIMELINE */}
            <div>
                <motion.div {...shimmer} className="h-4 w-32 bg-[#232447] rounded mb-4" />

                <div className="space-y-4 border-l-2 border-[#2c2e4a] pl-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <motion.div {...shimmer} className="h-4 w-24 bg-[#2c2e4a] rounded" />
                            <motion.div {...shimmer} className="h-3 w-40 bg-[#2c2e4a] rounded" />
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default AdminOrderDetailsSkeleton;