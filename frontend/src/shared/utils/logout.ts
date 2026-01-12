import { QueryClient } from "@tanstack/react-query";

let queryClientRef: QueryClient | null = null;

export const setQueryClient = (client: QueryClient) => {
  queryClientRef = client;
};

export const logout = () => {
  console.log("logout called")
  queryClientRef?.clear();
};