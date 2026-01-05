import Home from "../features/admin/pages/Home"
import LoginPage from "../features/auth/pages/LoginPage"


const adminRoutes = [
    {
        path:"login",
        element:(
            
         <LoginPage role="admin"/>
            
        )
    },

    {
        path:"dashboard",
        element:(
            
         <Home/>
            
        )
    }
]

export default adminRoutes