import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/app'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'


export const router = createBrowserRouter([

  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <Dashboard />},]
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/sign-in', element: <SignIn />},]
  }

  
])