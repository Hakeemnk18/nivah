// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import type { LoginPayload, LoginResponse } from "../../../api/auth/auth.type";
// import { loginApi } from "../../../api/auth/auth.api";
// import type { AuthUser } from "../../../types/user.types";
// import toast from "react-hot-toast";

// interface LoginVariables {
//   data: LoginPayload;
//   role: "user" | "admin";
// }

export const useLogin = () => {
//   const queryClient = useQueryClient();
//   return useMutation<LoginResponse, Error, LoginVariables>({
//     mutationFn: loginApi,
//     onSuccess:(data)=>{
//       queryClient.setQueryData<AuthUser>(["auth-user"], data.data?.user);
//       toast.success("login success")
//     },
//     retry: false,
//   });
};