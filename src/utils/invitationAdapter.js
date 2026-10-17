/**
 * invitationAdapter.js
 * Merges saved client invitation data with template base configurations.
 */

function formatDateTamil(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    const months = [
      'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்',
      'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'
    ]
    const days = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி']
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
  } catch {
    return dateStr
  }
}

function formatDateEnglish(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return dateStr
  }
}

function formatTimeDisplay(timeStr) {
  if (!timeStr) return { en: '10:00 AM', ta: 'காலை 10:00' }
  const [hStr, mStr] = timeStr.split(':')
  let h = parseInt(hStr, 10) || 10
  const m = mStr || '00'
  const isPM = h >= 12
  const periodEn = isPM ? 'PM' : 'AM'
  const periodTa = isPM ? (h >= 17 ? 'மாலை' : 'பிற்பகல்') : 'காலை'
  if (h > 12) h -= 12
  if (h === 0) h = 12
  const formattedH = String(h).padStart(2, '0')
  return {
    en: `${formattedH}:${m} ${periodEn}`,
    ta: `${periodTa} ${formattedH}:${m}`
  }
}

export function buildMapsEmbedUrl(mapsUrl, venueName, venueAddress) {
  if (mapsUrl && mapsUrl.includes('output=embed')) {
    return mapsUrl
  }
  if (mapsUrl) {
    try {
      const url = new URL(mapsUrl)
      const q = url.searchParams.get('q') || url.searchParams.get('query')
      if (q) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
      }
    } catch {
      const match = mapsUrl.match(/[?&](?:q|query)=([^&]+)/)
      if (match && match[1]) {
        return `https://maps.google.com/maps?q=${match[1]}&t=&z=15&ie=UTF8&iwloc=&output=embed`
      }
    }
  }
  const query = [venueName, venueAddress].filter(Boolean).join(' ')
  if (query) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
  }
  return 'https://maps.google.com/maps?q=Madurai&t=&z=15&ie=UTF8&iwloc=&output=embed'
}

export function buildMapsDirectUrl(mapsUrl, venueName, venueAddress) {
  if (mapsUrl) return mapsUrl
  const query = [venueName, venueAddress].filter(Boolean).join(' ')
  return `https://maps.google.com/?q=${encodeURIComponent(query || 'Wedding Venue')}`
}

