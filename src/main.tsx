import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "@/components/ui/sonner"
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { AppContextProvider } from './context/AppContext.tsx';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
