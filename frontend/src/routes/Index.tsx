import userRoutes from "./UserRoute";
import App from "../App";
import UserLayout from "../shared/layouts/UserLayoutes";
import adminRoutes from "./AdminRoute";
import AdminLayout from "../shared/layouts/AdminLayoutes";
import AdminBootstrap from "../features/admin/components/AdminBootstrap";
import { Children } from "react";


const allRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <UserLayout />,
        children: [...userRoutes],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          ...adminRoutes
        ],
      },
    ],
  },
];

export default allRoutes;
