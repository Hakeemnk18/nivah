import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser())
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://nivah-rho.vercel.app",
    "https://www.nivahfashions.com",
    "https://nivahfashions.com",
    "https://nivah.onrender.com"
  ],
  credentials: true,
}));
app.use(
  express.json({
    verify: (req: any, res, buf) => {
      if (req.originalUrl.includes("/webhook/razorpay")) {
        req.rawBody = buf;
      }
    },
  })
);
app.use(express.urlencoded({ extended: true }));

export default app;
