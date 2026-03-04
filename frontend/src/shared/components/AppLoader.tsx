import { motion } from "framer-motion";

const AppLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f1120]">
            <div className="flex flex-col items-center gap-4">

                <motion.div
                    className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: "linear"
                    }}
                />

                <motion.p
                    className="text-gray-400 text-sm tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Loading application...
                </motion.p>

            </div>
        </div>
    );
};

export default AppLoader;