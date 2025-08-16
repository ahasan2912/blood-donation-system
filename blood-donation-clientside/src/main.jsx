import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/Route.jsx'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './provider/AuthProvider.jsx'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Initialize AOS animation library
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-out-cubic'
})

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
