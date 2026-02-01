import userRoutes from "./UserRoute";
import App from "../App";
import UserLayout from "../shared/layouts/UserLayoutes";
import adminRoutes from "./AdminRoute";
import AdminLayout from "../shared/layouts/AdminLayoutes";
import { ErrorBoundary } from "../shared/components/ErrorBoundary";
import NotFound from "../shared/components/NotFound";

const allRoutes = [
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        element: <UserLayout />,
        children: [...userRoutes],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [...adminRoutes],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default allRoutes;
