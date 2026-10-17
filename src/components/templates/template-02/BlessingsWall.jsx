import { useState } from 'react'
import weddingData from './data/weddingData'

export default function BlessingsWall() {
  const { blessingsWall } = weddingData
  const [messages, setMessages] = useState(blessingsWall.mockMessages)
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  if (!blessingsWall.enabled) return null

  const addBlessing = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setMessages((m) => [{ name: name.trim() || 'Guest', text: text.trim() }, ...m])
    setName('')
    setText('')
  }

  return (
    <section className="px-5 py-16 md:px-12" aria-labelledby="blessings-heading">
      <div className="mx-auto max-w-3xl">
        <h2 id="blessings-heading" className="font-serif-display text-3xl text-maroon-deep">
          {blessingsWall.title}
        </h2>
        <form onSubmit={addBlessing} className="mt-8 space-y-4 gold-border-thin bg-ivory/60 p-6">
          <input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b border-gold-line/30 bg-transparent py-2 focus:border-gold-line focus:outline-none"
          />
          <textarea
            placeholder="Your blessing…"
            required
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border-b border-gold-line/30 bg-transparent py-2 focus:border-gold-line focus:outline-none"
          />
          <button type="submit" className="text-sm uppercase tracking-wider text-gold-antique" data-cursor="button">
            Share blessing
          </button>
        </form>
        <ul className="mt-10 space-y-6">
          {messages.map((m, i) => (
            <li key={`${m.name}-${i}`} className="border-l-2 border-gold-line/40 pl-4">
              <p className="font-serif-display text-lg italic text-maroon-deep">&ldquo;{m.text}&rdquo;</p>
              <p className="mt-2 text-sm text-maroon-muted">— {m.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
