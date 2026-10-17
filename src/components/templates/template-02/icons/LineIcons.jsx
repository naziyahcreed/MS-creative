const stroke = 'currentColor'

export function IconRings({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="14" r="4" stroke={stroke} strokeWidth="1.2" />
      <circle cx="15" cy="14" r="4" stroke={stroke} strokeWidth="1.2" />
      <path d="M9 10V8a3 3 0 016 0v2" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconThaali({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4v3M8 7h8" stroke={stroke} strokeWidth="1.2" />
      <ellipse cx="12" cy="11" rx="5" ry="2.5" stroke={stroke} strokeWidth="1.2" />
      <path d="M12 13.5v6" stroke={stroke} strokeWidth="1.2" />
      <circle cx="12" cy="21" r="1.2" fill={stroke} />
    </svg>
  )
}

export function IconTemple({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 20h16M6 20V10l6-6 6 6v10" stroke={stroke} strokeWidth="1.2" />
      <path d="M9 20v-5h6v5M12 4v2" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconLotus({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 14c-3-2-5-5-5-8 0 2 1 4 3 5 1-3 2-5 2-7 0 3-2 6-5 8 3 2 5 5 5 8 0-2-1-4-3-5 1 3 2 5 2 7 0-3 2-6 5-8z" stroke={stroke} strokeWidth="1.1" />
      <circle cx="12" cy="14" r="1" fill={stroke} />
    </svg>
  )
}

export function IconLamp({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 20h8M10 20v-2h4v2M12 6c-2 0-3 1.5-3 3.5 0 2 1 3.5 3 3.5s3-1.5 3-3.5S14 6 12 6z" stroke={stroke} strokeWidth="1.2" />
      <path d="M12 3v1M9 4l1 1M15 4l-1 1" stroke={stroke} strokeWidth="1" />
    </svg>
  )
}

export function IconCalendar({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="1" stroke={stroke} strokeWidth="1.2" />
      <path d="M4 9h16M8 3v4M16 3v4" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconClock({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke={stroke} strokeWidth="1.2" />
      <path d="M12 8v4l3 2" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconLocation({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s6-5.5 6-10a6 6 0 10-12 0c0 4.5 6 10 6 10z" stroke={stroke} strokeWidth="1.2" />
      <circle cx="12" cy="11" r="2" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconPhone({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 5h2l1 4-2 1a11 11 0 005 5l1-2 4 1v2a2 2 0 01-2 2C9 18 6 15 6 10a2 2 0 012-2z" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconGift({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="10" width="16" height="10" stroke={stroke} strokeWidth="1.2" />
      <path d="M12 10v10M4 14h16M8 10c-2 0-3-1-3-2.5S6 5 8 5c2 0 3 2 4 4-2-1-4-1-4 1zM16 10c2 0 3-1 3-2.5S18 5 16 5c-2 0-3 2-4 4 2-1 4-1 4 1z" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconNavHome({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10l8-6 8 6v10H4V10z" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconNavEvents({ className = 'w-5 h-5' }) {
  return <IconCalendar className={className} />
}

export function IconNavGallery({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="1" stroke={stroke} strokeWidth="1.2" />
      <circle cx="8" cy="10" r="2" stroke={stroke} strokeWidth="1.2" />
      <path d="M3 15l5-4 4 3 4-5 5 6" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconNavVenue({ className = 'w-5 h-5' }) {
  return <IconLocation className={className} />
}

export function IconNavRsvp({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6h16M4 12h10M4 18h14" stroke={stroke} strokeWidth="1.2" />
      <path d="M18 16l2 2 4-4" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconMusic({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 18V6l10-2v12" stroke={stroke} strokeWidth="1.2" />
      <circle cx="7" cy="18" r="3" stroke={stroke} strokeWidth="1.2" />
      <circle cx="17" cy="16" r="3" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconShare({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="2" stroke={stroke} strokeWidth="1.2" />
      <circle cx="6" cy="12" r="2" stroke={stroke} strokeWidth="1.2" />
      <circle cx="18" cy="19" r="2" stroke={stroke} strokeWidth="1.2" />
      <path d="M8 11l8-5M8 13l8 5" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}
