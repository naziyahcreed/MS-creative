function pad(n) {
  return String(n).padStart(2, '0')
}

function toICSDate(dateStr, timeStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const [hh, mm] = (timeStr || '00:00').split(':').map(Number)
  return `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`
}

function locationOf(event) {
  return `${event.venueEnglish || event.venue}, ${event.addressEnglish || event.address}`
}

export function buildGoogleCalendarUrl(event, coupleNames) {
  const title = encodeURIComponent(`${event.title} — ${coupleNames}`)
  const start = toICSDate(event.date, event.time)
  const end = toICSDate(event.date, event.endTime || event.time)
  const details = encodeURIComponent(event.calendarDescription || '')
  const location = encodeURIComponent(locationOf(event))
  const ctz = encodeURIComponent('Asia/Kolkata')
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&ctz=${ctz}`
}

export function downloadICS(event, coupleNames) {
  const uid = `${event.id}-${event.date}@nivi-weds`
  const start = toICSDate(event.date, event.time)
  const end = toICSDate(event.date, event.endTime || event.time)
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nivi Weds//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${start}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title} — ${coupleNames}`,
    `DESCRIPTION:${(event.calendarDescription || '').replace(/\n/g, '\\n')}`,
    `LOCATION:${locationOf(event)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.id}-nivi-natraj.ics`
  a.click()
  URL.revokeObjectURL(url)
}
