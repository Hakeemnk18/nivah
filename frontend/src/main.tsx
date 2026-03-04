import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import allRoutes from './routes/Index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { setQueryClient } from './shared/utils/logout.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false, // Prevents app-wide state loss on tab switch
    },
  },
});

const appRouter = createBrowserRouter(allRoutes)
const root = createRoot(document.getElementById('root')!)

setQueryClient(queryClient);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  </StrictMode>

)
