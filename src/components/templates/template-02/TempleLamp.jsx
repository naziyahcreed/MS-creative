export default function TempleLamp({ className = '', size = 'md' }) {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.3 : 1

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`} aria-hidden>
      <svg
        width={56 * scale}
        height={110 * scale}
        viewBox="0 0 56 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_4px_12px_rgba(223,181,87,0.4)]"
      >
        {/* Glow behind the flame */}
        <circle cx="28" cy="18" r="14" fill="url(#lampAura)" opacity="0.6" className="flame-animated" />

        {/* 5 Deepam Flames (Pancha Mukha Deepam) */}
        {/* Central main flame */}
        <path
          d="M28 6 C24 14 23 18 28 22 C33 18 32 14 28 6 Z"
          fill="url(#goldFlame)"
          className="flame-animated"
        />
        {/* Left flame */}
        <path
          d="M16 14 C13 18 13 21 17 23 C20 21 19 18 16 14 Z"
          fill="url(#goldFlame)"
          className="flame-animated"
          style={{ animationDelay: '0.4s' }}
        />
        {/* Right flame */}
        <path
          d="M40 14 C37 18 37 21 41 23 C44 21 43 18 40 14 Z"
          fill="url(#goldFlame)"
          className="flame-animated"
          style={{ animationDelay: '0.8s' }}
        />

        {/* Brass Kuthuvilakku Top finial (Annapakshi/Kalasam) */}
        <path
          d="M26 18 C26 15 30 15 30 18 L29 23 L27 23 Z"
          fill="#ffd166"
          stroke="#b38222"
          strokeWidth="0.8"
        />

        {/* Oil Bowl (Thagadu) */}
        <ellipse cx="28" cy="24" rx="22" ry="6" fill="url(#brassGradient)" stroke="#8c6114" strokeWidth="1" />
        <ellipse cx="28" cy="23" rx="18" ry="3.5" fill="#f09a1a" opacity="0.8" />

        {/* Lamp Neck Ring */}
        <path d="M22 27 H34 V32 H22 Z" fill="url(#brassGradient)" stroke="#8c6114" strokeWidth="0.8" />
        <ellipse cx="28" cy="32" rx="7" ry="2.5" fill="#ffd166" />

        {/* Pillar Upper Bulb */}
        <circle cx="28" cy="42" r="6" fill="url(#brassGradient)" stroke="#8c6114" strokeWidth="0.8" />
        <ellipse cx="28" cy="48" rx="8" ry="2.5" fill="#ffd166" stroke="#8c6114" strokeWidth="0.8" />

        {/* Main Pillar Stem */}
        <path d="M25 50 L24 72 H32 L31 50 Z" fill="url(#brassGradient)" stroke="#8c6114" strokeWidth="0.8" />
        
        {/* Pillar Lower Bulb */}
        <circle cx="28" cy="74" r="7" fill="url(#brassGradient)" stroke="#8c6114" strokeWidth="0.8" />

        {/* Lamp Base Tier 1 */}
        <ellipse cx="28" cy="84" rx="14" ry="4" fill="url(#brassGradient)" stroke="#8c6114" strokeWidth="0.8" />
        <path d="M14 84 L12 94 H44 L42 84 Z" fill="url(#brassGradient)" stroke="#8c6114" strokeWidth="0.8" />

        {/* Bottom Pedestal (Peedam) */}
        <ellipse cx="28" cy="95" rx="20" ry="5.5" fill="url(#brassGradient)" stroke="#8c6114" strokeWidth="1" />
        <path d="M9 96 L7 104 H49 L47 96 Z" fill="url(#brassGradientDark)" stroke="#664408" strokeWidth="1" />
        <ellipse cx="28" cy="104" rx="24" ry="5" fill="#754c09" />

        {/* Gradients */}
        <defs>
          <radialGradient id="lampAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb703" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#fb8500" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#dfb557" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="goldFlame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#ffe682" />
            <stop offset="70%" stopColor="#ff9f1c" />
            <stop offset="100%" stopColor="#e71d36" />
          </linearGradient>
          <linearGradient id="brassGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a3761e" />
            <stop offset="30%" stopColor="#ffe27c" />
            <stop offset="65%" stopColor="#d8ab38" />
            <stop offset="100%" stopColor="#7a5511" />
          </linearGradient>
          <linearGradient id="brassGradientDark" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#63440e" />
            <stop offset="50%" stopColor="#b38222" />
            <stop offset="100%" stopColor="#4a3206" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
