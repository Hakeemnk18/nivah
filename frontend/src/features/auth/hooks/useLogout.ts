import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "../../../shared/types/api.types";
import { logoutUserApi } from "../api/auth.api";
import { handleApiError } from "../../../shared/utils/handle.api.error";



export const useLogout = () => {
  
  return useMutation<ApiResponse, Error>({
    mutationFn: logoutUserApi,
    onError:(error)=>{
        handleApiError(error)
    },
    retry: false,
  });
};