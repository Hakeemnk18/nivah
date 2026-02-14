import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

type CartErrorStateProps = {
    message?: string;
    onRetry?: () => void;
};

const CartErrorState = ({
    message = "Failed to load your cart.",
    onRetry,
}: CartErrorStateProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="
        mx-auto
        max-w-xl
        rounded-2xl
        border border-red-500/20
        bg-red-500/5
        text-center
        px-6 py-12
      "
        >
            {/* Icon */}
            <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-5">
                <AlertTriangle className="text-red-500" size={26} />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold tracking-wide mb-2">
                Something went wrong
            </h2>

            {/* Message */}
            <p className="text-[var(--muted)] text-sm max-w-md mx-auto">
                {message}
            </p>

            {/* Retry */}
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
          shadow-sm
        "
            >
                <RefreshCw size={16} />
                Try Again
            </button>
        </motion.div>
    );
}

export default CartErrorState;

