import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
export default app;
//# sourceMappingURL=app.js.map