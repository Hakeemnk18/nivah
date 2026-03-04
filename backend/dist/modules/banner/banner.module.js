import bannerRoutes from './routes/banner.routes.js';
export default function registerBannerModule(app) {
    app.use("/api/v1/banners", bannerRoutes);
}
//# sourceMappingURL=banner.module.js.map