import { useState } from 'react'

export default function ShareLinkModal({ invitation, onClose }) {
  const [copied, setCopied] = useState(false)

  if (!invitation) return null

  const shareUrl = `${window.location.origin}/invite/${invitation.slug}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
      const input = document.getElementById('share-link-input')
      if (input) {
        input.select()
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1411]/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#ffffff] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#c5a869]/40 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8c7a6e] hover:text-[#251d18] text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f4ece0]"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#f7f1e4] text-[#8c6d34] flex items-center justify-center text-xl mx-auto mb-3 border border-[#c5a869]/30">
            🔗
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#251d18]">
            Share Wedding Invitation
          </h2>
          <p className="text-sm text-[#75675e] mt-1">
            {invitation.brideName} & {invitation.groomName}
          </p>
        </div>

        {/* URL Box */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
              Public Invitation Link
            </label>
            <div className="flex items-center gap-2">
              <input
                id="share-link-input"
                type="text"
                readOnly
                value={shareUrl}
                className="admin-input font-mono text-xs text-[#3b2c24] bg-[#faf7f2] select-all"
              />
              <button
                onClick={handleCopy}
                className="btn-gold-primary whitespace-nowrap text-xs py-2.5 px-4"
              >
                {copied ? '✓ Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Quick metadata */}
          <div className="bg-[#faf7f2] p-4 rounded-xl border border-[#e6dcce] text-xs space-y-1.5 text-[#63544b]">
            <div className="flex justify-between">
              <span className="font-semibold text-[#3b2c24]">Slug:</span>
              <span className="font-mono text-[#8c6d34]">{invitation.slug}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-[#3b2c24]">Template:</span>
              <span className="capitalize">{invitation.templateId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-[#3b2c24]">Status:</span>
              <span className="capitalize font-semibold text-emerald-700">{invitation.status || 'Active'}</span>
            </div>
            {invitation.expiresAt ? (
              <div className="flex justify-between">
                <span className="font-semibold text-[#3b2c24]">Expires:</span>
                <span>{new Date(invitation.expiresAt).toLocaleDateString()}</span>
              </div>
            ) : null}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#75675e] hover:text-[#251d18]"
            >
              Close
            </button>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-secondary text-xs py-2 px-4"
            >
              Open Invitation ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
