import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

type CheckoutErrorProps = {
    message?: string;
    onRetry?: () => void;
};

const CheckoutError = ({
    message = "We couldn’t load your checkout details. Please try again.",
    onRetry,
}: CheckoutErrorProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="
        mx-auto
        max-w-2xl
        rounded-2xl
        border border-red-500/20
        bg-red-500/5
        px-6 py-10
        text-center
      "
        >
            {/* Icon */}
            <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-5">
                <AlertTriangle className="text-red-500" size={26} />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-2">
                Checkout unavailable
            </h2>

            {/* Message */}
            <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
                {message}
            </p>

            {/* Retry button */}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="
            mt-6
            inline-flex items-center gap-2
            px-5 py-2.5
            rounded-xl
            bg-[var(--accent)]
            text-black
            font-semibold
            hover:opacity-90
            transition
          "
                >
                    <RefreshCw size={16} />
                    Try Again
                </button>
            )}
        </motion.div>
    );
};

export default CheckoutError;
