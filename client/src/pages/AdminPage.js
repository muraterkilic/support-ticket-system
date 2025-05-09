import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import AdminRequestsPage from './AdminRequestsPage'
import AdminTicketDetailPage from './AdminTicketDetailPage'

export default function AdminPage() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminRequestsPage />} />
        <Route path="tickets/:id" element={<AdminTicketDetailPage />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </AdminLayout>
  )
}
