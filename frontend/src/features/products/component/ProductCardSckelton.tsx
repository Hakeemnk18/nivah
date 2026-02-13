
const ProductCardSckelton = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="h-64 bg-[var(--card)] animate-pulse rounded-xl"
                />
            ))}
        </div>
    );
};

export default ProductCardSckelton;