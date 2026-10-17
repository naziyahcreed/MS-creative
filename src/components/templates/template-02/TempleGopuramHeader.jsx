export default function TempleGopuramHeader({ className = '' }) {
  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`} aria-hidden>
      {/* Auspicious Mango Leaf Toranam (மாவிலை தோரணம்) & Marigold Garlands */}
      <div className="w-full flex items-center justify-between px-2 overflow-hidden -mb-1">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Mango leaf */}
            <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
              <path
                d="M11 0 C4 8 2 16 11 28 C20 16 18 8 11 0 Z"
                fill={i % 2 === 0 ? '#206b32' : '#2d8a43'}
                stroke="#154922"
                strokeWidth="0.5"
              />
              <path d="M11 2 V26" stroke="#48ad5e" strokeWidth="0.5" opacity="0.6" />
            </svg>
            {/* Marigold / Jasmine flower bead */}
            <div className={`-mt-1 h-2.5 w-2.5 rounded-full ${i % 3 === 0 ? 'bg-[#ffb703]' : i % 3 === 1 ? 'bg-[#fb8500]' : 'bg-[#fffdf9]'} border border-[#b38222]/40 shadow-sm`} />
          </div>
        ))}
      </div>

      {/* South Indian Temple Gopuram / Mandapam Arch SVG */}
      <svg
        viewBox="0 0 420 120"
        className="w-full max-w-[420px] text-temple-red"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Golden 7 Kalasams at Top of Gopuram */}
        <g fill="url(#gopuramGold)">
          {/* Main central kalasam */}
          <path d="M210 2 C207 8 205 12 210 16 C215 12 213 8 210 2 Z" />
          <circle cx="210" cy="1" r="1.5" />
          <rect x="207" y="16" width="6" height="3" rx="1" />

          {/* Side kalasams 1 & 2 */}
          <path d="M192 6 C190 10 188 13 192 16 C196 13 194 10 192 6 Z" />
          <circle cx="192" cy="5" r="1.2" />
          <rect x="190" y="16" width="4" height="2" rx="0.5" />

          <path d="M228 6 C226 10 224 13 228 16 C232 13 230 10 228 6 Z" />
          <circle cx="228" cy="5" r="1.2" />
          <rect x="226" y="16" width="4" height="2" rx="0.5" />

          {/* Side kalasams 3 & 4 */}
          <path d="M174 10 C172 13 171 15 174 18 C177 15 176 13 174 10 Z" />
          <circle cx="174" cy="9" r="1" />

          <path d="M246 10 C244 13 243 15 246 18 C249 15 248 13 246 10 Z" />
          <circle cx="246" cy="9" r="1" />
        </g>

        {/* Gopuram Top Tier Horizontal Beam */}
        <rect x="160" y="18" width="100" height="4" rx="2" fill="url(#gopuramGold)" />
        <path d="M170 22 L150 36 H270 L250 22 Z" fill="#8b1e2e" stroke="#dfb557" strokeWidth="1" />

        {/* Gopuram Middle Tier */}
        <rect x="140" y="36" width="140" height="5" rx="1.5" fill="url(#gopuramGold)" />
        <path d="M148 41 L120 60 H300 L272 41 Z" fill="#740a18" stroke="#dfb557" strokeWidth="1.2" />

        {/* Ornate Dravidian Arch (மகா தோரண வாயில்) */}
        <path
          d="M60 115 V82 Q210 28 360 82 V115"
          stroke="url(#gopuramGold)"
          strokeWidth="3.5"
          fill="none"
        />
        <path
          d="M72 115 V86 Q210 38 348 86 V115"
          stroke="#740a18"
          strokeWidth="2"
          fill="none"
        />

        {/* Carved Temple Pillar Capitals (போதிகை) */}
        <path d="M50 82 H82 L76 92 H56 Z" fill="url(#gopuramGold)" />
        <path d="M338 82 H370 L364 92 H344 Z" fill="url(#gopuramGold)" />

        {/* Hanging Brass Temple Bells */}
        <g className="bell-swing" style={{ transformOrigin: '90px 84px' }}>
          <line x1="90" y1="84" x2="90" y2="98" stroke="#b38222" strokeWidth="1.2" />
          <path d="M84 98 C84 94 96 94 96 98 L98 106 H82 Z" fill="url(#gopuramGold)" stroke="#8c6114" strokeWidth="0.8" />
          <circle cx="90" cy="108" r="2" fill="#ffe682" />
        </g>

        <g className="bell-swing" style={{ transformOrigin: '330px 84px', animationDelay: '1.2s' }}>
          <line x1="330" y1="84" x2="330" y2="98" stroke="#b38222" strokeWidth="1.2" />
          <path d="M324 98 C324 94 336 94 336 98 L338 106 H322 Z" fill="url(#gopuramGold)" stroke="#8c6114" strokeWidth="0.8" />
          <circle cx="330" cy="108" r="2" fill="#ffe682" />
        </g>

        {/* Central Divine Symbol (Namam / Shanku Chakra / Vel Motif) */}
        <circle cx="210" cy="50" r="10" fill="#fffdf9" stroke="#dfb557" strokeWidth="1.5" />
        {/* Lord Murugan Vel Motif */}
        <path d="M210 42 L213 48 L210 57 L207 48 Z" fill="#b38222" />
        <line x1="210" y1="50" x2="210" y2="58" stroke="#8c6114" strokeWidth="1.5" />

        <defs>
          <linearGradient id="gopuramGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff3c4" />
            <stop offset="40%" stopColor="#dfb557" />
            <stop offset="80%" stopColor="#b38222" />
            <stop offset="100%" stopColor="#ffe682" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
