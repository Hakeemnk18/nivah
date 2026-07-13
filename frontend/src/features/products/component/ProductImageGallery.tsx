import { useRef, useState } from "react";
import { getOptimizedImageUrl } from "../../../shared/utils/cloudinary";

type Props = {
    selectedImage: string | undefined;
    productName: string | undefined;
};

const MOBILE_ZOOM_SCALE = 2.2;
const TAP_MOVE_THRESHOLD_PX = 10;
const TAP_MAX_DURATION_MS = 300;

const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

export function ProductImageGallery({ selectedImage, productName }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Desktop hover-zoom
    const [isHovering, setIsHovering] = useState(false);
    const [hasHovered, setHasHovered] = useState(false);

    // Mobile tap-zoom + drag-to-pan
    const [isMobileZoomed, setIsMobileZoomed] = useState(false);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
    const panStartRef = useRef({ x: 0, y: 0 });
    // Touch devices fire synthetic "compatibility" mouse events shortly after a
    // real touch (mouseenter/mousemove). Once we see a genuine touch, ignore all
    // mouse events for the rest of this component's life so the desktop hover-zoom
    // (and its 1600px image fetch) never triggers on mobile.
    const isTouchDeviceRef = useRef(false);

    const handleMouseEnter = () => {
        if (isTouchDeviceRef.current) return;
        setHasHovered(true);
        setIsHovering(true);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDeviceRef.current || !overlayRef.current) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        overlayRef.current.style.backgroundPosition = `${x}% ${y}%`;
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        isTouchDeviceRef.current = true;
        const touch = e.touches[0];
        if (!touch) return;
        touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
        panStartRef.current = panOffset;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isMobileZoomed || !touchStartRef.current || !containerRef.current) return;
        const touch = e.touches[0];
        if (!touch) return;

        const dx = touch.clientX - touchStartRef.current.x;
        const dy = touch.clientY - touchStartRef.current.y;
        const { width, height } = containerRef.current.getBoundingClientRect();
        const maxPanX = (width * (MOBILE_ZOOM_SCALE - 1)) / 2;
        const maxPanY = (height * (MOBILE_ZOOM_SCALE - 1)) / 2;

        setPanOffset({
            x: clamp(panStartRef.current.x + dx, -maxPanX, maxPanX),
            y: clamp(panStartRef.current.y + dy, -maxPanY, maxPanY),
        });
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const start = touchStartRef.current;
        touchStartRef.current = null;
        if (!start) return;

        const touch = e.changedTouches[0];
        if (!touch) return;

        const movedX = Math.abs(touch.clientX - start.x);
        const movedY = Math.abs(touch.clientY - start.y);
        const duration = Date.now() - start.time;
        const wasTap =
            movedX < TAP_MOVE_THRESHOLD_PX &&
            movedY < TAP_MOVE_THRESHOLD_PX &&
            duration < TAP_MAX_DURATION_MS;

        if (wasTap) {
            setIsMobileZoomed((prev) => {
                const next = !prev;
                if (!next) setPanOffset({ x: 0, y: 0 });
                return next;
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className="
        relative aspect-square w-full overflow-hidden rounded-2xl
        border border-[var(--muted)] shadow-lg
        cursor-zoom-in touch-none
        bg-white
      "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* LAYER 1: The Static Image
        'object-cover' ensures the image fills the square completely
        with no empty space (ugly bars) at top/bottom.
        On mobile, tapping toggles a CSS-scale zoom on this same image
        (no extra network request) with drag-to-pan while zoomed.
      */}
            <img
                src={getOptimizedImageUrl(selectedImage, 900)}
                alt={productName}
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-200 ease-out select-none"
                style={
                    isMobileZoomed
                        ? {
                            transform: `scale(${MOBILE_ZOOM_SCALE}) translate(${panOffset.x / MOBILE_ZOOM_SCALE}px, ${panOffset.y / MOBILE_ZOOM_SCALE}px)`,
                        }
                        : undefined
                }
            />

            {/* LAYER 2: Desktop Hover-Zoom Overlay
        Invisible until hovered; the high-res background image URL is only
        attached after the first hover so it's never fetched on page load
        or on touch devices (which never fire mouse events).
      */}
            <div
                ref={overlayRef}
                className={`
          absolute inset-0 pointer-events-none transition-opacity duration-300
          ${isHovering ? "opacity-100" : "opacity-0"}
        `}
                style={{
                    backgroundImage: hasHovered
                        ? `url(${getOptimizedImageUrl(selectedImage, 1600)})`
                        : undefined,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "200%",
                }}
            />

            {/* Mobile zoom affordance */}
            {!isMobileZoomed && (
                <span
                    className="
            absolute bottom-3 right-3 sm:hidden
            rounded-full bg-black/50 text-white text-[11px]
            px-2.5 py-1 pointer-events-none
          "
                >
                    Tap to zoom
                </span>
            )}
        </div>
    );
}
