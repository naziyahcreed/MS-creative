import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  getInvitations,
  deleteInvitationFromProject,
  exportAllInvitations,
  importInvitationsFromJson,
} from '../utils/invitationStorage'
import { getExpiryStatus, formatExpiryDate } from '../utils/expiryUtils'
import { getAllTemplates } from '../utils/templateRegistry'
import ShareLinkModal from '../components/admin/ShareLinkModal'
import ExtendExpiryModal from '../components/admin/ExtendExpiryModal'

export default function ManageInvitations() {
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [templateFilter, setTemplateFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeShare, setActiveShare] = useState(null)
  const [activeExpiry, setActiveExpiry] = useState(null)
  const [actionNotice, setActionNotice] = useState(null)
  const fileInputRef = useRef(null)

  const loadInvitations = async () => {
    try {
      setLoading(true)
      const data = await getInvitations()
      setInvitations(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInvitations()
  }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete invitation "${name}" (${id}) from the project directory? This will remove its JSON files and client folder.`)) {
      return
    }

    try {
      await deleteInvitationFromProject(id)
      setActionNotice(`✓ Invitation "${id}" deleted from project folders.`)
      loadInvitations()
      setTimeout(() => setActionNotice(null), 3000)
    } catch (err) {
      alert(err.message || 'Failed to delete invitation.')
    }
  }

  const handleExport = async () => {
    try {
      await exportAllInvitations()
      setActionNotice('✓ Backup exported successfully.')
      setTimeout(() => setActionNotice(null), 3000)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (evt) => {
      try {
        await importInvitationsFromJson(evt.target.result)
        setActionNotice('✓ Backup imported successfully.')
        loadInvitations()
        setTimeout(() => setActionNotice(null), 3000)
      } catch (err) {
        alert(err.message)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  // Filter logic
  const filtered = invitations.filter((inv) => {
    const matchSearch =
      search === '' ||
      `${inv.brideName} ${inv.groomName} ${inv.id} ${inv.slug}`
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchTemplate =
      templateFilter === 'all' || inv.templateId === templateFilter

    const statusInfo = getExpiryStatus(inv.expiresAt, inv.status)
    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !statusInfo.isExpired) ||
      (statusFilter === 'expired' && statusInfo.isExpired)

    return matchSearch && matchTemplate && matchStatus
  })

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {actionNotice ? (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a1411] text-[#ffffff] px-5 py-3 rounded-xl shadow-2xl border border-[#c5a869] text-xs font-semibold">
          {actionNotice}
        </div>
      ) : null}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dcce] pb-6">
        <div>
          <span className="gold-badge mb-2">Record Management</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#251d18]">
            Manage Wedding Invitations
          </h2>
          <p className="text-xs sm:text-sm text-[#75675e] mt-1">
            View, edit, extend expiry, copy share links, or delete invitations saved in the project.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/admin/create" className="btn-gold-primary text-xs py-2 px-4">
            ✚ New Invitation
          </Link>
          <button
            onClick={handleExport}
            className="btn-gold-secondary text-xs py-2 px-3"
            title="Export JSON backup"
          >
            📥 Export
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-gold-secondary text-xs py-2 px-3"
            title="Import JSON backup"
          >
            📤 Import
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".json"
            className="hidden"
          />
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="admin-card p-4 flex flex-col md:flex-row items-center justify-between gap-3 bg-[#ffffff]">
        <div className="w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by couple name, ID, or slug..."
            className="admin-input text-xs py-2"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={templateFilter}
            onChange={(e) => setTemplateFilter(e.target.value)}
            className="admin-input text-xs py-2 w-auto bg-[#faf7f2]"
          >
            <option value="all">All Templates</option>
            {getAllTemplates().map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.id})
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-input text-xs py-2 w-auto bg-[#faf7f2]"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="expired">Expired Only</option>
          </select>

          <span className="text-xs text-[#75675e] font-medium ml-auto md:ml-0">
            Showing {filtered.length} of {invitations.length}
          </span>
        </div>
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="admin-card p-12 text-center text-xs text-[#75675e]">
          Loading saved invitations from filesystem...
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card p-12 text-center space-y-3">
          <p className="text-sm font-serif text-[#251d18]">
            No invitations found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearch('')
              setTemplateFilter('all')
              setStatusFilter('all')
            }}
            className="btn-gold-secondary text-xs py-1.5 px-3"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf5eb] border-b border-[#e6dcce] text-[#75675e] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Client & Couple</th>
                  <th className="py-3 px-4">Design Template</th>
                  <th className="py-3 px-4">Event Date</th>
                  <th className="py-3 px-4">Expiry Status</th>
                  <th className="py-3 px-4">Project File Path</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0e6d8]">
                {filtered.map((inv) => {
                  const statusInfo = getExpiryStatus(inv.expiresAt, inv.status)
                  const coupleImg =
                    inv.photos?.couple || inv.photos?.bride || '/images/hero-couple.jpg'

                  return (
                    <tr key={inv.id} className="hover:bg-[#faf7f2]/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={coupleImg}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover border border-[#c5a869]/50 shadow-xs"
                          />
                          <div>
                            <div className="font-serif font-bold text-sm text-[#251d18]">
                              {inv.brideName} & {inv.groomName}
                            </div>
                            <div className="text-[11px] font-mono text-[#8c6d34]">
                              {inv.id} • /invite/{inv.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="capitalize px-2 py-0.5 rounded-md bg-[#f4ece0] text-[#7d632c] font-medium text-[11px]">
                          {inv.templateId}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[#3b2c24]">
                        {inv.events?.find((e) => e.id === 'wedding')?.date ||
                          inv.weddingDate ||
                          '—'}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusInfo.badgeClass}`}
                        >
                          {statusInfo.label}
                        </span>
                        <div className="text-[10px] text-[#8c7a6e] mt-0.5">
                          {formatExpiryDate(inv.expiresAt)}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[10px] text-[#75675e]">
                        <div>public/invitations/{inv.id}/</div>
                        <div className="text-[9px] text-[#8c6d34]">src/data/invitations/{inv.id}.json</div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
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
                            title="Copy Share Link"
                          >
                            Share
                          </button>

                          <button
                            onClick={() => setActiveExpiry(inv)}
                            className="px-2.5 py-1 rounded bg-[#ffffff] hover:bg-[#f4ece0] border border-[#dfd7cc] text-[#63544b] font-medium text-[11px]"
                            title="Manage Expiry Date"
                          >
                            Expiry
                          </button>

                          <Link
                            to={`/admin/create?edit=${inv.id}`}
                            className="px-2.5 py-1 rounded bg-[#f7f1e4] hover:bg-[#ebdcc4] text-[#8c6d34] font-semibold text-[11px]"
                            title="Edit Record"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(inv.id, `${inv.brideName} & ${inv.groomName}`)}
                            className="px-2 py-1 rounded hover:bg-rose-50 text-rose-600 font-medium text-[11px]"
                            title="Delete from Project Directory"
                          >
                            Delete
                          </button>
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

      {/* Modals */}
      {activeShare ? (
        <ShareLinkModal invitation={activeShare} onClose={() => setActiveShare(null)} />
      ) : null}

      {activeExpiry ? (
        <ExtendExpiryModal
          invitation={activeExpiry}
          onClose={() => setActiveExpiry(null)}
          onUpdated={loadInvitations}
        />
      ) : null}
    </div>
  )
}
