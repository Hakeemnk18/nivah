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