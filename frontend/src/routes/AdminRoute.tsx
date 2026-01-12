import Home from "../features/admin/pages/Home"
import AdminDashboard from "../features/auth/pages/AdminDashboard"
import LoginPage from "../features/auth/pages/LoginPage"


const adminRoutes = [
   

    {
        path:"dashboard",
        element:(
            
         <AdminDashboard/>
            
        )
    }
]

export default adminRoutes