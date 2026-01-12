import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AuthUser, LoginPayload, LoginResponse } from "../type/auth.type";
import { loginApi } from "../api/auth.api";

interface LoginVariables {
  data: LoginPayload;
  role: "user" | "admin";
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: loginApi,
    onSuccess:(data)=>{
      queryClient.setQueryData<AuthUser>(["auth-user"], data.data?.user);
      toast.success("login success")
    },
    retry: false,
  });
};