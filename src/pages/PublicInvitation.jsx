import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getInvitationBySlugOrId } from '../utils/invitationStorage'
import { getTemplateComponent } from '../utils/templateRegistry'
import { isInvitationExpired, formatExpiryDate } from '../utils/expiryUtils'
import ExtendExpiryModal from '../components/admin/ExtendExpiryModal'

export default function PublicInvitation() {
  const { slug } = useParams()
  const [invitation, setInvitation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAdminExtend, setShowAdminExtend] = useState(false)

  const loadInvitation = async () => {
    try {
      setLoading(true)
      const data = await getInvitationBySlugOrId(slug)
      if (!data) {
        setError(`Invitation "${slug}" could not be found in project records.`)
      } else {
        setInvitation(data)
      }
    } catch (err) {
      setError(err.message || 'Error loading invitation.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInvitation()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120c08] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 rounded-full border-2 border-[#c4a35a] border-t-transparent animate-spin mb-4" />
        <h2 className="font-serif text-[#ffe682] text-xl tracking-widest uppercase">
          Loading Sacred Invitation...
        </h2>
        <p className="text-xs text-[#a8927a] mt-2 font-mono">/invite/{slug}</p>
      </div>
    )
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-[#120c08] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1c120c] border border-[#c4a35a]/40 rounded-2xl p-8 text-center text-[#fbf6eb] space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#2a1b12] text-[#c4a35a] flex items-center justify-center text-2xl mx-auto border border-[#c4a35a]/30">
            ✉
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#ffd56b]">
            Wedding Invitation Not Found
          </h2>
          <p className="text-xs text-[#a8927a] leading-relaxed">
            The link <code className="bg-[#2a1b12] px-2 py-0.5 rounded text-[#ffd56b]">/invite/{slug}</code> does not match any invitation file stored in this project.
          </p>
          <div className="pt-2">
            <Link
              to="/admin"
              className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d8bc7f] to-[#c5a869] text-[#1a1411] font-bold text-xs uppercase tracking-wider"
            >
              Go to Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Check Expiration
  const isExpired = isInvitationExpired(invitation.expiresAt) || invitation.status === 'expired'

  if (isExpired) {
    return (
      <div className="min-h-screen bg-[#120c08] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1c120c] border border-[#c4a35a]/50 rounded-2xl p-8 text-center text-[#fbf6eb] space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#740a18] via-[#dfb557] to-[#740a18]" />

          <div className="w-16 h-16 rounded-full bg-[#2a1b12] text-[#ffd56b] flex items-center justify-center text-3xl mx-auto border border-[#c4a35a]/40 shadow-inner">
            ⌛
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#a8927a] font-semibold">
              Archived Celebration
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#ffd56b] mt-1">
              This wedding invitation is no longer available.
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-[#c8b7a6] leading-relaxed">
            The wedding celebration of{' '}
            <strong className="text-[#ffe682] font-serif">
              {invitation.brideName} & {invitation.groomName}
            </strong>{' '}
            has concluded, or the private invitation viewing window expired on{' '}
            <span className="font-mono text-[#ffd56b]">{formatExpiryDate(invitation.expiresAt)}</span>.
          </p>

          {invitation.rsvpPhone ? (
            <div className="bg-[#2a1b12]/80 p-3.5 rounded-xl border border-[#c4a35a]/30 text-xs text-[#a8927a]">
              For inquiries or well wishes, please contact the couple's family at:{' '}
              <span className="text-[#ffe682] font-mono font-bold block mt-1">
                {invitation.rsvpPhone}
              </span>
            </div>
          ) : null}

          <div className="pt-3 border-t border-[#c4a35a]/20 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setShowAdminExtend(true)}
              className="text-[11px] text-[#c4a35a] hover:underline"
            >
              Admin: Extend Expiry & Republish ↗
            </button>
            <span className="text-[#a8927a] text-[10px] hidden sm:inline">•</span>
            <Link to="/admin" className="text-[11px] text-[#a8927a] hover:text-[#fbf6eb]">
              Admin Portal
            </Link>
          </div>
        </div>

        {showAdminExtend ? (
          <ExtendExpiryModal
            invitation={invitation}
            onClose={() => setShowAdminExtend(false)}
            onUpdated={loadInvitation}
          />
        ) : null}
      </div>
    )
  }

  // Render Template with dynamic invitation data
  const TemplateComponent = getTemplateComponent(invitation.templateId)

  return (
    <div className="public-invitation-view min-h-screen">
      <TemplateComponent invitationData={invitation} />
    </div>
  )
}
