import { Router } from "express";
import { container } from "../../../di/container.js";
import express from "express";

import { Authenticate } from "../../../infrastructure/middileware/auth.middleware.js";
import type { AuthRequest } from "../../../infrastructure/middileware/auth.type.js";
import { reteLimiter } from "../../../config/rate.limit.js";
import { AnalysisController } from "../controller/analysis.controller.js";


const router = Router()

const authenticate = container.resolve(Authenticate);

const analysisController = container.resolve(AnalysisController);




//get revenue chart
router.get('/revenue-chart', 
    (req, res) => analysisController.getRevenueChart(req, res)
);

export default router;