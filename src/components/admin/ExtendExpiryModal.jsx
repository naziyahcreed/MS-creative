import { useState } from 'react'
import { extendInvitationExpiry } from '../../utils/invitationStorage'
import { formatExpiryDate, getExpiryStatus } from '../../utils/expiryUtils'

export default function ExtendExpiryModal({ invitation, onClose, onUpdated }) {
  const currentExpiry = invitation?.expiresAt ? invitation.expiresAt.slice(0, 16) : ''
  const [newDate, setNewDate] = useState(currentExpiry || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  if (!invitation) return null

  const statusInfo = getExpiryStatus(invitation.expiresAt, invitation.status)

  const handleQuickAdd = (days) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    d.setHours(23, 59, 0, 0)
    setNewDate(d.toISOString().slice(0, 16))
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      setError(null)
      const isoDate = newDate ? new Date(newDate).toISOString() : null
      await extendInvitationExpiry(invitation.id, isoDate)
      setSuccess(true)
      setTimeout(() => {
        onUpdated?.()
        onClose()
      }, 1200)
    } catch (err) {
      setError(err.message || 'Failed to update expiry date.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1411]/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#ffffff] rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#c5a869]/40 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8c7a6e] hover:text-[#251d18] text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f4ece0]"
        >
          ×
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-[#f7f1e4] text-[#8c6d34] flex items-center justify-center text-xl mx-auto mb-2.5 border border-[#c5a869]/30">
            ⏳
          </div>
          <h2 className="text-xl font-serif font-bold text-[#251d18]">
            Manage Invitation Expiry
          </h2>
          <p className="text-xs text-[#75675e] mt-0.5">
            {invitation.brideName} & {invitation.groomName} ({invitation.id})
          </p>
        </div>

        {/* Current status pill */}
        <div className="bg-[#faf7f2] p-3.5 rounded-xl border border-[#e6dcce] mb-4 text-xs space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-[#63544b]">Current Status:</span>
            <span className={`px-2 py-0.5 rounded-full font-semibold border ${statusInfo.badgeClass}`}>
              {statusInfo.label}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#63544b]">Current Expiry:</span>
            <span className="font-medium text-[#251d18]">{formatExpiryDate(invitation.expiresAt)}</span>
          </div>
        </div>

        {/* Expiry Input */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
              New Expiry Date & Time
            </label>
            <input
              type="datetime-local"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="admin-input text-xs"
            />
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-[11px] text-[#8c7a6e] block mb-1">Quick Presets:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickAdd(30)}
                className="px-2.5 py-1 text-xs rounded-md bg-[#f4ece0] hover:bg-[#e8dcce] text-[#3d2e25] transition"
              >
                +30 Days
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(60)}
                className="px-2.5 py-1 text-xs rounded-md bg-[#f4ece0] hover:bg-[#e8dcce] text-[#3d2e25] transition"
              >
                +60 Days
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(180)}
                className="px-2.5 py-1 text-xs rounded-md bg-[#f4ece0] hover:bg-[#e8dcce] text-[#3d2e25] transition"
              >
                +6 Months
              </button>
              <button
                type="button"
                onClick={() => setNewDate('')}
                className="px-2.5 py-1 text-xs rounded-md bg-[#f4ece0] hover:bg-[#e8dcce] text-[#3d2e25] transition"
              >
                Clear (Never)
              </button>
            </div>
          </div>

          {error ? (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center font-semibold">
              ✓ Expiry updated and republished!
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e6dcce]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-3 py-1.5 text-xs text-[#75675e] hover:text-[#251d18]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="btn-gold-primary text-xs py-2 px-4"
            >
              {loading ? 'Saving...' : 'Update & Republish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
