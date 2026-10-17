export default function KolamDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center py-6 px-4 select-none ${className}`} aria-hidden>
      <div className="flex items-center gap-3 w-full max-w-xs">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#dfb557] to-[#dfb557]" />
        
        {/* Traditional South Indian Kolam SVG */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="text-[#dfb557]">
          {/* Central Bindu Dot (Kumkum) */}
          <circle cx="22" cy="22" r="2.5" fill="#740a18" />
          
          {/* 4 Cardinal Petals */}
          <path
            d="M22 6 C18 14 18 18 22 22 C26 18 26 14 22 6 Z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M22 38 C18 30 18 26 22 22 C26 26 26 30 22 38 Z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M6 22 C14 18 18 18 22 22 C18 26 14 26 6 22 Z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M38 22 C30 18 26 18 22 22 C26 26 30 26 38 22 Z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />

          {/* 4 Diagonal Loop Swirls */}
          <circle cx="14" cy="14" r="1.5" fill="#740a18" />
          <circle cx="30" cy="14" r="1.5" fill="#740a18" />
          <circle cx="14" cy="30" r="1.5" fill="#740a18" />
          <circle cx="30" cy="30" r="1.5" fill="#740a18" />

          {/* Outer Auspicious Ring */}
          <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
        </svg>

        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#dfb557] to-[#dfb557]" />
      </div>
    </div>
  )
}
