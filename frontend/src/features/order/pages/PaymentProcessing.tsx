import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from '../../../api/axios.instance'
import SectionTitle from "../../../shared/components/SectionTitle";

type OrderStatus = "created" | "confirmed" | "cancelled";

const MAX_WAIT_TIME = 90000;
const POLL_INTERVAL = 2000;

export default function PaymentProcessing() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState<OrderStatus>("created");
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        if (!orderId) return;

        let interval: any
        let timer: any

        const startPolling = () => {
            interval = setInterval(async () => {
                try {

                    const res = await api.get(`/orders/${orderId}/order-status`);
                    const currentStatus: OrderStatus = res.data.data;

                    setStatus(currentStatus);

                    if (currentStatus === "confirmed") {
                        clearInterval(interval);
                        clearTimeout(timer);
                        navigate(`/order-success?orderId=${orderId}`);
                    }

                    if (currentStatus === "cancelled") {
                        clearInterval(interval);
                        clearTimeout(timer);
                        navigate(`/order-cancelled?orderId=${orderId}`);
                    }

                } catch (error) {
                    console.error("Polling error:", error);
                }
            }, POLL_INTERVAL);
        };

        startPolling();

        timer = setTimeout(() => {
            clearInterval(interval);
            setElapsed(MAX_WAIT_TIME);
        }, MAX_WAIT_TIME);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [orderId, navigate]);

    return (
        <section className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-10">
            <div className="max-w-3xl mx-auto px-4 text-center">

                <SectionTitle label="Processing Payment" />

                <div className="mt-10 flex flex-col items-center gap-6">

                    {/* Spinner */}
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin" />

                    {/* Status Text */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">
                            We’re confirming your payment...
                        </h2>
                        <p className="text-sm opacity-70 max-w-md mx-auto">
                            Please wait while we securely verify your transaction.
                            This usually takes just a few seconds.
                        </p>
                    </div>

                    {/* Timeout Message */}
                    {elapsed >= MAX_WAIT_TIME && status === "created" && (
                        <div className="mt-6 p-4 rounded-xl bg-yellow-100 text-yellow-800 text-sm max-w-md">
                            Payment verification is taking longer than expected.
                            <div className="mt-3 flex justify-center gap-4">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                                >
                                    Retry
                                </button>
                                <button
                                    onClick={() => navigate("/orders")}
                                    className="px-4 py-2 border rounded-lg text-sm"
                                >
                                    Go to Orders
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}