export default function LuxuryShell({ children }) {
  return (
    <div className="min-h-dvh temple-void-bg py-0 md:py-6 px-0 md:px-4">
      <div className="temple-mandapam-frame mx-auto min-h-dvh w-full max-w-[620px] shadow-[0_20px_60px_rgba(0,0,0,0.85)] border-x border-[#dfb557]/40 md:border-2 md:border-[#dfb557]">
        {children}
      </div>
    </div>
  )
}
