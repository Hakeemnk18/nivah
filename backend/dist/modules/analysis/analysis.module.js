import analysisRouter from "./routes/analysis.routes.js";
export default function registerAnalysisModule(app) {
    app.use("/api/v1/analysis", analysisRouter);
}
//# sourceMappingURL=analysis.module.js.map