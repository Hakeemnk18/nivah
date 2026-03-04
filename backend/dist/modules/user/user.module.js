import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
export default function registerUserModule(app) {
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/admin", adminRoutes);
}
//# sourceMappingURL=user.module.js.map