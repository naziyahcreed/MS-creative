import weddingData from './data/weddingData'

export default function WeddingDayBanner({ state }) {
  if (state !== 'today') return null
  const { events } = weddingData
  const w = events.wedding

  return (
    <aside className="border-b border-gold-line/30 bg-maroon-deep px-5 py-4 text-center text-ivory md:px-12">
      <p className="font-tamil text-lg">இன்று நம் திருமண நாள்</p>
      <p className="mt-1 font-serif-display text-xl">
        {w.timeDisplay} · {w.venue}
      </p>
      <a href={w.mapsUrl} className="mt-2 inline-block text-sm underline underline-offset-4">
        Navigate to venue
      </a>
    </aside>
  )
}
