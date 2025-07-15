import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider>
          <QueryClientProvider client={queryClient}>
              <App />
          </QueryClientProvider>
      </Provider>
  </StrictMode>
)
