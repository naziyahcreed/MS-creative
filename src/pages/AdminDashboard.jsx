import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getInvitations, exportAllInvitations, importInvitationsFromJson } from '../utils/invitationStorage'
import { getAllTemplates } from '../utils/templateRegistry'
import { getExpiryStatus, formatExpiryDate } from '../utils/expiryUtils'
import ShareLinkModal from '../components/admin/ShareLinkModal'
import ExtendExpiryModal from '../components/admin/ExtendExpiryModal'

export default function AdminDashboard() {
  const [invitations, setInvitations] = useState([])
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeShare, setActiveShare] = useState(null)
  const [activeExpiry, setActiveExpiry] = useState(null)
  const [actionMessage, setActionMessage] = useState(null)
  const fileInputRef = useRef(null)

  const loadData = async () => {
    try {
      setLoading(true)
      const invs = await getInvitations()
      const tmpls = getAllTemplates()
      setInvitations(invs)
      setTemplates(tmpls)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const totalCount = invitations.length
  const activeCount = invitations.filter((inv) => !getExpiryStatus(inv.expiresAt, inv.status).isExpired).length
  const expiredCount = invitations.filter((inv) => getExpiryStatus(inv.expiresAt, inv.status).isExpired).length
  const templateCount = templates.length

  const handleExport = async () => {
    try {
      await exportAllInvitations()
      setActionMessage('✓ All invitation records exported as JSON.')
      setTimeout(() => setActionMessage(null), 3000)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (evt) => {
      try {
        const text = evt.target.result
        await importInvitationsFromJson(text)
        setActionMessage('✓ Invitations imported successfully!')
        loadData()
        setTimeout(() => setActionMessage(null), 3000)
      } catch (err) {
        alert(err.message)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast message */}
      {actionMessage ? (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a1411] text-[#ffffff] px-5 py-3 rounded-xl shadow-2xl border border-[#c5a869] text-xs font-semibold flex items-center gap-2">
          {actionMessage}
        </div>
      ) : null}

      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e6dcce] pb-6">
        <div>
          <span className="gold-badge mb-2">Workspace Overview</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#251d18]">
            Wedding Invitation Management
          </h2>
          <p className="text-xs sm:text-sm text-[#75675e] mt-1">
            Store client images and data locally as project files • No cloud database required
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/admin/create" className="btn-gold-primary text-xs py-2 px-4">
            ✚ Create Invitation
          </Link>
          <button
            onClick={handleExport}
            className="btn-gold-secondary text-xs py-2 px-3.5"
            title="Download JSON backup"
          >
            📥 Export JSON
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-gold-secondary text-xs py-2 px-3.5"
            title="Import JSON backup"
          >
            📤 Import JSON
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            accept=".json"
            className="hidden"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="admin-card p-5 bg-gradient-to-br from-[#ffffff] to-[#faf5eb]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#75675e]">
            Total Invitations
          </span>
          <div className="text-3xl font-bold font-serif text-[#251d18] mt-2">
            {totalCount}
          </div>
          <div className="text-[11px] text-[#8c6d34] mt-1 font-medium">
            Saved in project folders
          </div>
        </div>

        <div className="admin-card p-5 bg-gradient-to-br from-[#ffffff] to-[#f0fdf4]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
            Active Invitations
          </span>
          <div className="text-3xl font-bold font-serif text-emerald-800 mt-2">
            {activeCount}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1 font-medium">
            Live and valid URLs
          </div>
        </div>

        <div className="admin-card p-5 bg-gradient-to-br from-[#ffffff] to-[#fff1f2]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-700">
            Expired
          </span>
          <div className="text-3xl font-bold font-serif text-rose-800 mt-2">
            {expiredCount}
          </div>
          <div className="text-[11px] text-rose-600 mt-1 font-medium">
            Needs expiry extension
          </div>
        </div>

        <div className="admin-card p-5 bg-gradient-to-br from-[#ffffff] to-[#fbf8f2]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#75675e]">
            Registered Templates
          </span>
          <div className="text-3xl font-bold font-serif text-[#8c6d34] mt-2">
            {templateCount}
          </div>
          <div className="text-[11px] text-[#75675e] mt-1 font-medium">
            Modular React components
          </div>
        </div>
      </div>

      {/* Registered Templates Quick Shelf */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#251d18]">
              Available Invitation Designs
            </h3>
            <p className="text-xs text-[#75675e]">
              Both existing designs are fully preserved and registered in the registry
            </p>
          </div>
          <Link
            to="/admin/templates"
            className="text-xs font-semibold text-[#8c6d34] hover:underline"
          >
            Browse Gallery & Specs →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {templates.map((tpl) => (
            <div key={tpl.id} className="admin-card overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-44 h-40 sm:h-auto bg-[#251d18] relative shrink-0">
                <img
                  src={tpl.thumbnail}
                  alt={tpl.name}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
                <span className="absolute top-2 left-2 bg-[#1a1411]/80 text-[#ffe682] text-[10px] font-mono px-2 py-0.5 rounded-md border border-[#c5a869]/40">
                  {tpl.id}
                </span>
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif font-bold text-base text-[#251d18]">
                      {tpl.name}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#f4ece0] text-[#7d632c]">
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#63544b] mt-1.5 line-clamp-2">
                    {tpl.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#f0e6d8] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {tpl.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[9px] bg-[#faf7f2] text-[#8c6d34] px-1.5 py-0.5 rounded border border-[#e6dcce]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/admin/create?template=${tpl.id}`}
                    className="btn-gold-primary text-[11px] py-1.5 px-3"
                  >
                    Select Template
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Client Invitations Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#251d18]">
              Recent Client Invitations
            </h3>
            <p className="text-xs text-[#75675e]">
              Stored inside <code className="bg-[#f4ece0] px-1 py-0.5 rounded text-[11px]">public/invitations/client-XXX/</code>
            </p>
          </div>
          <Link
            to="/admin/manage"
            className="text-xs font-semibold text-[#8c6d34] hover:underline"
          >
            Manage All ({totalCount}) →
          </Link>
        </div>

        {loading ? (
          <div className="admin-card p-12 text-center text-xs text-[#75675e]">
            Loading invitations from project files...
          </div>
        ) : invitations.length === 0 ? (
          <div className="admin-card p-12 text-center space-y-3">
            <p className="text-sm font-serif text-[#251d18]">No invitations created yet.</p>
            <Link to="/admin/create" className="btn-gold-primary text-xs py-2 px-4 inline-flex">
              Create First Invitation
            </Link>
          </div>
        ) : (
          <div className="admin-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#faf5eb] border-b border-[#e6dcce] text-[#75675e] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Couple</th>
                    <th className="py-3 px-4">Client ID & Slug</th>
                    <th className="py-3 px-4">Template</th>
                    <th className="py-3 px-4">Expiry Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0e6d8]">
                  {invitations.slice(0, 6).map((inv) => {
                    const statusInfo = getExpiryStatus(inv.expiresAt, inv.status)
                    const couplePhoto = inv.photos?.couple || inv.photos?.bride || '/images/hero-couple.jpg'

                    return (
                      <tr key={inv.id} className="hover:bg-[#faf7f2]/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={couplePhoto}
                              alt=""
                              className="w-9 h-9 rounded-full object-cover border border-[#c5a869]/50 shadow-xs"
                            />
                            <div>
                              <div className="font-serif font-bold text-sm text-[#251d18]">
                                {inv.brideName} & {inv.groomName}
                              </div>
                              <div className="text-[10px] text-[#8c7a6e]">
                                {inv.events?.find((e) => e.id === 'wedding')?.date || 'Date Pending'}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono">
                          <div className="text-xs text-[#3b2c24] font-semibold">{inv.id}</div>
                          <div className="text-[10px] text-[#8c6d34]">{inv.slug}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="capitalize px-2 py-0.5 rounded-md bg-[#f4ece0] text-[#7d632c] font-medium text-[11px]">
                            {inv.templateId}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusInfo.badgeClass}`}>
                              {statusInfo.label}
                            </span>
                            <div className="text-[10px] text-[#8c7a6e] mt-0.5">
                              {formatExpiryDate(inv.expiresAt)}
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`/invite/${inv.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded bg-[#ffffff] hover:bg-[#f4ece0] border border-[#dfd7cc] text-[#251d18] font-medium text-[11px]"
                              title="Preview Public Invitation"
                            >
                              Preview
                            </a>
                            <button
                              onClick={() => setActiveShare(inv)}
                              className="px-2.5 py-1 rounded bg-[#ffffff] hover:bg-[#f4ece0] border border-[#dfd7cc] text-[#8c6d34] font-medium text-[11px]"
                              title="Copy Share URL"
                            >
                              Share Link
                            </button>
                            <button
                              onClick={() => setActiveExpiry(inv)}
                              className="px-2.5 py-1 rounded bg-[#ffffff] hover:bg-[#f4ece0] border border-[#dfd7cc] text-[#63544b] font-medium text-[11px]"
                              title="Extend Expiry"
                            >
                              Expiry
                            </button>
                            <Link
                              to={`/admin/create?edit=${inv.id}`}
                              className="px-2.5 py-1 rounded bg-[#f7f1e4] hover:bg-[#ebdcc4] text-[#8c6d34] font-semibold text-[11px]"
                            >
                              Edit
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {activeShare ? (
        <ShareLinkModal invitation={activeShare} onClose={() => setActiveShare(null)} />
      ) : null}

      {activeExpiry ? (
        <ExtendExpiryModal
          invitation={activeExpiry}
          onClose={() => setActiveExpiry(null)}
          onUpdated={loadData}
        />
      ) : null}
    </div>
  )
}
