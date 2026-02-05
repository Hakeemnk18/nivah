import { Router } from "express";
import { container } from "tsyringe";

import { Authenticate } from "../../../infrastructure/middileware/auth.middleware.js";
import { authorizeRoles } from "../../../infrastructure/middileware/role.middleware.js";
import { CategoryController } from "../controller/category.controller.js";

const router = Router();

const authenticate = container.resolve(Authenticate);
const categoryController = container.resolve(CategoryController);

/* ---------- CREATE ---------- */
router.post(
  "/",

  (req, res) => categoryController.createCategory(req, res),
);

/* ---------- EDIT ---------- */
router.put(
  "/:id",

  (req, res) => categoryController.editCategory(req, res),
);

/* ---------- BLOCK ---------- */
router.patch(
  "/:id/block",

  (req, res) => categoryController.blockCategory(req, res),
);

/* ---------- UNBLOCK ---------- */
router.patch(
  "/:id/unblock",

  (req, res) => categoryController.unblockCategory(req, res),
);

/* ---------- USER: get parent categories ---------- */
router.get(
  "/parent",

  (req, res) => categoryController.getParentCategories(req, res),
);

/* ---------- ADMIN: get all sub categories ---------- */
router.get(
  "/sub-categories",
  (req, res) => categoryController.getAllSubCategoryForAdmin(req, res),
);

/* ---------- USER: get sub categories ---------- */
router.get(
  "/sub/:parentId",
  (req, res) => categoryController.getSubCategories(req, res),
);
/* ---------- ADMIN: get all categories ---------- */
router.get(
  "/",

  (req, res) => categoryController.getAllParentCategoryForAdmin(req, res),
);

/* ---------- ADMIN: get all sub-categories ---------- */
router.get(
  "/:parentId/sub-categories",

  (req, res) => categoryController.getAllSubCategoryForAdminById(req, res),
);

/* ---------- GET CATEGORY BY ID ---------- */
router.get(
  "/:id",

  (req, res) => categoryController.getCategoryById(req, res),
);

export default router;
