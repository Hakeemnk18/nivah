const isProd = process.env.NODE_ENV === "production";
export const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: (isProd ? "none" : "lax"),
};
export const setAccessTokenCookie = (res, token) => {
    res.cookie("access_token", token, {
        ...cookieOptions,
        maxAge: 1 * 60 * 1000,
    });
};
export const setRefreshTokenCookie = (res, token) => {
    res.cookie("refresh_token", token, {
        ...cookieOptions,
        maxAge: 5 * 60 * 1000,
    });
};
//# sourceMappingURL=auth.helpers.js.map