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

//create order by webhook
router.post(
  "/webhook/razorpay",
  express.raw({ type: "application/json" }),
  (req, res) => webhookController.handle(req, res)
);

//create order
router.post('/',
  (req, res) => orderController.createOrder(req, res))

//get admin orders
router.get('/',
  (req, res) => orderController.getAdminOrders(req, res))

//verify payment
router.post('/verify-payment',
  (req, res) => orderController.verifyPayment(req, res))

//handle payment failure
router.post('/payment-failure',
  (req, res) => orderController.handlePaymentFailure(req, res)
)

//get admin full view
router.get('/:orderId',
  (req, res) => orderController.getAdminFullView(req, res))

//get order status
router.get('/:orderId/order-status',
  (req, res) => orderController.getOrderStatus(req, res))



//get order summary
router.get('/:orderId/order-summary',
  (req, res) => orderController.getOrderSummary(req, res))

//download invoice
router.get("/:orderId/invoice",
  (req, res) => orderController.downloadInvoice(req, res));

//admin download invoice
router.get("/:orderId/invoice/download",
  (req, res) => orderController.downloadInvoice(req, res));

//dispatch order
router.patch("/:orderId/dispatch",
  (req, res) => orderController.dispatchOrder(req, res));

//deliver order
router.patch("/:orderId/deliver",
  (req, res) => orderController.deliverOrder(req, res));

//accept order
router.patch("/:orderId/accept",
  (req, res) => orderController.acceptOrder(req, res));

//cancel order
router.patch("/:orderId/cancel",
  (req, res) => orderController.cancelOrder(req, res));

export default router