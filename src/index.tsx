import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient()
root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
    </StrictMode>
)
