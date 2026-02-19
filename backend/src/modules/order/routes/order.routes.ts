import { Router } from "express";
import { container } from "../../../di/container.js";

import { Authenticate } from "../../../infrastructure/middileware/auth.middleware.js";
import type { AuthRequest } from "../../../infrastructure/middileware/auth.type.js";
import { reteLimiter } from "../../../config/rate.limit.js";
import { OrderController } from "../controller/order.controller.js";

const router = Router()

const authenticate = container.resolve(Authenticate);

const orderController = container.resolve(OrderController);

router.post('/',
    (req, res) => orderController.createOrder(req, res))

export default router;