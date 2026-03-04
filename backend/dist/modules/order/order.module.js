import orderRoutes from './routes/order.routes.js';
export default function registerOrderModule(app) {
    app.use("/api/v1/orders", orderRoutes);
}
//# sourceMappingURL=order.module.js.map