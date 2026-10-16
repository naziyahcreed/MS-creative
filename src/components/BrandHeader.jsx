export default function BrandHeader({ compact = false, className = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-[#f3c8eb]/40 bg-gradient-to-r from-[#4a1542] via-[#3b0f38] to-[#2b0a29] shadow-[0_4px_16px_rgba(66,18,61,0.65)] backdrop-blur-md select-none transition-all hover:scale-[1.02] hover:border-[#ffd56b]/60 ${
        compact ? 'pl-1 pr-3 py-1' : 'pl-1.5 pr-3.5 py-1.5'
      } ${className}`}
    >
      <div className="relative shrink-0 rounded-full p-[1.5px] bg-gradient-to-tr from-[#ffd56b] via-[#e9bfe2] to-[#ffd56b]/80 shadow-[0_0_10px_rgba(233,191,226,0.5)]">
        <img
          src="/images/ms-creative-logo.png"
          alt="MS Creative Invites Logo"
          className={`rounded-full object-cover bg-[#42123d] block ${
            compact ? 'h-8 w-8' : 'h-9 w-9'
          }`}
        />
      </div>
      <div className="flex flex-col text-left leading-none pr-0.5">
        <span className="font-cinzel text-[11px] font-bold tracking-[0.14em] text-white drop-shadow-sm whitespace-nowrap">
          MS CREATIVE INVITES
        </span>
        <span className="mt-1 text-[7.5px] font-semibold tracking-[0.22em] text-[#e9bfe2] uppercase whitespace-nowrap">
          CUSTOM AND ANIMATED
        </span>
      </div>
    </div>
  )
}
