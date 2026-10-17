/**
 * Expiry management utility functions.
 * Note: Frontend expiry verification provides presentation-layer control.
 * In a static website, full access control requires server-side validation.
 */

export function isInvitationExpired(expiresAt) {
  if (!expiresAt) return false
  const expiryTime = new Date(expiresAt).getTime()
  if (isNaN(expiryTime)) return false
  return Date.now() > expiryTime
}

export function formatExpiryDate(expiresAt) {
  if (!expiresAt) return 'Never Expires'
  const date = new Date(expiresAt)
  if (isNaN(date.getTime())) return 'Invalid date'
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export function getTimeRemaining(expiresAt) {
  if (!expiresAt) return { isExpired: false, label: 'Permanent' }
  const diff = new Date(expiresAt).getTime() - Date.now()
  if (diff <= 0) {
    return { isExpired: true, label: 'Expired' }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)

  if (days > 0) {
    return { isExpired: false, label: `${days}d ${hours}h left`, days, hours }
  }
  if (hours > 0) {
    return { isExpired: false, label: `${hours}h ${minutes}m left`, days: 0, hours }
  }
  return { isExpired: false, label: `${minutes}m left`, days: 0, hours: 0 }
}

export function getExpiryStatus(expiresAt, status = 'published') {
  if (status === 'draft') {
    return {
      status: 'draft',
      label: 'Draft',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      isExpired: false,
    }
  }

  const expired = isInvitationExpired(expiresAt)
  if (expired || status === 'expired') {
    return {
      status: 'expired',
      label: 'Expired',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      isExpired: true,
    }
  }

  const remaining = getTimeRemaining(expiresAt)
  if (remaining.days !== undefined && remaining.days <= 3) {
    return {
      status: 'expiring-soon',
      label: `Expiring Soon (${remaining.label})`,
      badgeClass: 'bg-orange-100 text-orange-800 border-orange-300',
      isExpired: false,
    }
  }

  return {
    status: 'active',
    label: 'Active',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    isExpired: false,
  }
}

export function getDefaultExpiryDate(daysAhead = 90) {
  const d = new Date()
  d.setDate(d.getDate() + daysAhead)
  d.setHours(23, 59, 0, 0)
  return d.toISOString().slice(0, 16)
}
