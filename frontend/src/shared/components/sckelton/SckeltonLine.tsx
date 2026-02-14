import Shimmer from "./Shimmer";

const SkeletonLine = ({
    width = "w-full",
    height = "h-4",
}: {
    width?: string;
    height?: string;
}) => {
    return (
        <div
            className={`${height} ${width} rounded-md relative overflow-hidden bg-[var(--muted)]/40`}
        >
            <Shimmer />
        </div>
    );
}

export default SkeletonLine;