export function adaptInvitationForTemplate01(clientData, baseData) {
  if (!clientData) return baseData

  const merged = JSON.parse(JSON.stringify(baseData))

  // Couple names & branding
  if (clientData.brideName) merged.couple.brideName = clientData.brideName
  if (clientData.groomName) merged.couple.groomName = clientData.groomName
  if (clientData.brideNameTamil) merged.couple.brideNameTamil = clientData.brideNameTamil
  if (clientData.groomNameTamil) merged.couple.groomNameTamil = clientData.groomNameTamil
  if (clientData.hashtag) merged.couple.hashtag = clientData.hashtag

  const bInit = clientData.brideName ? clientData.brideName.charAt(0) : 'N'
  const gInit = clientData.groomName ? clientData.groomName.charAt(0) : 'N'
  merged.couple.initials = `${bInit} & ${gInit}`

  // Photos
  if (clientData.photos) {
    if (clientData.photos.couple) {
      if (merged.hero) merged.hero.portrait = clientData.photos.couple
      if (merged.gallery?.items?.[0]) merged.gallery.items[0].src = clientData.photos.couple
      if (merged.gallery?.mainImage) merged.gallery.mainImage = clientData.photos.couple
    }
    if (clientData.photos.bride && merged.gallery?.items?.[1]) {
      merged.gallery.items[1].src = clientData.photos.bride
    }
    if (clientData.photos.groom && merged.gallery?.items?.[2]) {
      merged.gallery.items[2].src = clientData.photos.groom
    }
  }

  // Events
  if (Array.isArray(clientData.events) && clientData.events.length > 0) {
    const updatedVenues = []

    clientData.events.forEach((ev) => {
      const key = ev.id || ev.title?.toLowerCase()
      const targetEvent = merged.events[key] || {}
      const timeFmt = formatTimeDisplay(ev.time)

      const updated = {
        ...targetEvent,
        id: ev.id || key,
        title: ev.title || targetEvent.title,
        titleTamil: ev.titleTamil || targetEvent.titleTamil || ev.title,
        date: ev.date || targetEvent.date,
        displayDateEnglish: formatDateEnglish(ev.date) || targetEvent.displayDateEnglish,
        displayDateTamil: formatDateTamil(ev.date) || targetEvent.displayDateTamil,
        time: ev.time || targetEvent.time,
        timeDisplayEnglish: timeFmt.en,
        timeDisplayTamil: timeFmt.ta,
        venueEnglish: ev.venueName || targetEvent.venueEnglish,
        venueTamil: ev.venueNameTamil || ev.venueName || targetEvent.venueTamil,
        addressEnglish: ev.venueAddress || targetEvent.addressEnglish,
        addressTamil: ev.venueAddressTamil || ev.venueAddress || targetEvent.addressTamil,
        mapsUrl: ev.mapsUrl || targetEvent.mapsUrl,
        image: ev.image || targetEvent.image,
      }

      if (merged.events[key]) {
        merged.events[key] = updated
      }

      const venueNameEn = ev.venueName || targetEvent.venueEnglish || updated.venueEnglish || 'Wedding Venue'
      const venueNameTa = ev.venueNameTamil || ev.venueName || targetEvent.venueTamil || updated.venueTamil || 'மண்டபம்'
      const venueAddrEn = ev.venueAddress || targetEvent.addressEnglish || updated.addressEnglish || ''
      const venueAddrTa = ev.venueAddressTamil || ev.venueAddress || targetEvent.addressTamil || updated.addressTamil || ''
      const mapsEmbed = buildMapsEmbedUrl(ev.mapsUrl || targetEvent.mapsUrl, venueNameEn, venueAddrEn)
      const mapsDirect = buildMapsDirectUrl(ev.mapsUrl || targetEvent.mapsUrl, venueNameEn, venueAddrEn)

      updatedVenues.push({
        id: ev.id || key,
        nameTamil: venueNameTa,
        nameEnglish: venueNameEn,
        placeTamil: venueAddrTa,
        placeEnglish: venueAddrEn,
        shortTypeTamil: `${updated.titleTamil} அரங்கம்`,
        shortTypeEnglish: `${updated.title} Hall`,
        hallTypeTamil: `💐 ${updated.titleTamil} அரங்கம்`,
        hallTypeEnglish: `💐 ${updated.title} Hall`,
        eventsTamil: `${updated.titleTamil} நடைபெறும் இடம்`,
        eventsEnglish: `Venue for ${updated.title}`,
        eventSchedule: [
          {
            nameTa: updated.titleTamil,
            nameEn: updated.title,
            timeTa: `${updated.displayDateTamil} • ${updated.timeDisplayTamil}`,
            timeEn: `${updated.displayDateEnglish} • ${updated.timeDisplayEnglish}`,
          },
        ],
        landmarkTamil: ev.landmarkTamil || targetEvent.landmarkTamil || 'மண்டப வளாகம்',
        landmarkEnglish: ev.landmarkEnglish || targetEvent.landmarkEnglish || 'Main Campus',
        parkingTamil: ev.parkingTamil || targetEvent.parkingTamil || 'மண்டப வளாகத்தில் பார்க்கிங் வசதி உண்டு',
        parkingEnglish: ev.parkingEnglish || targetEvent.parkingEnglish || 'Parking available on site',
        mapsUrl: mapsDirect,
        mapsEmbed: mapsEmbed,
        image: ev.image || updated.image || (merged.venues?.[0]?.image || '/images/venue-temple.jpg'),
      })
    })

    if (updatedVenues.length > 0) {
      merged.venues = updatedVenues
    }
  }

  // Messages
  if (clientData.messages) {
    if (clientData.messages.customTamil && merged.opening) {
      merged.opening.blessingTamil = clientData.messages.customTamil
    }
    if (clientData.messages.customEnglish && merged.opening) {
      merged.opening.blessingEnglish = clientData.messages.customEnglish
    }
  }

  // RSVP phone
  if (clientData.rsvpPhone && merged.share) {
    merged.share.contactPhone = clientData.rsvpPhone
  }

  return merged
}

