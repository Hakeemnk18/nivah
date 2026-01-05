import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"

function App() {
  
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
