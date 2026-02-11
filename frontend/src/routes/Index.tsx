import userRoutes from "./UserRoute";
import App from "../App";
import adminRoutes from "./AdminRoute";
import AdminLayout from "../shared/layouts/AdminLayoutes";
import { ErrorBoundary } from "../shared/components/ErrorBoundary";
import NotFound from "../shared/components/NotFound";
import UserLayout from "../shared/layouts/UserLayoutes";

const allRoutes = [
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [

      ...userRoutes,


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
