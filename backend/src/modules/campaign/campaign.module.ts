import campaignRoutes from './routes/campaign.routes.js'
import type { Application } from 'express';

export default function registerCampaignModule(app: Application) {
    app.use("/api/v1/campaigns", campaignRoutes);
}
