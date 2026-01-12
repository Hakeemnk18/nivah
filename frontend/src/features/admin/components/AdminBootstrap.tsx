import { Navigate } from "react-router-dom";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

const AdminBootstrap = ({ children }: { children: React.ReactNode }) => {
  console.log("admin bootstrap called")
  const { data: user, isLoading, isError } = useAuthUser();

  if (isLoading) return <h1>Loading.....</h1>;

  if (isError || !user || user.role !== "admin") {
    console.log("no admin exist")
  return <Navigate to="/admin/login" replace />;
}

  return <>{children}</>;
};

export default AdminBootstrap