import { Router } from "express";
import { container } from "../../../di/container.js";
import express from "express";

import { Authenticate } from "../../../infrastructure/middileware/auth.middleware.js";
import type { AuthRequest } from "../../../infrastructure/middileware/auth.type.js";
import { reteLimiter } from "../../../config/rate.limit.js";
import { OrderController } from "../controller/order.controller.js";
import { RazorpayWebhookController } from "../controller/webhook.controller.js";
import { authorizeRoles } from "../../../infrastructure/middileware/role.middleware.js";

const router = Router()

const authenticate = container.resolve(Authenticate);

const orderController = container.resolve(OrderController);

const webhookController = container.resolve(RazorpayWebhookController);

//create order by webhook
router.post(
  "/webhook/razorpay",
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
  authenticate.authenticate,
  authorizeRoles("admin"),
  (req, res) => orderController.getAdminFullView(req, res))

//user get order status
router.get('/:orderId/order-status',
  (req, res) => orderController.getOrderStatus(req, res))



//get order summary
router.get('/:orderId/order-summary',
  (req, res) => orderController.getOrderSummary(req, res))

//admin download invoice
router.get("/:orderId/invoice/download",
  authenticate.authenticate,
  authorizeRoles("admin"),
  (req, res) => orderController.adminDownloadInvoice(req, res));

//user download invoice
router.get("/:orderId/invoice",
  (req, res) => orderController.downloadInvoice(req, res));

router.post("/:orderId/sync-payment",
  (req, res) => orderController.syncPayment(req, res));

//dispatch order
router.patch("/:orderId/dispatch",
  authenticate.authenticate,
  authorizeRoles("admin"),
  (req, res) => orderController.dispatchOrder(req, res));

//deliver order
router.patch("/:orderId/deliver",
  authenticate.authenticate,
  authorizeRoles("admin"),
  (req, res) => orderController.deliverOrder(req, res));

//accept order
router.patch("/:orderId/accept",
  authenticate.authenticate,
  authorizeRoles("admin"),
  (req, res) => orderController.acceptOrder(req, res));

//cancel order
router.patch("/:orderId/cancel",
  authenticate.authenticate,
  authorizeRoles("admin"),
  (req, res) => orderController.cancelOrder(req, res));

export default router