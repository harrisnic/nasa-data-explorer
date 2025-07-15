import {FC, ReactNode, StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NasaCtxProvider from "@/providers/NasaCtxProvider.tsx";

const queryClient = new QueryClient()

// Create a wrapper component that contains the useReducer hook
const AppWrapper = () => {
    return (
        <StrictMode>
            <Provider>
                <QueryClientProvider client={queryClient}>
                    <NasaCtxProvider>
                        <App />
                    </NasaCtxProvider>
                </QueryClientProvider>
            </Provider>
        </StrictMode>
    )
}

createRoot(document.getElementById('root')!).render(<AppWrapper /> as ReactNode)

