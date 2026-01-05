// import { useMutation } from "@tanstack/react-query";
// import type {
//   ResendOtpPayload,
// } from "../../../api/auth/auth.type";
// import { forgotPasswordApi,  } from "../../../api/auth/auth.api";
// import toast from "react-hot-toast";

// import { handleApiError } from "../../../utils/handle.api.error";
// import type { ApiResponse } from "../../../api/common.types";



export const useForgotPassword = () => {
  

//   return useMutation<ApiResponse, Error, ResendOtpPayload>({
//     mutationFn: forgotPasswordApi,
//     onSuccess: () => {
//       toast.success("Reset password link sent to your email");
//     },
//     onError: (error) => {
//       handleApiError(error);
//     },
//     retry: false,
//   });
};