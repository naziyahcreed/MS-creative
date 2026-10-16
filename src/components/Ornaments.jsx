export function GoldCorners() {
  return (
    <>
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />
    </>
  )
}

export function Lotus({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <path d="M32 54c8-10 18-16 18-28 0-8-6-14-12-10-2 1.4-4 5-6 10-2-5-4-8.6-6-10-6-4-12 2-12 10 0 12 10 18 18 28z" fill="#c4a35a" opacity=".9" />
      <path d="M32 54c-4-16-2-28 0-38 2 10 4 22 0 38z" fill="#f4e2b3" />
      <path d="M14 32c8 2 14 8 18 22C26 42 18 36 14 32zm36 0c-8 2-14 8-18 22 6-12 14-18 18-22z" fill="#b8923a" opacity=".85" />
    </svg>
  )
}

export function Kolam({ className = 'w-40 h-40' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <circle cx="100" cy="100" r="88" stroke="#c4a35a" strokeWidth="1.2" opacity=".5" />
      <circle cx="100" cy="100" r="62" stroke="#c4a35a" strokeWidth="1" opacity=".45" />
      <path
        className="kolam-path"
        d="M100 20c30 20 50 50 50 80s-20 60-50 80c-30-20-50-50-50-80s20-60 50-80zm0 0c-30 20-50 50-50 80s20 60 50 80c30-20 50-50 50-80s-20-60-50-80zM20 100h160M100 20v160"
        stroke="#d4af6a"
        strokeWidth="1.4"
      />
      <circle cx="100" cy="100" r="8" fill="#c4a35a" />
    </svg>
  )
}

export function HangingLamp({ delay = 0, className = '' }) {
  return (
    <div className={`lamp-swing ${className}`} style={{ animationDelay: `${delay}s` }}>
      <svg viewBox="0 0 48 120" className="h-[120px] w-12 drop-shadow-[0_10px_18px_rgba(255,183,3,.35)]">
        <line x1="24" y1="0" x2="24" y2="22" stroke="#f4e2b3" strokeWidth="1.6" />
        <ellipse cx="24" cy="26" rx="16" ry="5" fill="#e8d5a3" />
        <path d="M10 28h28l-4 22H14z" fill="#8b6914" stroke="#f4e2b3" strokeWidth=".7" />
        <path d="M14 50h20l-2 8H16z" fill="#c4a35a" />
        <ellipse cx="24" cy="62" rx="5" ry="3" fill="#ffb703" className="flame" />
        <path d="M20 62c1 10 8 22 4 32 10-6 12-20 9-32z" className="flame" fill="#ff9a1f" />
        <path d="M23 64c0 8 3 16 1 22" className="flame" fill="#fff3c4" />
      </svg>
    </div>
  )
}

export function TemplePillar({ side = 'left' }) {
  const flip = side === 'right' ? 'scale-x-[-1]' : ''
  return (
    <div className={`pointer-events-none absolute top-0 bottom-0 w-[18%] max-w-[220px] ${side === 'left' ? 'left-0' : 'right-0'} ${flip}`}>
      <div className="h-full bg-gradient-to-b from-[#8b6914] via-[#c4a35a] to-[#6d5212] opacity-90 [mask-image:linear-gradient(to_right,black_70%,transparent)]">
        <div className="absolute inset-y-0 left-2 w-2 bg-[#f4e2b3]/40" />
        <div className="absolute inset-y-8 left-0 right-6 rounded-[40px] border border-[#f4e2b3]/35" />
        <div className="absolute top-0 left-0 right-4 h-16 bg-gradient-to-b from-[#d4b36a] to-transparent" />
        <div className="absolute bottom-0 left-0 right-4 h-20 bg-gradient-to-t from-[#5c3d2e] to-transparent" />
      </div>
    </div>
  )
}

export function DiamondRule() {
  return (
    <div className="my-3 flex items-center justify-center gap-3 text-[#c4a35a]">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c4a35a]" />
      <span className="rotate-45 block h-2 w-2 border border-[#c4a35a]" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c4a35a]" />
    </div>
  )
}

export function MangoLeaves({ className = '' }) {
  return <div className={`toran w-full ${className}`} />
}
