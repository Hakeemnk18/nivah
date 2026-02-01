import { lazy, Suspense } from "react";

/* ---------- lazy imports ---------- */
const AdminBootstrap = lazy(
  () => import("../features/admin/components/AdminBootstrap")
);
const Home = lazy(
  () => import("../features/admin/pages/Home")
);
const AdminDashboard = lazy(
  () => import("../features/auth/pages/AdminDashboard")
);
const LoginPage = lazy(
  () => import("../features/auth/pages/LoginPage")
);
const CategoryTable = lazy(
  () => import("../features/category/pages/CategoryList")
);

/* ---------- fallback loader ---------- */
const Loader = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-[#181a2a] gap-3">
    <div className="w-7 h-7 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin" />
    <p className="text-sm text-gray-400">Loading admin data…</p>
  </div>
);

const adminRoutes = [
  {
    path: "login",
    element: (
      <Suspense fallback={<Loader />}>
        <LoginPage role="admin" />
      </Suspense>
    ),
  },

  {
    path: "dashboard",
    element: (
      <Suspense fallback={<Loader />}>
        <AdminBootstrap>
          <AdminDashboard />
        </AdminBootstrap>
      </Suspense>
    ),
  },

  {
    path: "categoryManagement",
    element: (
      <Suspense fallback={<Loader />}>
       
          <CategoryTable />
        
      </Suspense>
    ),
  },
];

export default adminRoutes;
