import AdminNavbar from "../../features/admin/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";


const AdminLayout = () => {
    const location = useLocation();

    const hideNavbarRoutes = [
    "/admin/login",
    "/admin/signup",
    "/admin/forgot-password",
  ];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <div className="min-h-screen flex flex-col">
      { !hideNavbar && <AdminNavbar />}
      
      <main className="flex-1 px-4 py-4 md:px-6 md:py-6">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
