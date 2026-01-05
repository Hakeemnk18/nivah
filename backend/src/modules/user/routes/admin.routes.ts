import { Router } from "express";
import { container } from "../../../di/container.js";
import { AdminController } from "../controllers/admin.auth.controller.js";
import { reteLimiter } from "../../../config/rarte.limit.js";

const router = Router()

const adminController = container.resolve(AdminController);

router.post('/login', 
    reteLimiter,
    (req,res)=> adminController.loginAdminController(req, res)
)

export default router