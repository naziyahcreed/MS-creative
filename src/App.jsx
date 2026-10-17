import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import TemplateGallery from './pages/TemplateGallery'
import CreateInvitation from './pages/CreateInvitation'
import ManageInvitations from './pages/ManageInvitations'
import PublicInvitation from './pages/PublicInvitation'
import TemplatePreview from './pages/TemplatePreview'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Direct Template Preview Route: /template/:templateId */}
        <Route path="/template/:templateId" element={<TemplatePreview />} />

        {/* Public Invitation Route: /invite/:slug */}
        <Route path="/invite/:slug" element={<PublicInvitation />} />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/templates"
          element={
            <AdminLayout>
              <TemplateGallery />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/create"
          element={
            <AdminLayout>
              <CreateInvitation />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/manage"
          element={
            <AdminLayout>
              <ManageInvitations />
            </AdminLayout>
          }
        />

        {/* Root redirect to Admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
