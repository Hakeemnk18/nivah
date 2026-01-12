import type { ApiResponse } from "../../../shared/types/api.types"; 

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

export interface LoginData {
  user: AuthUser
}

export type LoginResponse = ApiResponse<LoginData>;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyOtpPayLoad {
  email: string,
  otp: string
}

export interface ResendOtpPayload {
  email: string
}

export interface GoogleLoginPayload {
    token: string
}

export type ResetPasswordPayload = {
    password: string;
    token: string;
}