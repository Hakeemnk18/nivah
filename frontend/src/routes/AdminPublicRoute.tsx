
import LoginPage from "../features/auth/pages/LoginPage"


const adminPublicRoutes = [
    {
        path:"login",
        element:(
            
         <LoginPage role="admin"/>
            
        )
    },
]

export default adminPublicRoutes