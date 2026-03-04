

export default function TermsAndConditionsPage() {
    return (
        <section className="bg-[var(--bg)] text-[var(--text)] py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
                    Terms & Conditions
                </h1>

                <div className="space-y-10 text-sm sm:text-base leading-relaxed">

                    {/* 1. Introduction */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                        <p>
                            Welcome to Nivah. We are a small online fashion jewelry store operating within India.
                            By accessing or purchasing from our website, you agree to comply with the following
                            Terms & Conditions.
                        </p>
                    </div>

                    {/* 2. Business Information */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">2. Business Information</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>We operate as a small online store.</li>
                            <li>We currently sell only within India.</li>
                            <li>We do not offer international shipping.</li>
                            <li>We sell fashion jewelry only (not real gold or silver).</li>
                        </ul>
                    </div>

                    {/* 3. Payments */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">3. Payments</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>All payments are securely processed through Razorpay.</li>
                            <li>Payment methods supported by Razorpay (UPI, Cards, etc.) are accepted.</li>
                            <li>All orders are prepaid and confirmed only after successful payment.</li>
                            <li>Orders will not be shipped without payment confirmation.</li>
                        </ul>
                    </div>

                    {/* 4. Shipping */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">4. Shipping Policy</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>We offer free shipping across India.</li>
                            <li>Delivery timelines depend on the delivery partner.</li>
                            <li>In Kerala, delivery may take up to 10 days.</li>
                        </ul>
                    </div>

                    {/* 5. Exchange & Return Policy */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">5. Exchange Policy (No Refunds)</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>We do not offer refunds.</li>
                            <li>We only allow exchanges within 2 days of delivery.</li>
                            <li>Unboxing video is mandatory for any exchange request.</li>
                            <li>The product must be unused and in original packaging.</li>
                            <li>If the unboxing video is not provided, exchange requests will not be accepted.</li>
                        </ul>
                    </div>

                    {/* 6. Order Cancellation */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">6. Order Cancellation</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Orders cannot be cancelled once confirmed.</li>
                            <li>As all orders are prepaid, cancellation after confirmation is not permitted.</li>
                        </ul>
                    </div>

                    {/* 7. Product Information & Liability */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">7. Product Information & Liability</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Product images are for representation purposes only.</li>
                            <li>Slight color variations may occur due to lighting or screen differences.</li>
                            <li>We are not responsible for minor variations in color or appearance.</li>
                        </ul>
                    </div>

                    {/* 8. Contact Information */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">8. Contact Information</h2>
                        <p>
                            For any queries regarding orders or exchanges, contact us at:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li>Email: nivahfsn@gmail.com</li>
                            <li>WhatsApp: 9037577599</li>
                        </ul>
                    </div>

                    {/* 9. Acceptance */}
                    <div>
                        <h2 className="text-xl font-semibold mb-3">9. Acceptance of Terms</h2>
                        <p>
                            By placing an order on our website, you acknowledge that you have read,
                            understood, and agreed to these Terms & Conditions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}