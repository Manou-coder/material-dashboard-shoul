/**
=========================================================
* Material Tailwind Dashboard React - v2.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-tailwind-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-tailwind-dashboard-react/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'
import { MaterialTailwindControllerProvider } from '@/utils/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import '../src/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

const root = document.getElementById('root')
const queryClient = new QueryClient()

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            <QueryClientProvider client={queryClient}>
              <ToastContainer autoClose={8000} style={{ zIndex: '10000' }} />
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}
