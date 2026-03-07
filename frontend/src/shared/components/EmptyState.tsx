type EmptyStateProps = {
    title?: string;
    description?: string;
    onRetry?: () => void;
};

export default function EmptyState({
    title = "No products found",
    description = "Featured products will appear here once available.",
    onRetry
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">

            <p className="text-sm uppercase tracking-wide text-[#d4af37]">
                {title}
            </p>

            <p className="mt-2 max-w-md text-sm text-gray-400">
                {description}
            </p>

            <button
                onClick={onRetry}
                className="
                    mt-6
                    px-6 py-2
                    text-sm
                    border border-[#d4af37]
                    text-[#d4af37]
                    rounded-md
                    transition
                    hover:bg-[#d4af37]
                    hover:text-black
                    active:scale-95
                    duration-200
                "
            >
                Retry
            </button>

        </div>
    );
}