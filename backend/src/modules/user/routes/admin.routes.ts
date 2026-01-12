import { Router } from "express";
import { container } from "../../../di/container.js";
import { AdminController } from "../controllers/admin.auth.controller.js";
import { reteLimiter } from "../../../config/rate.limit.js";

const router = Router()

const adminController = container.resolve(AdminController);

router.post('/login', 
    
    (req,res)=> adminController.loginAdminController(req, res)
)

export default router