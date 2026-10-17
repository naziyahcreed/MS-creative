import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import TemplateGallery from './pages/TemplateGallery'
import CreateInvitation from './pages/CreateInvitation'
import ManageInvitations from './pages/ManageInvitations'
import PublicInvitation from './pages/PublicInvitation'
import TemplatePreview from './pages/TemplatePreview'
import Template01 from './components/templates/template-01/Template01'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root Route: Main domain link loads First Template (Template 01) directly */}
        <Route path="/" element={<Template01 invitationData={null} />} />

        {/* Numbered shortcut routes: /1, /2, /3, /4, /5, /6 */}
        <Route path="/1" element={<Template01 invitationData={null} />} />
        <Route path="/2" element={<TemplatePreview templateIdProp="template-02" />} />
        <Route path="/3" element={<TemplatePreview templateIdProp="template-03" />} />
        <Route path="/4" element={<TemplatePreview templateIdProp="template-04" />} />
        <Route path="/5" element={<TemplatePreview templateIdProp="template-05" />} />
        <Route path="/6" element={<TemplatePreview templateIdProp="template-06" />} />

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

        {/* Catch-all: Fallback to First Template */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
