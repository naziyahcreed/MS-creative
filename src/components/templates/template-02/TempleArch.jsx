export default function TempleArch({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 120"
      className={`w-full max-w-md text-gold-line/80 ${className}`}
      aria-hidden
      fill="none"
    >
      <path
        d="M20 110 V55 Q200 5 380 55 V110"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M55 110 V70 Q200 35 345 70 V110"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <circle cx="200" cy="48" r="4" stroke="currentColor" strokeWidth="0.8" />
      <path d="M200 52 V62 M188 58 H212" stroke="currentColor" strokeWidth="0.7" />
      {[80, 120, 160, 240, 280, 320].map((x) => (
        <rect key={x} x={x} y="108" width="8" height="6" fill="currentColor" opacity="0.35" />
      ))}
    </svg>
  )
}
