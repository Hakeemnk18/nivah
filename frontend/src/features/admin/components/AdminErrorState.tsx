import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

type AdminErrorStateProps = {
    title?: string;
    message?: string;
    onRetry?: () => void;
};

const AdminErrorState = ({
    title = "Something went wrong",
    message = "We couldn’t load the data. Please try again.",
    onRetry,
}: AdminErrorStateProps) => {
    return (
        <div className="w-full flex items-center justify-center py-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#232447] border border-[#2c2e4a] rounded-xl p-8 text-center max-w-md w-full"
            >
                <div className="flex justify-center mb-4">
                    <FiAlertCircle className="text-red-400 text-4xl" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                    {title}
                </h3>

                <p className="text-gray-400 text-sm mb-6">
                    {message}
                </p>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="bg-red-500 hover:bg-red-600 transition-colors px-5 py-2 rounded-lg text-sm font-medium"
                    >
                        Retry
                    </button>
                )}
            </motion.div>
        </div>
    );
};

export default AdminErrorState;