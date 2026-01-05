import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import allRoutes from './routes/Index.tsx'


const appRouter = createBrowserRouter(allRoutes)
const root = createRoot(document.getElementById('root')!)


root.render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
)
