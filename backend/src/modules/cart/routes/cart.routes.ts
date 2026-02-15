import { Router } from "express";
import { container } from "tsyringe";

import { Authenticate } from "../../../infrastructure/middileware/auth.middleware.js";
import { authorizeRoles } from "../../../infrastructure/middileware/role.middleware.js";
import { CartController } from "../controller/cart.controller.js";

const router = Router();

const authenticate = container.resolve(Authenticate);
const cartController = container.resolve(CartController);

/* ---------- CREATE ---------- */
router.post(
  "/",

  (req, res) => cartController.addToCart(req, res),
);

/* ---------- GET ---------- */
router.get(
  "/:guestId",
  (req, res) => cartController.getCart(req, res),
);

/* ---------- UPDATE ---------- */
router.patch(
  "/update-cart-count",
  (req, res) => cartController.updateCartCount(req, res),
);

/* ---------- DELETE ---------- */
router.patch(
  "/remove-cart-item",
  (req, res) => cartController.removeCartItem(req, res),
);

export default router;