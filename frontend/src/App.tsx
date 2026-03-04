import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"
import { useAuthUser } from "./features/auth/hooks/useAuthUser";
import ScrollToTop from "./shared/components/ScrollToTop";
import AppLoader from "./shared/components/AppLoader";

function App() {
  const { isLoading } = useAuthUser();
  if (isLoading) return <AppLoader />

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
      <ScrollToTop />
      <Outlet />
    </>
  )
}

export default App
