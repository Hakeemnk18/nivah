import { motion } from "framer-motion";


type AdminLoaderProps = {
    label?: string;
    fullScreen?: boolean;
};

const dotTransition = {
    repeat: Infinity,
    duration: 1.2,
    ease: [0.4, 0, 0.6, 1],
} as const;

const AdminLoader = ({
    label = "Processing...",
    fullScreen = false,
}: AdminLoaderProps) => {

    return (
        <div
            className={`${fullScreen ? "fixed inset-0 z-50" : "w-full"
                } flex items-center justify-center bg-black/60 backdrop-blur-sm`}
        >
            <div className="flex flex-col items-center gap-4 rounded-xl bg-[#1d1e33] px-10 py-8 shadow-xl">

                {/* dots */}
                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            className="w-3 h-3 rounded-full bg-blue-500"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                                ...dotTransition,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>

                {/* text */}
                <motion.p
                    className="text-sm text-gray-300 tracking-wide"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    {label}
                </motion.p>
            </div>
        </div>
    );
};

export default AdminLoader;
