import { Router } from "express";
import { container } from "../../../di/container.js";
import { Authenticate } from "../../../infrastructure/middileware/auth.middleware.js";
import { ReportController } from "../controller/report.controller.js";


const router = Router();

const authenticate = container.resolve(Authenticate);

const reportController = container.resolve(ReportController);

//get revenue chart
router.get("/revenue", (req, res) =>
  reportController.getRevenueReport(req, res),
);

export default router;