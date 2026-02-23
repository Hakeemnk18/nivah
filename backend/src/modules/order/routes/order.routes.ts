import { Router } from "express";
import { container } from "../../../di/container.js";
import express from "express";

import { Authenticate } from "../../../infrastructure/middileware/auth.middleware.js";
import type { AuthRequest } from "../../../infrastructure/middileware/auth.type.js";
import { reteLimiter } from "../../../config/rate.limit.js";
import { OrderController } from "../controller/order.controller.js";
import { RazorpayWebhookController } from "../controller/webhook.controller.js";

const router = Router()

const authenticate = container.resolve(Authenticate);

const orderController = container.resolve(OrderController);

const webhookController = container.resolve(RazorpayWebhookController);

router.post(
  "/webhook/razorpay",
  express.raw({ type: "application/json" }),
  (req, res) => webhookController.handle(req, res)
);

router.post('/',
  (req, res) => orderController.createOrder(req, res))

router.post('/verify-payment',
  (req, res) => orderController.verifyPayment(req, res))

router.get('/:orderId/order-status',
  (req, res) => orderController.getOrderStatus(req, res))
router.post('/payment-failure',
  (req, res) => orderController.handlePaymentFailure(req, res)
)

export default router