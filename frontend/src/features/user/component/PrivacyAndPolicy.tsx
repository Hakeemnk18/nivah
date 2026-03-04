import SectionTitle from "../../../shared/components/SectionTitle";

export default function PrivacyPolicy() {
    return (
        <section className="w-full bg-[var(--bg)] text-[var(--text)] py-10 md:py-14">
            <div className="px-4 max-w-4xl mx-auto">

                <SectionTitle label="Privacy Policy" />

                <p className="text-sm text-[var(--muted)] mt-4">
                    Last updated: January 2026
                </p>

                <div className="space-y-10 mt-10 text-sm leading-relaxed">

                    {/* 1 */}
                    <PolicySection title="1. Introduction">
                        At NIVAH, we respect your privacy. This Privacy Policy explains
                        how we collect, use, and protect your personal information when
                        you place an order through our website.
                    </PolicySection>

                    {/* 2 */}
                    <PolicySection title="2. Information We Collect">
                        When you place an order, we collect:
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Delivery address</li>
                            <li>Order details</li>
                        </ul>
                    </PolicySection>

                    {/* 3 */}
                    <PolicySection title="3. Payments">
                        All payments are securely processed through Razorpay.
                        We do not store your card, UPI, or banking details on our servers.
                    </PolicySection>

                    {/* 4 */}
                    <PolicySection title="4. How We Use Your Information">
                        Your information is used only to:
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li>Process and deliver your order</li>
                            <li>Provide order updates</li>
                            <li>Respond to customer support inquiries</li>
                        </ul>
                        We do not sell, rent, or trade your personal information.
                    </PolicySection>

                    {/* 5 */}
                    <PolicySection title="5. Data Security">
                        We take reasonable measures to protect your information.
                        However, no online transmission can be guaranteed to be 100% secure.
                    </PolicySection>

                    {/* 6 */}
                    <PolicySection title="6. Third-Party Services">
                        We may use trusted third-party services such as Razorpay
                        for payment processing. These providers have their own
                        privacy policies governing the handling of your information.
                    </PolicySection>

                    {/* 7 */}
                    <PolicySection title="7. Contact Us">
                        If you have any questions about this Privacy Policy,
                        please contact us through the contact details provided
                        on our website.
                    </PolicySection>

                </div>
            </div>
        </section>
    );
}

function PolicySection({
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