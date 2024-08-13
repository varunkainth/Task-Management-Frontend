import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { store } from './store.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store = {store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    </ThemeProvider>
    </Provider>
  </StrictMode>,
)
