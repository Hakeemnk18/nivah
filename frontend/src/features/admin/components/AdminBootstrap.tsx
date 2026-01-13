import { Navigate } from "react-router-dom";
import type { AuthUser } from "../../auth/type/auth.type";
import { useQueryClient } from "@tanstack/react-query";


const AdminBootstrap = ({ children }: { children: React.ReactNode }) => {
  
  console.log("bootstrap called")
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<AuthUser>(["auth-user"]);

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminBootstrap;
