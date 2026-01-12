import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "../api/auth.api";

export const useAuthUser = ()=>{

    return useQuery({
    queryKey: ["auth-user"],
    queryFn: getCurrentUserApi,
    retry: false,
    staleTime: Infinity,
  });
}