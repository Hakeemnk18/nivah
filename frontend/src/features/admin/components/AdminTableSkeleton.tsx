import { motion } from "framer-motion";

type AdminTableFullSkeletonProps = {
    title: string;
    rows?: number;
};

const shimmer = {
    animate: { opacity: [0.4, 1, 0.4] },
    transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse" as const,
    },
};

const AdminTableFullSkeleton = ({
    title,
    rows = 7,
}: AdminTableFullSkeletonProps) => {
    return (
        <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <h2 className="text-xl font-semibold">{title}</h2>

                {/* Controls Skeleton */}
                <div className="flex flex-wrap gap-3 items-center">
                    <motion.div {...shimmer} className="h-9 w-52 bg-[#232447] rounded-lg" />
                    <motion.div {...shimmer} className="h-9 w-20 bg-[#232447] rounded-lg" />
                    <motion.div {...shimmer} className="h-9 w-20 bg-[#232447] rounded-lg" />
                    <motion.div {...shimmer} className="h-9 w-20 bg-[#3e3f5c] rounded-lg" />
                </div>
            </div>

            {/* Dropdown Skeleton Area */}
            <motion.div
                {...shimmer}
                className="h-12 w-64 bg-[#232447] rounded-lg mb-4"
            />

            {/* Table */}
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-sm min-w-[900px]">
                    <thead>
                        <tr className="border-b border-[#2c2e4a]">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <th key={i} className="py-3">
                                    <motion.div
                                        {...shimmer}
                                        className="h-4 bg-[#2c2e4a] rounded w-20"
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-t border-[#2c2e4a]"
                            >
                                {Array.from({ length: 8 }).map((_, colIndex) => (
                                    <td key={colIndex} className="py-4">
                                        <motion.div
                                            {...shimmer}
                                            className="h-4 bg-[#232447] rounded w-full max-w-[120px]"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminTableFullSkeleton;