import { Routes, Route } from 'react-router-dom'
import DashboardHome from './DashboardHome'
import NewRequestPage from './NewRequestPage'
import MyRequestsPage from './MyRequestsPage'
import DashboardLayout from '../layouts/DashboardLayout'
import TicketDetailPage from './TicketDetailPage'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="new" element={<NewRequestPage />} />
        <Route path="requests" element={<MyRequestsPage />} />
        <Route path="requests/:id" element={<TicketDetailPage />} />
      </Routes>

    </DashboardLayout>
  )
}
