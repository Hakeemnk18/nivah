import SectionTitle from "../../../shared/components/SectionTitle";

export default function About() {
    return (
        <section className="w-full bg-[var(--bg)] text-[var(--text)] py-10 md:py-14">
            <div className="px-4 max-w-4xl mx-auto">

                <SectionTitle label="About Nivah" />

                <p className="text-sm text-[var(--muted)] mt-4">
                    Elegant Jewelry • Ornaments • Meaningful Gifts
                </p>

                <div className="space-y-10 mt-10 text-sm leading-relaxed">

                    {/* 1 */}
                    <AboutSection title="1. Who We Are">
                        Nivah Jewelry offers a beautiful collection of jewelry,
                        ornaments, and gift items designed for both everyday wear
                        and special occasions. Our goal is to provide stylish pieces
                        that add elegance to every moment.
                    </AboutSection>

                    {/* 2 */}
                    <AboutSection title="2. Our Collection">
                        Our range includes:
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li>Necklaces</li>
                            <li>Earrings</li>
                            <li>Bangles</li>
                            <li>Fashion ornaments</li>
                            <li>Gift jewelry sets</li>
                        </ul>
                        Each piece is selected carefully to ensure attractive
                        design and good finishing quality.
                    </AboutSection>

                    {/* 3 */}
                    <AboutSection title="3. Quality & Style">
                        At Nivah, we focus on offering jewelry that balances
                        modern trends with timeless elegance. Our products are
                        chosen to suit different tastes while maintaining
                        affordability and style.
                    </AboutSection>

                    {/* 4 */}
                    <AboutSection title="4. Perfect for Gifting">
                        Jewelry is more than an accessory — it is a meaningful
                        gift. Whether it’s for a celebration, birthday, wedding,
                        or personal milestone, Nivah offers options that make
                        every occasion special.
                    </AboutSection>

                    {/* 5 */}
                    <AboutSection title="5. Our Commitment">
                        We are committed to providing a smooth shopping experience,
                        secure payments, and responsive customer support.
                        Your satisfaction is important to us.
                    </AboutSection>

                </div>
            </div>
        </section>
    );
}

function AboutSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <h2 className="text-base md:text-lg font-medium mb-3 text-[var(--text)]">
                {title}
            </h2>
            <div className="text-[var(--muted)] space-y-3">
                {children}
            </div>
        </div>
    );
}