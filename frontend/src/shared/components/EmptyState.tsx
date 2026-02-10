type EmptyStateProps = {
    title?: string;
    description?: string;
};

export default function EmptyState({
    title = "No products found",
    description = "Featured products will appear here once available.",
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm uppercase tracking-wide text-[#d4af37]">
                {title}
            </p>
            <p className="mt-2 max-w-md text-sm text-gray-400">
                {description}
            </p>
        </div>
    );
}
