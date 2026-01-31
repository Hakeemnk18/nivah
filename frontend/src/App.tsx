import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"
import { useAuthUser } from "./features/auth/hooks/useAuthUser";

function App() {
  // const { isLoading} = useAuthUser();
  // if(isLoading) return <h1>Loading.....</h1>
  
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            marginTop: "env(safe-area-inset-top)",
          },
        }}
      />
      <Outlet />
    </>
  )
}

export default App
