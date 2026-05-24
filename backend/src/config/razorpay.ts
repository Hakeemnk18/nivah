import Razorpay from "razorpay";

// Mirrors VITE_PAYMENT_MODE in frontend/.env — flip both together
const isTestMode = process.env.PAYMENT_MODE === "test";

export const razorpay = new Razorpay({
    key_id: isTestMode
        ? process.env.RAZORPAY_TEST_KEY_ID!
        : process.env.RAZORPAY_KEY_ID!,
    key_secret: isTestMode
        ? process.env.RAZORPAY_TEST_KEY_SECRET!
        : process.env.RAZORPAY_KEY_SECRET!,
});