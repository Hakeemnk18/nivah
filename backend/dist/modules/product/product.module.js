import productRoutes from './routes/product.routes.js';
export default function registerProductModule(app) {
    app.use("/api/v1/products", productRoutes);
}
//# sourceMappingURL=product.module.js.map