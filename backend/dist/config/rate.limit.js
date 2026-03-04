import rateLimit from "express-rate-limit";
export const reteLimiter = rateLimit({
    windowMs: Number(process.env.REFRESH_RATE_LIMIT_WINDOW),
    max: Number(process.env.REFRESH_RATE_LIMIT_MAX),
    message: "Too many refresh attempts. Try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
//# sourceMappingURL=rate.limit.js.map