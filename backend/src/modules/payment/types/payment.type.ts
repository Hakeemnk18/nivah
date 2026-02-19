
export const PAYMENT_STATUS = [
  "created",
  "authorized",
  "captured",
  "failed",
  "refunded",
] as const;

export type PaymentStatus =
  (typeof PAYMENT_STATUS)[number];

export const PAYMENT_MODE = [
  "upi",
  "card",
  "netbanking",
  "wallet",
  "emi",
] as const;

export type PaymentMode =
  (typeof PAYMENT_MODE)[number];