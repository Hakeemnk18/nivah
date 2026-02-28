import { Router } from "express";
import { container } from "../../../di/container.js";
import express from "express";

import { Authenticate } from "../../../infrastructure/middileware/auth.middleware.js";
import type { AuthRequest } from "../../../infrastructure/middileware/auth.type.js";
import { reteLimiter } from "../../../config/rate.limit.js";
import { AnalysisController } from "../controller/analysis.controller.js";

const router = Router();

const authenticate = container.resolve(Authenticate);

const analysisController = container.resolve(AnalysisController);

//get revenue chart
router.get("/revenue-chart", (req, res) =>
  analysisController.getRevenueChart(req, res),
);

// get KPI cards
router.get("/kpis", (req, res) => analysisController.getKpiCards(req, res));

// get product rankings
router.get("/product-rankings", (req, res) =>
  analysisController.getProductRankings(req, res),
);

// get category rankings
router.get("/category-rankings", (req, res) =>
  analysisController.getCategoryRankings(req, res),
);

// get motivation summary
router.get("/motivation", (req, res) =>
  analysisController.getMotivationSummary(req, res),
);

// get order status distribution
router.get("/order-status", (req, res) => analysisController.getOrderStatusDistribution(req, res));

export default router;
