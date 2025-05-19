import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/header'

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <main className="pt-16">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}
