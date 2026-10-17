import { useParams, Link } from 'react-router-dom'
import { getAllTemplates, getTemplateById } from '../utils/templateRegistry'

export default function TemplatePreview({ templateIdProp }) {
  const { templateId: paramId } = useParams()
  const templateId = templateIdProp || paramId
  const all = getAllTemplates()
  const normalizedId = templateId?.startsWith('template-')
    ? templateId
    : `template-${String(templateId).padStart(2, '0')}`

  const template =
    all.find(
      (t) =>
        t.id === templateId ||
        t.id === normalizedId ||
        t.slug === templateId
    ) ||
    getTemplateById(templateId) ||
    getTemplateById(normalizedId)

  if (!template || !template.component) {
    return (
      <div className="min-h-screen bg-[#120c08] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1c120c] border border-[#c4a35a]/40 rounded-2xl p-8 text-center text-[#fbf6eb] space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#2a1b12] text-[#c4a35a] flex items-center justify-center text-2xl mx-auto border border-[#c4a35a]/30">
            🔍
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#ffd56b]">Template Not Found</h2>
          <p className="text-xs text-[#a8927a]">
            No template matching ID or slug: <code className="bg-[#2a1b12] px-2 py-0.5 rounded text-[#ffd56b]">{templateId}</code>
          </p>
          <div className="pt-2">
            <Link
              to="/admin/templates"
              className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d8bc7f] to-[#c5a869] text-[#1a1411] font-bold text-xs uppercase tracking-wider"
            >
              Browse Template Gallery
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const TemplateComponent = template.component

  return (
    <div className="template-preview-wrapper min-h-screen relative">
      <TemplateComponent invitationData={null} />
    </div>
  )
}
