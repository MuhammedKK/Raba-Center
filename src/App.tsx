import { RouterProvider } from 'react-router'
import { router } from '@/app/router/routes'
import { ToastProvider } from '@/shared/components/ui'

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}
