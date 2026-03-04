import cartRoutes from './routes/cart.routes.js';
export default function registerCartModule(app) {
    app.use("/api/v1/cart", cartRoutes);
}
//# sourceMappingURL=cart.module.js.map