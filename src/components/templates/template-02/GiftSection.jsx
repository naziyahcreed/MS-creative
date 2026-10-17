import weddingData from './data/weddingData'
import { IconGift } from './icons/LineIcons'

export default function GiftSection() {
  const { gifts } = weddingData
  if (!gifts?.enabled) return null

  return (
    <section className="px-5 py-12 md:px-12" aria-labelledby="gift-heading">
      <div className="mx-auto max-w-md text-center">
        <IconGift className="mx-auto text-gold-antique" />
        <h2 id="gift-heading" className="mt-4 font-serif-display text-2xl text-maroon-deep">
          {gifts.heading}
        </h2>
        {gifts.subheading ? <p className="mt-2 text-sm text-maroon-muted">{gifts.subheading}</p> : null}
        {gifts.upi ? <p className="mt-6 text-maroon-muted">UPI: {gifts.upi}</p> : null}
        {gifts.bankDetails ? <p className="mt-2 whitespace-pre-line text-sm text-maroon-muted">{gifts.bankDetails}</p> : null}
        {gifts.qrImage ? <img src={gifts.qrImage} alt="Payment QR code" className="mx-auto mt-6 max-w-[200px]" loading="lazy" /> : null}
      </div>
    </section>
  )
}
