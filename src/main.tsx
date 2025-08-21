import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router/index.tsx'
import { AppStateProvider } from './contexts/appState.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppStateProvider>
      <AppRouter />
    </AppStateProvider>
  </StrictMode>,
)