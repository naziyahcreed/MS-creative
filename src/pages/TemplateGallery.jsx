import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllTemplates } from '../utils/templateRegistry'

export default function TemplateGallery() {
  const templates = getAllTemplates()
  const [previewTemplate, setPreviewTemplate] = useState(null)

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="border-b border-[#e6dcce] pb-6">
        <span className="gold-badge mb-2">Design Showcase</span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#251d18]">
          Wedding Invitation Template Gallery
        </h2>
        <p className="text-xs sm:text-sm text-[#75675e] mt-1 max-w-2xl">
          Each template is an independent React component registered in the central template registry.
          Both original designs are preserved with zero modifications to animations, typography, or visual fidelity.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {templates.map((tpl) => {
          return (
            <div
              key={tpl.id}
              className="admin-card overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual Banner */}
                <div className="relative h-64 bg-[#1a1411] overflow-hidden">
                  <img
                    src={tpl.thumbnail}
                    alt={tpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1411]/90 via-[#1a1411]/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-[#1a1411]/80 backdrop-blur-md text-[#ffe682] text-xs font-mono font-bold px-3 py-1 rounded-full border border-[#c5a869]/50 shadow-sm">
                      {tpl.id}
                    </span>
                    <span className="bg-[#ffffff]/90 text-[#3b2c24] text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                      {tpl.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#ffffff] drop-shadow-sm">
                      {tpl.name}
                    </h3>
                    <p className="text-xs text-[#ffe682] font-medium mt-0.5 drop-shadow-xs">
                      {tpl.tagline}
                    </p>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-[#63544b] leading-relaxed">
                    {tpl.description}
                  </p>

                  {/* Highlights / Features */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8c6d34] mb-2">
                      Key Highlights & Animations
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#3b2c24]">
                      {tpl.features?.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#c5a869] font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {tpl.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-[#f4ece0] text-[#75675e] px-2 py-0.5 rounded-md border border-[#e6dcce]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 border-t border-[#f0e6d8] mt-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`/template/${tpl.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold-secondary text-xs py-2 px-3 flex-1 text-center font-medium"
                    title={`Open /template/${tpl.id} in separate tab`}
                  >
                    🔗 Open Link ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(tpl)}
                    className="btn-gold-secondary text-xs py-2 px-3 flex-1"
                  >
                    👁 Preview
                  </button>
                  <Link
                    to={`/admin/create?template=${tpl.id}`}
                    className="btn-gold-primary text-xs py-2 px-4 flex-1 text-center"
                  >
                    ✚ Use Design
                  </Link>
                </div>
                <div className="text-center">
                  <a
                    href={`/template/${tpl.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-mono text-[#8c6d34] hover:underline"
                  >
                    http://localhost:5174/template/{tpl.id}
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Developer Architecture Guide */}
      <div className="admin-card p-6 sm:p-8 bg-gradient-to-r from-[#faf7f2] via-[#ffffff] to-[#faf7f2]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#f7f1e4] text-[#8c6d34] flex items-center justify-center text-2xl shrink-0 border border-[#c5a869]/30">
            🧩
          </div>
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#251d18]">
              How to Add New Wedding Invitation Designs (Extensibility Architecture)
            </h3>
            <p className="text-xs text-[#63544b] leading-relaxed">
              The project is architected for adding unlimited new wedding invitation designs cleanly.
              Every design is an independent component that accepts an <code className="bg-[#f4ece0] px-1 py-0.5 rounded text-[11px]">invitationData</code> prop:
            </p>
            <ol className="list-decimal list-inside text-xs text-[#3b2c24] space-y-1.5 pt-1 pl-1">
              <li>
                Create your new design folder in <code className="bg-[#f4ece0] px-1 py-0.5 rounded font-mono text-[11px]">src/components/templates/template-03/Template03.jsx</code>.
              </li>
              <li>
                Register your component and metadata in <code className="bg-[#f4ece0] px-1 py-0.5 rounded font-mono text-[11px]">src/utils/templateRegistry.js</code> and <code className="bg-[#f4ece0] px-1 py-0.5 rounded font-mono text-[11px]">src/data/templates.json</code>.
              </li>
              <li>
                It will automatically appear in this gallery, the create form dropdown, and render dynamically at <code className="bg-[#f4ece0] px-1 py-0.5 rounded font-mono text-[11px]">/invite/:slug</code>.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Full Screen Live Preview Modal */}
      {previewTemplate ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#000000]/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1a1411] rounded-2xl w-full max-w-4xl h-[92vh] flex flex-col overflow-hidden border border-[#c5a869]/50 shadow-2xl relative">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#120c08] border-b border-[#c5a869]/30 text-[#ffffff]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#ffe682] bg-[#2a1b12] px-2 py-0.5 rounded border border-[#c5a869]/40">
                  {previewTemplate.id}
                </span>
                <span className="font-serif font-bold text-sm sm:text-base">
                  {previewTemplate.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to={`/admin/create?template=${previewTemplate.id}`}
                  className="btn-gold-primary text-xs py-1.5 px-3"
                  onClick={() => setPreviewTemplate(null)}
                >
                  Use This Template
                </Link>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="w-8 h-8 rounded-full bg-[#2a1b12] text-[#ffe682] hover:bg-[#3d2719] flex items-center justify-center text-lg font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Embedded Live Component View */}
            <div className="flex-1 overflow-y-auto bg-[#0d0907] relative">
              {previewTemplate.component ? (
                <previewTemplate.component invitationData={null} />
              ) : (
                <div className="text-center p-12 text-[#ffe682]">Component preview loading...</div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
