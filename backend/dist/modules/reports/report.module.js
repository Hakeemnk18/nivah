import reportRouter from "./routes/report.routes.js";
export default function registerReportModule(app) {
    app.use("/api/v1/reports", reportRouter);
}
//# sourceMappingURL=report.module.js.map