type Props = {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
};

export default function ProductCard({ product }: Props) {
    return (
        <div className="bg-[var(--card)] rounded-xl p-4 hover:shadow-lg transition">
            <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg"
                loading="lazy"
            />

            <h3 className="mt-3 text-sm font-medium">
                {product.name}
            </h3>

            <p className="text-[var(--accent)] mt-1 text-sm">
                ₹{product.price}
            </p>
        </div>
    );
}
