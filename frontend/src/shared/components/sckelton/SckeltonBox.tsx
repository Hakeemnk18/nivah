import Shimmer from "./Shimmer";

const SkeletonBox = ({ className }: { className: string }) => {
    return (
        <div className={`relative overflow-hidden bg-[var(--muted)]/40 ${className}`}>
            <Shimmer />
        </div>
    );
}

export default SkeletonBox;