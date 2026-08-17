import { Router } from "express";
import { container } from "tsyringe";

import { Authenticate } from "../../../infrastructure/middileware/auth.middleware.js";
import { authorizeRoles } from "../../../infrastructure/middileware/role.middleware.js";
import { CampaignController } from "../controller/campaign.controller.js";

const router = Router();

const authenticate = container.resolve(Authenticate);
const campaignController = container.resolve(CampaignController);

/* ---------- ADMIN: LIST ALL CAMPAIGNS ---------- */
router.get(
    "/",
    authenticate.authenticate,
    authorizeRoles("admin"),
    (req, res) => campaignController.getAllCampaignsForAdmin(req, res),
);

/* ---------- USER: GET CAMPAIGN BY SLUG ---------- */
router.get(
    "/slug/:slug",
    (req, res) => campaignController.getCampaignBySlugForUser(req, res),
);

/* ---------- ADMIN: GET CAMPAIGN BY ID ---------- */
router.get(
    "/:id",
    authenticate.authenticate,
    authorizeRoles("admin"),
    (req, res) => campaignController.getCampaignById(req, res),
);

/* ---------- ADMIN: CREATE CAMPAIGN ---------- */
router.post(
    "/",
    authenticate.authenticate,
    authorizeRoles("admin"),
    (req, res) => campaignController.createCampaign(req, res),
);

/* ---------- ADMIN: EDIT CAMPAIGN ---------- */
router.put(
    "/:id",
    authenticate.authenticate,
    authorizeRoles("admin"),
    (req, res) => campaignController.editCampaign(req, res),
);

/* ---------- ADMIN: BLOCK CAMPAIGN ---------- */
router.patch(
    "/:id/block",
    authenticate.authenticate,
    authorizeRoles("admin"),
    (req, res) => campaignController.blockCampaign(req, res),
);

/* ---------- ADMIN: UNBLOCK CAMPAIGN ---------- */
router.patch(
    "/:id/unblock",
    authenticate.authenticate,
    authorizeRoles("admin"),
    (req, res) => campaignController.unblockCampaign(req, res),
);

export default router;
