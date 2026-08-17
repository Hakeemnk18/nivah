import { useEffect, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
} from "framer-motion";
import { getOptimizedImageUrl } from "../../../shared/utils/cloudinary";

type Props = {
    title: string;
    subtitle: string;
    imageUrl: string;
};

type PetalConfig = {
    left: string;
    size: number;
    duration: number;
    delay: number;
    drift: number;
};

const PETALS: PetalConfig[] = [
    { left: "8%", size: 15, duration: 23, delay: 0, drift: 26 },
    { left: "27%", size: 10, duration: 27, delay: 5, drift: -20 },
    { left: "58%", size: 17, duration: 25, delay: 2.5, drift: 22 },
    { left: "80%", size: 11, duration: 29, delay: 8, drift: -26 },
];

type ParticleConfig = {
    left: string;
    top: string;
    size: number;
    duration: number;
    delay: number;
};

const PARTICLES: ParticleConfig[] = [
    { left: "22%", top: "32%", size: 3, duration: 6, delay: 0 },
    { left: "68%", top: "40%", size: 2, duration: 7, delay: 1.6 },
    { left: "46%", top: "62%", size: 3, duration: 7.5, delay: 3.2 },
];

function Petal({ left, size, duration, delay, drift }: PetalConfig) {
    return (
        <motion.div
            className="absolute -top-6"
            style={{ left, width: size, height: size }}
            initial={{ y: -20, opacity: 0 }}
            animate={{
                y: [-20, 460],
                x: [0, drift, 0],
                opacity: [0, 0.28, 0.28, 0],
                rotate: [0, 110, 220],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                    d="M12 2C8 6 6 10 12 22C18 10 16 6 12 2Z"
                    fill="#F0C6C0"
                    fillOpacity="0.6"
                />
            </svg>
        </motion.div>
    );
}

function Particle({ left, top, size, duration, delay }: ParticleConfig) {
    return (
        <motion.div
            className="absolute rounded-full bg-[#f5d98a]"
            style={{ left, top, width: size, height: size }}
            animate={{
                opacity: [0, 0.55, 0],
                y: [0, -20, -34],
            }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}

export default function CampaignHero({ title, subtitle, imageUrl }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const [parallaxEnabled, setParallaxEnabled] = useState(false);

    useEffect(() => {
        const isFinePointer = window.matchMedia("(pointer: fine)").matches;
        const isWideEnough = window.innerWidth >= 768;
        setParallaxEnabled(isFinePointer && isWideEnough && !prefersReducedMotion);
    }, [prefersReducedMotion]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

    // Background shifts a little on mouse move; the decorative foreground layer
    // (petals/particles) shifts more, giving a sense of depth from one flat photo.
    const bgX = useTransform(springX, [-1, 1], [-6, 6]);
    const bgY = useTransform(springY, [-1, 1], [-4, 4]);
    const fgX = useTransform(springX, [-1, 1], [-16, 16]);
    const fgY = useTransform(springY, [-1, 1], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!parallaxEnabled || !containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        mouseX.set(((e.clientX - left) / width) * 2 - 1);
        mouseY.set(((e.clientY - top) / height) * 2 - 1);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[21/9] max-h-[420px] overflow-hidden bg-[#171310]"
        >
            {/* Background image — slow Ken Burns drift + subtle mouse parallax */}
            <motion.div
                className="absolute inset-0"
                style={parallaxEnabled ? { x: bgX, y: bgY } : undefined}
            >
                <motion.img
                    src={getOptimizedImageUrl(imageUrl, 1600, 700)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ scale: 1.08 }}
                    animate={
                        prefersReducedMotion
                            ? { scale: 1.08 }
                            : { scale: [1.08, 1.16, 1.08], x: [0, 14, 0] }
                    }
                    transition={
                        prefersReducedMotion
                            ? undefined
                            : { duration: 34, repeat: Infinity, ease: "easeInOut" }
                    }
                />
            </motion.div>

            {/* Warm luxury color wash — replaces a flat black overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35" />

            {/* Very subtle light/shadow sweep across the whole scene */}
            {!prefersReducedMotion && (
                <motion.div
                    className="absolute inset-0 pointer-events-none mix-blend-soft-light"
                    style={{
                        backgroundImage:
                            "linear-gradient(115deg, transparent 30%, rgba(255,235,190,0.18) 45%, transparent 60%)",
                        backgroundSize: "220% 100%",
                    }}
                    initial={{ backgroundPositionX: "-40%" }}
                    animate={{ backgroundPositionX: ["-40%", "140%"] }}
                    transition={{ duration: 9, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
                />
            )}

            {/* Golden shimmer that occasionally passes across the jewelry */}
            {!prefersReducedMotion && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(100deg, transparent 40%, rgba(255,215,140,0.32) 50%, transparent 60%)",
                        backgroundSize: "60% 100%",
                        backgroundRepeat: "no-repeat",
                    }}
                    initial={{ backgroundPositionX: "-60%" }}
                    animate={{ backgroundPositionX: ["-60%", "160%"] }}
                    transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
                />
            )}

            {/* Floating petals + golden dust — sparse, hidden on small screens */}
            {!prefersReducedMotion && (
                <motion.div
                    className="absolute inset-0 pointer-events-none hidden sm:block"
                    style={parallaxEnabled ? { x: fgX, y: fgY } : undefined}
                >
                    {PETALS.map((petal, i) => (
                        <Petal key={i} {...petal} />
                    ))}
                    {PARTICLES.map((particle, i) => (
                        <Particle key={i} {...particle} />
                    ))}
                </motion.div>
            )}

            {/* Campaign text — staggered fade-up, then stays put */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <motion.h1
                    className="text-3xl sm:text-5xl font-semibold tracking-wide text-[#FBF3E3]"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                    {title}
                </motion.h1>

                <motion.div
                    className="h-px w-14 bg-[var(--accent)] mt-4 opacity-80"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 0.8, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />

                <motion.p
                    className="text-[#F3E6C8]/90 mt-4 max-w-xl text-sm sm:text-base tracking-wide"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                    {subtitle}
                </motion.p>
            </div>
        </div>
    );
}
