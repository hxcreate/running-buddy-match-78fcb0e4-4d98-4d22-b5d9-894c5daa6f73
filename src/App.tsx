import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import DemoStatsPage from './pages/demo-stats'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DemoStatsPage />} />
      </Routes>
      <Toaster />
    </Router>
  )
}
