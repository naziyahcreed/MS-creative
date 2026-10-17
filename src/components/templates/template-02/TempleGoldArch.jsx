/** Minimal gold line-art — premium kovil arch (no bitmap). */
export default function TempleGoldArch({ className = '' }) {
  return (
    <svg
      viewBox="0 0 320 72"
      className={`mx-auto w-full max-w-[260px] text-gold-line ${className}`}
      fill="none"
      aria-hidden
    >
      <path d="M24 64 V38 Q160 8 296 38 V64" stroke="currentColor" strokeWidth="1" opacity="0.9" />
      <path d="M48 64 V44 Q160 22 272 44 V64" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
      <path d="M160 18 V28 M148 24 H172" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="160" cy="16" r="2.5" fill="currentColor" opacity="0.85" />
    </svg>
  )
}
