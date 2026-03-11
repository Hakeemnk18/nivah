import type { Response } from 'express';

const isProd = process.env.NODE_ENV === "production"

export const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: (isProd ? "none" : "lax") as "none" | "lax",
};

export const setAccessTokenCookie = (res: Response, token: string) => {
  res.cookie("access_token", token, {
    ...cookieOptions,
    maxAge: 30 * 60 * 1000,
  });
};

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie("refresh_token", token, {
    ...cookieOptions,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

