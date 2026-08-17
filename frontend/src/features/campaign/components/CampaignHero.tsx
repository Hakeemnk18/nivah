import { motion, useReducedMotion } from "framer-motion";
import { getOptimizedImageUrl } from "../../../shared/utils/cloudinary";

type Props = {
    title: string;
    subtitle: string;
    imageUrl: string;
};

/**
 * Splits a subtitle like "Up to 30% off, limited time" into the part up to
 * and including the percentage figure (gold-highlighted, scale-in) and
 * whatever follows (smaller tracked-out caption). Falls back gracefully if
 * the subtitle has no percentage at all.
 */
function splitSubtitle(subtitle: string): { highlighted: string; rest: string } {
    const match = subtitle.match(/^(.*?\d+%)(.*)$/i);
    if (!match) {
        return { highlighted: subtitle.trim(), rest: "" };
    }
    return { highlighted: match[1].trim(), rest: match[2].replace(/^[,.\s-]+/, "").trim() };
}

export default function CampaignHero({ title, subtitle, imageUrl }: Props) {
    const prefersReducedMotion = useReducedMotion();
    const { highlighted, rest } = splitSubtitle(subtitle);

    return (
        <div className="relative w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] max-h-[620px] overflow-hidden bg-[#171310]">
            {/* Background image — slow Ken Burns drift, biased right so the
          jewelry stays clear of the text panel */}
            <motion.img
                src={getOptimizedImageUrl(imageUrl, 1600, 800)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-[74%_center]"
                initial={{ scale: 1.06 }}
                animate={
                    prefersReducedMotion
                        ? { scale: 1.06 }
                        : { scale: [1.06, 1.13, 1.06], x: [0, 10, 0] }
                }
                transition={
                    prefersReducedMotion
                        ? undefined
                        : { duration: 36, repeat: Infinity, ease: "easeInOut" }
                }
            />

            {/* Flat readability wash — mobile only, since the text panel spans
          the full width there */}
            <div className="absolute inset-0 bg-black/45 sm:bg-transparent" />

            {/* Directional scrim for larger screens, where text only occupies
          the left portion and the jewelry should stay clearly visible */}
            <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

            {/* One extremely subtle golden shimmer passing over the jewelry */}
            {!prefersReducedMotion && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(100deg, transparent 55%, rgba(255,215,140,0.2) 65%, transparent 75%)",
                        backgroundSize: "55% 100%",
                        backgroundRepeat: "no-repeat",
                    }}
                    initial={{ backgroundPositionX: "-30%" }}
                    animate={{ backgroundPositionX: ["-30%", "220%"] }}
                    transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 10, ease: "easeInOut" }}
                />
            )}

            {/* Editorial headline — left-aligned, vertically centered, capped
          to roughly the left 45% on larger screens */}
            <div className="relative h-full max-w-7xl mx-auto flex items-center">
                <div className="w-full sm:w-1/2 lg:w-[45%] px-6 sm:px-8 lg:px-4 py-10">
                    <motion.h1
                        className="
              font-black uppercase text-[#FBF3E3]
              leading-[0.92] tracking-tight
              text-[clamp(2.4rem,10vw,3.5rem)] sm:text-6xl lg:text-7xl xl:text-[5.5rem]
            "
                        initial={{ opacity: 0, y: 26 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {title}
                    </motion.h1>

                    <div className="mt-5 sm:mt-7">
                        <motion.span
                            className="inline-block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--accent)] tracking-tight"
                            initial={{ opacity: 0, scale: 0.86 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {highlighted}
                        </motion.span>

                        {rest && (
                            <motion.p
                                className="mt-1 text-sm sm:text-base font-bold tracking-[0.25em] uppercase text-[#F3E6C8]/90"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {rest}
                            </motion.p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
