import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { env } from '@/app/config/env'
import { AppProviders } from '@/app/providers/AppProviders'
import '@/styles/index.css'

async function enableMocking() {
  // This is a frontend-only demo with no real backend yet (see PLAN.md) — the
  // mock API layer stays active in production too, until VITE_USE_MOCKS=false
  // is set alongside a real VITE_API_BASE_URL.
  if (!env.useMocks) return
  const { worker } = await import('@/mocks/browser')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

void enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  )
})
