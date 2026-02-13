import { useState, useRef } from "react";

type Props = {
    selectedImage: string | undefined;
    productName: string | undefined;
};

export function ProductImageGallery({ selectedImage, productName }: Props) {
    const [isHovering, setIsHovering] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // If the overlay ref isn't ready, don't do anything
        if (!overlayRef.current) return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

        // Calculate percentage position
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        // Update the background position of the overlay directly for performance
        overlayRef.current.style.backgroundPosition = `${x}% ${y}%`;
    };

    return (
        <div
            className="
        relative aspect-square w-full overflow-hidden rounded-2xl
        border border-[var(--muted)] shadow-lg
        cursor-zoom-in touch-none
        bg-white
      "
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
        >
            {/* LAYER 1: The Static Image 
        'object-cover' ensures the image fills the square completely 
        with no empty space (ugly bars) at top/bottom.
      */}
            <img
                src={selectedImage}
                alt={productName}
                className="h-full w-full object-cover transition-opacity duration-300"
            />

            {/* LAYER 2: The Zoom Overlay 
        This is an invisible div that becomes visible on hover.
        It sits on top of the image.
      */}
            <div
                ref={overlayRef}
                className={`
          absolute inset-0 pointer-events-none transition-opacity duration-300
          ${isHovering ? "opacity-100" : "opacity-0"}
        `}
                style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundRepeat: "no-repeat",
                    // 'cover' might result in whitespace for zoom, so we use a fixed large scale (e.g. 200%)
                    // or you can use '250%' for a stronger zoom.
                    backgroundSize: "200%",
                }}
            />
        </div>
    );
}