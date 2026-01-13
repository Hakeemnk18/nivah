import AdminBootstrap from "../features/admin/components/AdminBootstrap"
import Home from "../features/admin/pages/Home"
import AdminDashboard from "../features/auth/pages/AdminDashboard"
import LoginPage from "../features/auth/pages/LoginPage"


const adminRoutes = [
   {
        path:"login",
        element:(
            
         <LoginPage role="admin" />
            
        )
    },

    {
        path:"dashboard",
        element:(
        <AdminBootstrap>
            <AdminDashboard/>
        </AdminBootstrap>
         
            
        )
    }
]

export default adminRoutes