import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { router } from './routes'
import './index.css'

const CLERK_PUBLISHABLE_KEY = 'pk_test_cHJvLXNlYXNuYWlsLTY1LmNsZXJrLmFjY291bnRzLmRldiQ'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
)