export function adaptInvitationForTemplate02(clientData, baseData) {
  if (!clientData) return baseData

  const merged = JSON.parse(JSON.stringify(baseData))

  // Couple names & branding
  if (clientData.brideName) merged.couple.brideName = clientData.brideName
  if (clientData.groomName) merged.couple.groomName = clientData.groomName
  if (clientData.brideNameTamil) merged.couple.brideNameTamil = clientData.brideNameTamil
  if (clientData.groomNameTamil) merged.couple.groomNameTamil = clientData.groomNameTamil
  if (clientData.hashtag) merged.couple.hashtag = clientData.hashtag

  const bInit = clientData.brideName ? clientData.brideName.charAt(0) : 'N'
  const gInit = clientData.groomName ? clientData.groomName.charAt(0) : 'N'
  merged.couple.initials = `${bInit} & ${gInit}`

  // Photos
  if (clientData.photos) {
    if (clientData.photos.couple) {
      merged.couple.heroPortrait = clientData.photos.couple
      if (merged.gallery?.photos?.[0]) merged.gallery.photos[0].src = clientData.photos.couple
    }
    if (clientData.photos.bride && merged.gallery?.photos?.[1]) {
      merged.gallery.photos[1].src = clientData.photos.bride
    }
    if (clientData.photos.groom && merged.gallery?.photos?.[2]) {
      merged.gallery.photos[2].src = clientData.photos.groom
    }
  }

  // Events
  if (Array.isArray(clientData.events) && clientData.events.length > 0) {
    const updatedVenues = []

    clientData.events.forEach((ev) => {
      const key = ev.id || ev.title?.toLowerCase()
      const targetEvent = merged.events[key] || {}
      const timeFmt = formatTimeDisplay(ev.time)

      const updated = {
        ...targetEvent,
        id: ev.id || key,
        titleTamil: ev.titleTamil || targetEvent.titleTamil || ev.title,
        titleEnglish: ev.title || targetEvent.titleEnglish,
        date: ev.date || targetEvent.date,
        displayDateEnglish: formatDateEnglish(ev.date) || targetEvent.displayDateEnglish,
        displayDateTamil: formatDateTamil(ev.date) || targetEvent.displayDateTamil,
        time: ev.time || targetEvent.time,
        timeDisplayEnglish: timeFmt.en,
        timeDisplayTamil: timeFmt.ta,
        venueTamil: ev.venueNameTamil || ev.venueName || targetEvent.venueTamil,
        venueEnglish: ev.venueName || targetEvent.venueEnglish,
        addressTamil: ev.venueAddressTamil || ev.venueAddress || targetEvent.addressTamil,
        addressEnglish: ev.venueAddress || targetEvent.addressEnglish,
        mapsUrl: ev.mapsUrl || targetEvent.mapsUrl,
        image: ev.image || targetEvent.image,
      }

      if (merged.events[key]) {
        merged.events[key] = updated
      }

      const venueNameEn = ev.venueName || targetEvent.venueEnglish || updated.venueEnglish || 'Wedding Venue'
      const venueNameTa = ev.venueNameTamil || ev.venueName || targetEvent.venueTamil || updated.venueTamil || 'மண்டபம்'
      const venueAddrEn = ev.venueAddress || targetEvent.addressEnglish || updated.addressEnglish || ''
      const venueAddrTa = ev.venueAddressTamil || ev.venueAddress || targetEvent.addressTamil || updated.addressTamil || ''
      const mapsEmbed = buildMapsEmbedUrl(ev.mapsUrl || targetEvent.mapsUrl, venueNameEn, venueAddrEn)
      const mapsDirect = buildMapsDirectUrl(ev.mapsUrl || targetEvent.mapsUrl, venueNameEn, venueAddrEn)

      updatedVenues.push({
        id: ev.id || key,
        tabLabelTamil: `${updated.titleTamil}`,
        tabLabelEnglish: `${updated.titleEnglish}`,
        eventsSummaryTamil: `${updated.titleTamil} நடைபெறும் இடம்`,
        eventsSummaryEnglish: `Venue for ${updated.titleEnglish}`,
        nameTamil: venueNameTa,
        nameEnglish: venueNameEn,
        addressTamil: venueAddrTa,
        addressEnglish: venueAddrEn,
        landmarkTamil: ev.landmarkTamil || targetEvent.landmarkTamil || 'மண்டப வளாகம்',
        landmarkEnglish: ev.landmarkEnglish || targetEvent.landmarkEnglish || 'Main Campus',
        parkingTamil: ev.parkingTamil || targetEvent.parkingTamil || 'மண்டப பார்க்கிங் வசதி உள்ளது',
        parkingEnglish: ev.parkingEnglish || targetEvent.parkingEnglish || 'Parking available on site',
        mapsUrl: mapsDirect,
        mapsEmbed: mapsEmbed,
        image: ev.image || updated.image || '/couple-art.jpg',
      })
    })

    if (updatedVenues.length > 0) {
      merged.venues = updatedVenues
    }
  }

  // Messages
  if (clientData.messages) {
    if (clientData.messages.customTamil && merged.invitationMessage?.tamil) {
      merged.invitationMessage.tamil.body = clientData.messages.customTamil
    }
    if (clientData.messages.customEnglish && merged.invitationMessage?.english) {
      merged.invitationMessage.english.body = clientData.messages.customEnglish
    }
  }

  // RSVP & Music
  if (clientData.rsvpPhone && merged.contacts) {
    merged.contacts.phone = clientData.rsvpPhone
  }
  if (clientData.musicUrl && merged.music) {
    merged.music.src = clientData.musicUrl
  }

  return merged
}
