import { Router } from "express";
import { container } from "tsyringe";
import { Authenticate } from "../../../infrastructure/middileware/auth.middleware.js";
import { authorizeRoles } from "../../../infrastructure/middileware/role.middleware.js";
import { CategoryController } from "../controller/category.controller.js";
const router = Router();
const authenticate = container.resolve(Authenticate);
const categoryController = container.resolve(CategoryController);
/* ---------- CREATE ---------- */
router.post("/", authenticate.authenticate, authorizeRoles("admin"), (req, res) => categoryController.createCategory(req, res));
/* ---------- EDIT ---------- */
router.put("/:id", authenticate.authenticate, authorizeRoles("admin"), (req, res) => categoryController.editCategory(req, res));
/* ---------- BLOCK ---------- */
router.patch("/:id/block", authenticate.authenticate, authorizeRoles("admin"), (req, res) => categoryController.blockCategory(req, res));
/* ---------- UNBLOCK ---------- */
router.patch("/:id/unblock", authenticate.authenticate, authorizeRoles("admin"), (req, res) => categoryController.unblockCategory(req, res));
/* ---------- USER: get parent categories ---------- */
router.get("/parent", (req, res) => categoryController.getParentCategories(req, res));
/* ---------- ADMIN: get all sub categories ---------- */
router.get("/sub-categories", authenticate.authenticate, authorizeRoles("admin"), (req, res) => categoryController.getAllSubCategoryForAdmin(req, res));
/* ---------- USER: get sub categories of parent ---------- */
router.get("/sub/:parentId", (req, res) => categoryController.getSubCategories(req, res));
/* ---------- ADMIN: get all categories ---------- */
router.get("/", authenticate.authenticate, authorizeRoles("admin"), (req, res) => categoryController.getAllParentCategoryForAdmin(req, res));
/* ---------- ADMIN: get all sub-categories of parent ---------- */
router.get("/:parentId/sub-categories", authenticate.authenticate, authorizeRoles("admin"), (req, res) => categoryController.getAllSubCategoryForAdminById(req, res));
/* ---------- USER: get signature categories ---------- */
router.get("/signature", (req, res) => categoryController.getSignatureCategories(req, res));
/* ---------- GET CATEGORY BY ID ---------- */
router.get("/:id", authenticate.authenticate, authorizeRoles("admin"), (req, res) => categoryController.getCategoryById(req, res));
/* ---------- USER: get all sub-categories ---------- */
router.get("/sub-categories/list", (req, res) => categoryController.getAllSubCategoryForUser(req, res));
export default router;
//# sourceMappingURL=category.routes.js.map