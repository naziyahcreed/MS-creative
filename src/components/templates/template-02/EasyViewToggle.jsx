export default function EasyViewToggle({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed left-4 top-4 z-50 rounded-full border border-gold-line/40 bg-ivory/90 px-3 py-1.5 text-[11px] uppercase tracking-wider text-maroon-muted backdrop-blur-sm md:top-20"
      aria-pressed={enabled}
      aria-label="Toggle easy view mode for larger text and simpler layout"
    >
      {enabled ? 'Standard View' : 'Easy View'}
    </button>
  )
}
