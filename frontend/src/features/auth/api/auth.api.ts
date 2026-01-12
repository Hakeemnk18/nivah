import type { AuthUser, LoginPayload, LoginResponse } from "../type/auth.type";
import api from '../../../api/axios.instance'

import type { ApiResponse } from "../../../shared/types/api.types";

export const loginApi = async ({
  data,
  role,
}: {
  data: LoginPayload;
  role: "user" | "admin";
}): Promise<LoginResponse> => {
  const point = role === "user" ? "auth" : "admin";
  const response = await api.post<LoginResponse>(`/${point}/login`, data);
  return response.data;
};

export const getCurrentUserApi = async (): Promise<AuthUser | null> => {
  const response = await api.post<LoginResponse>("/auth/me");
  return response.data.data?.user ?? null;
};

export const logoutUserApi = async (): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>("/auth/logout");
  return response.data;
};