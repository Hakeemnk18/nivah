
import adminRoutes from './routes/admin.routes.js';
import type { Application } from 'express';

export default function registerUserModule(app:Application){
    
    app.use("/api/v1/admin", adminRoutes);
}
