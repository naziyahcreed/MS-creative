import { DiamondRule } from './Ornaments'

export default function SectionTitle({ kicker, title, sub }) {
  return (
    <div className="relative z-10 mb-6 text-center">
      {kicker ? (
        <p className="font-script text-2xl text-[#b8923a]">{kicker}</p>
      ) : null}
      <h2 className="px-1 font-cinzel text-[clamp(1.05rem,4.8vw,1.35rem)] font-semibold leading-snug tracking-[0.08em] break-words text-[#5c3d2e] uppercase">
        {title}
      </h2>
      <DiamondRule />
      {sub ? <p className="px-2 font-serif text-[clamp(0.95rem,4vw,1.125rem)] italic leading-snug text-[#7a5c45]">{sub}</p> : null}
    </div>
  )
}
