import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from '../../../api/axios.instance';
import SectionTitle from "../../../shared/components/SectionTitle";
import toast from "react-hot-toast";
import { useSyncPayment } from "../hooks/use.sync.payment";

type OrderStatus = "created" | "confirmed" | "cancelled";

const MAX_WAIT_TIME = 60000; // 1 minute
const POLL_INTERVAL = 3000;  // Every 3 seconds is safer to avoid rate limits

export default function PaymentProcessing() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { mutateAsync: syncPaymentData, isPending: isSyncing } = useSyncPayment()

    // States to manage the UI
    const [isTimedOut, setIsTimedOut] = useState(false);

    useEffect(() => {
        if (!orderId) return;

        let intervalId: ReturnType<typeof setInterval>;
        let timeoutId: ReturnType<typeof setTimeout>;

        // 1. Polling Function
        const checkStatus = async () => {
            try {
                const res = await api.get(`/orders/${orderId}/order-status`);
                const currentStatus: OrderStatus = res.data.data;

                if (currentStatus === "confirmed") {
                    cleanup();
                    navigate(`/order-success?orderId=${orderId}`);
                }

                if (currentStatus === "cancelled") {
                    cleanup();
                    navigate(`/order-cancelled?orderId=${orderId}`);
                }
            } catch (error) {
                console.error("Polling error:", error);
            }
        };

        // 2. Start Polling
        intervalId = setInterval(checkStatus, POLL_INTERVAL);

        // 3. Stop polling after 1 minute and show the manual sync button
        timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            setIsTimedOut(true);
        }, MAX_WAIT_TIME);

        // Utility to clear timers
        const cleanup = () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };

        return cleanup;
    }, [orderId, navigate]);

    // Handle the fallback Sync API Call
    const handleManualSync = async () => {

        try {
            // Call your newly created backend sync route
            const res = await syncPaymentData(orderId as string);

            if (res.data?.status === "confirmed") {
                navigate(`/order-success?orderId=${orderId}`);
            } else {
                toast.error("Payment not received. Order cancelled.");
                navigate(`/order-cancelled?orderId=${orderId}`);
            }
        } catch (error) {
            console.error("Sync error:", error);
            toast.error("Could not verify payment.");
            navigate(`/order-cancelled?orderId=${orderId}`);
        }
    };

    return (
        <section className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-10 flex flex-col items-center justify-center">
            <div className="max-w-xl w-full mx-auto px-4 text-center">

                <SectionTitle label="Processing Payment" />

                <div className="mt-8 p-8 bg-white shadow-lg rounded-2xl flex flex-col items-center gap-6 border border-gray-100">

                    {/* View 1: Actively Polling (Under 1 Minute) */}
                    {!isTimedOut ? (
                        <>
                            <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin" />

                            <div className="space-y-3">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    Confirming your payment...
                                </h2>
                                <p className="text-gray-500">
                                    Please wait while we securely verify your transaction with the bank.
                                </p>
                            </div>

                            {/* Important Warning */}
                            <div className="mt-4 px-4 py-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium w-full flex items-center justify-center gap-2">
                                ⚠️ Please do not close this window or click back.
                            </div>
                        </>
                    ) : (
                        /* View 2: Timed Out (After 1 Minute) - Manual Sync Required */
                        <>
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-3xl">
                                ⏱️
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Verification is taking longer than usual
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    We haven't received confirmation from the bank yet. Click the button below to force a final check.
                                </p>
                            </div>

                            <button
                                onClick={handleManualSync}
                                disabled={isSyncing}
                                className="mt-4 w-full md:w-auto px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSyncing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Checking Status...
                                    </>
                                ) : (
                                    "Verify Payment Status"
                                )}
                            </button>
                        </>
                    )}

                </div>
            </div>
        </section>
    );
}