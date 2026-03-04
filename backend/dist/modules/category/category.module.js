import categoryRouter from './routes/category.routes.js';
export default function registerCategoryModule(app) {
    app.use("/api/v1/categories", categoryRouter);
}
//# sourceMappingURL=category.module.js.map