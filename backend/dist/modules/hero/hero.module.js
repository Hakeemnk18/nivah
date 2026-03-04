import heroRoutes from './routes/hero.routes.js';
export default function registerHeroModule(app) {
    app.use("/api/v1/heroes", heroRoutes);
}
//# sourceMappingURL=hero.module.js.map