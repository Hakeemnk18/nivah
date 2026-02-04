import { Router } from "express";
import { container } from "tsyringe";

import { Authenticate } from "../../../infrastructure/middileware/auth.middleware.js";
import { authorizeRoles } from "../../../infrastructure/middileware/role.middleware.js";
import { ProductController } from "../controller/product.controller.js";

const router = Router();

const authenticate = container.resolve(Authenticate);
const productController = container.resolve(ProductController);

/* ---------- CREATE PRODUCT ---------- */
router.post(
  "/",
  (req, res) => productController.createProduct(req, res),
);

/* ---------- EDIT PRODUCT ---------- */
router.put(
  "/:id",
  (req, res) => productController.editProduct(req, res),
);

/* ---------- BLOCK PRODUCT ---------- */
router.patch(
  "/:id/block",
  (req, res) => productController.blockProduct(req, res),
);

/* ---------- UNBLOCK PRODUCT ---------- */
router.patch(
  "/:id/unblock",
  (req, res) => productController.unblockProduct(req, res),
);

/* ---------- ADMIN: GET ALL PRODUCTS ---------- */
router.get(
  "/",
  (req, res) => productController.getAllProductForAdmin(req, res),
);

/* ---------- ADD VARIANT ---------- */
router.post(
  "/:productId/variants",
  (req, res) => productController.addVariant(req, res),
);

/* ---------- EDIT VARIANT ---------- */
router.put(
  "/:productId/variants/:variantId",
  (req, res) => productController.editVariant(req, res),
);

export default router;
