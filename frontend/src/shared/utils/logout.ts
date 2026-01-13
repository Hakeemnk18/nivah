import { QueryClient } from "@tanstack/react-query";

let queryClientRef: QueryClient | null = null;

export const setQueryClient = (client: QueryClient) => {
  queryClientRef = client;
};

export const logout = () => {
  queryClientRef?.removeQueries({ queryKey: ["auth-user"] });
  window.location.reload()
};
