export const ORDER_STATUS = [
  "created",
  "confirmed",
  "accepted",
  "dispatched",
  "cancelled",
] as const;

export type OrderStatus =
  (typeof ORDER_STATUS)[number];


export type OrderItemView = {
  itemId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type OrderListView = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  orderStatus: OrderStatus;
  createdAt: Date;
};

export type OrderView = {
  id: string;
  orderNumber: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  orderStatus: OrderStatus;
  createdAt: Date;
  items: OrderItemView[];
};

export interface IRazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, any>;
  created_at: number;
}

export interface IRazorpayOrderOptions {
  amount: number;
  currency: string;
  receipt: string;
}

export interface IRazorpayPayment {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed';
  order_id?: string | undefined;
  invoice_id?: string | undefined;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status: string | null;
  captured: boolean;
  description?: string | undefined;
  card_id?: string | undefined;
  bank?: string | undefined;
  wallet?: string | undefined;
  vpa?: string | undefined;
  email: string;
  contact: string;
  notes?: Record<string, any> | undefined;
  fee?: number | undefined;
  tax?: number | undefined;
  error_code?: string | undefined;
  error_description?: string | undefined;
  created_at: number;
}

