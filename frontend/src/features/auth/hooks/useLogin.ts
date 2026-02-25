import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AuthUser, LoginPayload, LoginResponse } from "../type/auth.type";
import { loginApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

interface LoginVariables {
  data: LoginPayload;
  role: "user" | "admin";
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: loginApi,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<AuthUser>(["auth-user"], data.data?.user);
      toast.success("login success")
      if (variables.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    },
    retry: false,
  });
};