import {StrictMode} from 'react'
import type {ReactNode} from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NasaCtxProvider from "@/stores/nasa/NasaCtxProvider.tsx";
import {RouterProvider} from "react-router-dom";
import router from "@/routes.tsx";

const queryClient = new QueryClient()

// Create a wrapper component that contains the useReducer hook
const AppWrapper = () => {
    return (
        <StrictMode>
            <Provider>
                <QueryClientProvider client={queryClient}>
                    <NasaCtxProvider>
                        <RouterProvider router={router} />
                    </NasaCtxProvider>
                </QueryClientProvider>
            </Provider>
        </StrictMode>
    )
}

createRoot(document.getElementById('root')!).render(<AppWrapper /> as ReactNode)

