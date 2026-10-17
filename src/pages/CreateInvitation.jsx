import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAllTemplates, getTemplateById } from '../utils/templateRegistry'
import { saveInvitationToProject, getInvitationBySlugOrId, checkServerConnection } from '../utils/invitationStorage'
import { getDefaultExpiryDate } from '../utils/expiryUtils'
import ShareLinkModal from '../components/admin/ShareLinkModal'

export default function CreateInvitation() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const defaultTpl = searchParams.get('template') || 'template-01'

  const templates = getAllTemplates()

  // Form State
  const [templateId, setTemplateId] = useState(defaultTpl)
  const [clientId, setClientId] = useState('')
  const [slug, setSlug] = useState('')
  const [brideName, setBrideName] = useState('')
  const [groomName, setGroomName] = useState('')
  const [brideNameTamil, setBrideNameTamil] = useState('')
  const [groomNameTamil, setGroomNameTamil] = useState('')
  const [parentsBride, setParentsBride] = useState('')
  const [parentsGroom, setParentsGroom] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [rsvpPhone, setRsvpPhone] = useState('+91 ')
  const [musicUrl, setMusicUrl] = useState('/music.mp3')
  const [expiresAt, setExpiresAt] = useState(getDefaultExpiryDate(90))
  const [customMessageTamil, setCustomMessageTamil] = useState(
    'எங்கள் இல்லத் திருமண விழாவிற்கு தாங்களும் தங்கள் குடும்பத்தாரும் வருகை தந்து மணமக்களை மனமார வாழ்த்தி அருள அன்புடன் அழைக்கின்றோம்.'
  )
  const [customMessageEnglish, setCustomMessageEnglish] = useState(
    'We cordially invite you and your family to grace the auspicious occasion of our wedding and shower your blessings upon us.'
  )

  // Photos State
  const [existingPhotos, setExistingPhotos] = useState({
    bride: '',
    groom: '',
    couple: '',
  })

  // Newly uploaded files pending save (base64 data)
  const [uploadedFiles, setUploadedFiles] = useState({
    bride: null,
    groom: null,
    couple: null,
  })

  // Events State
  const [events, setEvents] = useState([
    {
      id: 'engagement',
      title: 'Engagement',
      titleTamil: 'நிச்சயதார்த்தம்',
      date: '2026-10-24',
      time: '18:30',
      venueName: 'Vasantham Mahal',
      venueNameTamil: 'வசந்தம் மஹால்',
      venueAddress: 'Thiruparankundram, Madurai',
      venueAddressTamil: 'திருப்பரங்குன்றம், மதுரை',
      mapsUrl: 'https://maps.google.com/?q=Vasantham+Mahal+Madurai',
      image: '',
      newImageData: null,
    },
    {
      id: 'wedding',
      title: 'Muhurtham',
      titleTamil: 'சுபமுகூர்த்தம்',
      date: '2026-10-25',
      time: '09:00',
      venueName: 'Sri Meenakshi Kalyana Mandapam',
      venueNameTamil: 'ஸ்ரீ மீனாட்சி கல்யாண மண்டபம்',
      venueAddress: 'Melur Main Road, Madurai',
      venueAddressTamil: 'மேலூர் மெயின் ரோடு, மதுரை',
      mapsUrl: 'https://maps.google.com/?q=Sri+Meenakshi+Kalyana+Mandapam+Madurai',
      image: '',
      newImageData: null,
    },
    {
      id: 'reception',
      title: 'Reception',
      titleTamil: 'வரவேற்பு',
      date: '2026-10-25',
      time: '18:30',
      venueName: 'The Grand Heritage Lawn',
      venueNameTamil: 'தி கிராண்ட் ஹெரிடேஜ் லான்',
      venueAddress: 'Alagarkovil Road, Madurai',
      venueAddressTamil: 'அழகர்கோவில் ரோடு, மதுரை',
      mapsUrl: 'https://maps.google.com/?q=Grand+Heritage+Madurai',
      image: '',
      newImageData: null,
    },
  ])

  // UI state
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [savedInvitation, setSavedInvitation] = useState(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [serverStatus, setServerStatus] = useState(null)

  // Initialize or load edit data
  useEffect(() => {
    checkServerConnection().then(setServerStatus)

    if (editId) {
      getInvitationBySlugOrId(editId).then((data) => {
        if (data) {
          setClientId(data.id || '')
          setSlug(data.slug || '')
          setTemplateId(data.templateId || 'template-01')
          setBrideName(data.brideName || '')
          setGroomName(data.groomName || '')
          setBrideNameTamil(data.brideNameTamil || '')
          setGroomNameTamil(data.groomNameTamil || '')
          setParentsBride(data.parents?.bride || '')
          setParentsGroom(data.parents?.groom || '')
          setHashtag(data.hashtag || '')
          setRsvpPhone(data.rsvpPhone || '+91 ')
          setMusicUrl(data.musicUrl || '/music.mp3')
          setExpiresAt(data.expiresAt ? data.expiresAt.slice(0, 16) : '')
          if (data.messages) {
            setCustomMessageTamil(data.messages.customTamil || '')
            setCustomMessageEnglish(data.messages.customEnglish || '')
          }
          if (data.photos) {
            setExistingPhotos(data.photos)
          }
          if (Array.isArray(data.events) && data.events.length > 0) {
            setEvents(data.events)
          }
        }
      })
    } else {
      // Auto-generate unique ID & initial slug
      const randomSuffix = Math.random().toString(36).substring(2, 6)
      const newId = `client-${Date.now().toString().slice(-4)}`
      setClientId(newId)
      setSlug(`wedding-${randomSuffix}`)
    }
  }, [editId])

  // Auto-update slug and hashtag when names change (if not in edit mode)
  useEffect(() => {
    if (!editId && brideName && groomName) {
      const b = brideName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-')
      const g = groomName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-')
      const shortCode = clientId ? clientId.replace('client-', 'c') : 'w1'
      setSlug(`${b}-${g}-${shortCode}`)
      setHashtag(`#${brideName.replace(/\s+/g, '')}Weds${groomName.replace(/\s+/g, '')}`)
    }
  }, [brideName, groomName, clientId, editId])

  // Handle Photo File Upload
  const handlePhotoSelect = (field, e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Client-side file type and size check
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Only JPG, PNG, and WebP images are allowed.')
      return
    }
    if (file.size > 15 * 1024 * 1024) {
      alert('Image size exceeds 15MB limit.')
      return
    }

    const reader = new FileReader()
    reader.onload = (uploadEvt) => {
      const dataUri = uploadEvt.target.result
      setUploadedFiles((prev) => ({
        ...prev,
        [field]: {
          data: dataUri,
          filename: `${field}.jpg`,
          previewUrl: dataUri,
        },
      }))
    }
    reader.readAsDataURL(file)
  }

  // Handle Event Image Upload
  const handleEventImageSelect = (index, e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (uploadEvt) => {
      const dataUri = uploadEvt.target.result
      setEvents((prev) => {
        const next = [...prev]
        next[index] = {
          ...next[index],
          newImageData: dataUri,
          previewUrl: dataUri,
        }
        return next
      })
    }
    reader.readAsDataURL(file)
  }

  // Add / Remove Custom Events
  const addCustomEvent = () => {
    const newIdx = events.length + 1
    setEvents((prev) => [
      ...prev,
      {
        id: `event-${newIdx}`,
        title: 'Haldi / Sangeet',
        titleTamil: 'நலங்கு வைபவம்',
        date: '2026-10-24',
        time: '16:00',
        venueName: 'Traditional Courtyard',
        venueNameTamil: 'பாரம்பரிய மண்டபம்',
        venueAddress: 'Madurai',
        venueAddressTamil: 'மதுரை',
        mapsUrl: '',
        image: '',
        newImageData: null,
      },
    ])
  }

  const removeEvent = (index) => {
    if (events.length <= 1) {
      alert('At least one wedding event is required.')
      return
    }
    setEvents((prev) => prev.filter((_, i) => i !== index))
  }

  const updateEventField = (index, field, value) => {
    setEvents((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  // Assemble full invitation JSON record
  const buildInvitationRecord = () => {
    return {
      id: clientId.trim(),
      slug: slug.trim(),
      templateId,
      brideName: brideName.trim(),
      groomName: groomName.trim(),
      brideNameTamil: brideNameTamil.trim() || brideName.trim(),
      groomNameTamil: groomNameTamil.trim() || groomName.trim(),
      parents: {
        bride: parentsBride.trim(),
        groom: parentsGroom.trim(),
      },
      hashtag: hashtag.trim(),
      photos: {
        bride: existingPhotos.bride || `/invitations/${clientId}/bride.jpg`,
        groom: existingPhotos.groom || `/invitations/${clientId}/groom.jpg`,
        couple: existingPhotos.couple || `/invitations/${clientId}/couple.jpg`,
      },
      events: events.map((ev) => ({
        id: ev.id,
        title: ev.title,
        titleTamil: ev.titleTamil || ev.title,
        date: ev.date,
        time: ev.time,
        venueName: ev.venueName,
        venueNameTamil: ev.venueNameTamil || ev.venueName,
        venueAddress: ev.venueAddress,
        venueAddressTamil: ev.venueAddressTamil || ev.venueAddress,
        mapsUrl: ev.mapsUrl,
        image: ev.image || (ev.previewUrl ? `/invitations/${clientId}/event-${ev.id}.jpg` : ''),
        newImageData: ev.newImageData,
      })),
      messages: {
        customTamil: customMessageTamil.trim(),
        customEnglish: customMessageEnglish.trim(),
      },
      rsvpPhone: rsvpPhone.trim(),
      musicUrl: musicUrl.trim() || '/music.mp3',
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      status: 'published',
    }
  }

  // Save to Project Folders via Local Node.js File-Writing Utility
  const handleSave = async (e) => {
    e.preventDefault()
    setError(null)

    if (!brideName || !groomName) {
      setError('Please provide both Bride and Groom names.')
      return
    }
    if (!clientId) {
      setError('A valid Client ID is required (e.g. client-003).')
      return
    }

    try {
      setSaving(true)
      const record = buildInvitationRecord()

      // Files to upload
      const filesToUpload = {}
      if (uploadedFiles.bride?.data) filesToUpload.bride = { data: uploadedFiles.bride.data, filename: 'bride.jpg' }
      if (uploadedFiles.groom?.data) filesToUpload.groom = { data: uploadedFiles.groom.data, filename: 'groom.jpg' }
      if (uploadedFiles.couple?.data) filesToUpload.couple = { data: uploadedFiles.couple.data, filename: 'couple.jpg' }

      const result = await saveInvitationToProject(record, filesToUpload)
      setSavedInvitation(result.invitation)
    } catch (err) {
      setError(err.message || 'Error saving invitation.')
    } finally {
      setSaving(false)
    }
  }

  // Active Template Preview component
  const currentTemplateDef = getTemplateById(templateId)
  const ActiveTemplateComponent = currentTemplateDef?.component

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e6dcce] pb-6">
        <div>
          <span className="gold-badge mb-2">
            {editId ? 'Edit Mode' : 'New Invitation'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#251d18]">
            {editId ? `Editing Invitation: ${clientId}` : 'Create Wedding Invitation'}
          </h2>
          <p className="text-xs sm:text-sm text-[#75675e] mt-1">
            Data and photos will be written directly into <code className="bg-[#f4ece0] px-1 py-0.5 rounded text-[11px]">public/invitations/{clientId || 'client-XXX'}/</code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="btn-gold-secondary text-xs py-2 px-4"
          >
            👁 Live Preview
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
          <span className="text-rose-500 font-bold text-base">⚠</span>
          <div className="space-y-1">
            <div className="font-bold">Error Saving Files:</div>
            <pre className="whitespace-pre-wrap font-sans text-xs">{error}</pre>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSave} className="space-y-8">
        {/* SECTION 1: Template Selection */}
        <div className="admin-card p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#f4ece0] text-[#8c6d34] flex items-center justify-center text-xs font-bold border border-[#c5a869]/40">
              1
            </span>
            <h3 className="text-lg font-serif font-bold text-[#251d18]">
              Select Wedding Invitation Design
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {templates.map((tpl) => {
              const selected = templateId === tpl.id
              return (
                <div
                  key={tpl.id}
                  onClick={() => setTemplateId(tpl.id)}
                  className={`cursor-pointer rounded-xl border-2 p-3 transition-all flex items-center gap-3.5 ${
                    selected
                      ? 'border-[#c5a869] bg-[#fdfbf7] shadow-md shadow-[#c5a869]/15'
                      : 'border-[#e6dcce] bg-[#ffffff] hover:border-[#dfd7cc]'
                  }`}
                >
                  <img
                    src={tpl.thumbnail}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover border border-[#c5a869]/30 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-[#251d18]">
                        {tpl.name}
                      </span>
                      {selected ? (
                        <span className="text-[#8c6d34] text-xs font-bold">✓ Selected</span>
                      ) : null}
                    </div>
                    <p className="text-[11px] text-[#75675e] line-clamp-1 mt-0.5">
                      {tpl.tagline}
                    </p>
                    <span className="text-[10px] text-[#8c6d34] font-mono mt-1 inline-block">
                      {tpl.id}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* SECTION 2: Client & Couple Details */}
        <div className="admin-card p-6 space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#f4ece0] text-[#8c6d34] flex items-center justify-center text-xs font-bold border border-[#c5a869]/40">
              2
            </span>
            <h3 className="text-lg font-serif font-bold text-[#251d18]">
              Couple & Family Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Bride Name (English) *
              </label>
              <input
                type="text"
                required
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                placeholder="e.g. Niveditha"
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Groom Name (English) *
              </label>
              <input
                type="text"
                required
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                placeholder="e.g. Natraj"
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Bride Name (Tamil)
              </label>
              <input
                type="text"
                value={brideNameTamil}
                onChange={(e) => setBrideNameTamil(e.target.value)}
                placeholder="e.g. நிவேதிதா"
                className="admin-input font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Groom Name (Tamil)
              </label>
              <input
                type="text"
                value={groomNameTamil}
                onChange={(e) => setGroomNameTamil(e.target.value)}
                placeholder="e.g. நடராஜ்"
                className="admin-input font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Bride Parents' Names
              </label>
              <input
                type="text"
                value={parentsBride}
                onChange={(e) => setParentsBride(e.target.value)}
                placeholder="Thiru. S. Ramanathan & Thirumathi. R. Meenakshi"
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Groom Parents' Names
              </label>
              <input
                type="text"
                value={parentsGroom}
                onChange={(e) => setParentsGroom(e.target.value)}
                placeholder="Thiru. M. Natarajan & Thirumathi. N. Soundarya"
                className="admin-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Wedding Hashtag
              </label>
              <input
                type="text"
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                placeholder="#NiviWedsNatraj"
                className="admin-input font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                RSVP Contact Number
              </label>
              <input
                type="text"
                value={rsvpPhone}
                onChange={(e) => setRsvpPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="admin-input font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Client Photographs Storage */}
        <div className="admin-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#f4ece0] text-[#8c6d34] flex items-center justify-center text-xs font-bold border border-[#c5a869]/40">
                3
              </span>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#251d18]">
                  Client Photographs (Project File Storage)
                </h3>
                <p className="text-xs text-[#75675e]">
                  Images are saved into <code className="bg-[#f4ece0] px-1 py-0.5 rounded font-mono text-[11px]">public/invitations/{clientId || 'client-XXX'}/</code>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Couple Hero Photo */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e]">
                Couple Hero Portrait *
              </label>
              <div className="photo-upload-zone relative h-48 flex flex-col items-center justify-center overflow-hidden">
                {uploadedFiles.couple?.previewUrl || existingPhotos.couple ? (
                  <img
                    src={uploadedFiles.couple?.previewUrl || existingPhotos.couple}
                    alt="Couple"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-3">
                    <span className="text-2xl">📸</span>
                    <p className="text-xs text-[#8c6d34] font-semibold mt-1">Upload Couple Photo</p>
                    <p className="text-[10px] text-[#8c7a6e]">JPG, PNG, WebP</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handlePhotoSelect('couple', e)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-[10px] text-[#8c7a6e] font-mono truncate">
                Saved as: /invitations/{clientId}/couple.jpg
              </p>
            </div>

            {/* Bride Photo */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e]">
                Bride Photograph
              </label>
              <div className="photo-upload-zone relative h-48 flex flex-col items-center justify-center overflow-hidden">
                {uploadedFiles.bride?.previewUrl || existingPhotos.bride ? (
                  <img
                    src={uploadedFiles.bride?.previewUrl || existingPhotos.bride}
                    alt="Bride"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-3">
                    <span className="text-2xl">👰</span>
                    <p className="text-xs text-[#8c6d34] font-semibold mt-1">Upload Bride Photo</p>
                    <p className="text-[10px] text-[#8c7a6e]">JPG, PNG, WebP</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handlePhotoSelect('bride', e)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-[10px] text-[#8c7a6e] font-mono truncate">
                Saved as: /invitations/{clientId}/bride.jpg
              </p>
            </div>

            {/* Groom Photo */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e]">
                Groom Photograph
              </label>
              <div className="photo-upload-zone relative h-48 flex flex-col items-center justify-center overflow-hidden">
                {uploadedFiles.groom?.previewUrl || existingPhotos.groom ? (
                  <img
                    src={uploadedFiles.groom?.previewUrl || existingPhotos.groom}
                    alt="Groom"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-3">
                    <span className="text-2xl">🤵</span>
                    <p className="text-xs text-[#8c6d34] font-semibold mt-1">Upload Groom Photo</p>
                    <p className="text-[10px] text-[#8c7a6e]">JPG, PNG, WebP</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handlePhotoSelect('groom', e)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-[10px] text-[#8c7a6e] font-mono truncate">
                Saved as: /invitations/{clientId}/groom.jpg
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: Wedding Events & Ceremonies */}
        <div className="admin-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#f4ece0] text-[#8c6d34] flex items-center justify-center text-xs font-bold border border-[#c5a869]/40">
                4
              </span>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#251d18]">
                  Wedding Ceremonies & Venues
                </h3>
                <p className="text-xs text-[#75675e]">
                  Dates, venues, times, maps URL, and event-specific artwork
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={addCustomEvent}
              className="btn-gold-secondary text-xs py-1.5 px-3"
            >
              ✚ Add Custom Event
            </button>
          </div>

          <div className="space-y-4">
            {events.map((ev, idx) => (
              <div
                key={ev.id || idx}
                className="p-4 sm:p-5 rounded-xl border border-[#e6dcce] bg-[#faf7f2]/70 space-y-4 relative"
              >
                <div className="flex items-center justify-between border-b border-[#e6dcce] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#8c6d34] bg-[#f4ece0] px-2 py-0.5 rounded">
                      #{idx + 1}
                    </span>
                    <span className="font-serif font-bold text-sm text-[#251d18]">
                      {ev.title || 'Ceremony'}
                    </span>
                  </div>

                  {events.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeEvent(idx)}
                      className="text-xs text-rose-600 hover:text-rose-800 font-medium"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#75675e] mb-1">
                      Event Title (English)
                    </label>
                    <input
                      type="text"
                      value={ev.title}
                      onChange={(e) => updateEventField(idx, 'title', e.target.value)}
                      className="admin-input text-xs"
                      placeholder="e.g. Muhurtham"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#75675e] mb-1">
                      Event Title (Tamil)
                    </label>
                    <input
                      type="text"
                      value={ev.titleTamil || ''}
                      onChange={(e) => updateEventField(idx, 'titleTamil', e.target.value)}
                      className="admin-input text-xs font-serif"
                      placeholder="e.g. சுபமுகூர்த்தம்"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#75675e] mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={ev.date}
                        onChange={(e) => updateEventField(idx, 'date', e.target.value)}
                        className="admin-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#75675e] mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        value={ev.time}
                        onChange={(e) => updateEventField(idx, 'time', e.target.value)}
                        className="admin-input text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#75675e] mb-1">
                      Venue Name
                    </label>
                    <input
                      type="text"
                      value={ev.venueName}
                      onChange={(e) => updateEventField(idx, 'venueName', e.target.value)}
                      className="admin-input text-xs"
                      placeholder="e.g. Sri Meenakshi Kalyana Mandapam"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#75675e] mb-1">
                      Venue Address
                    </label>
                    <input
                      type="text"
                      value={ev.venueAddress}
                      onChange={(e) => updateEventField(idx, 'venueAddress', e.target.value)}
                      className="admin-input text-xs"
                      placeholder="e.g. Melur Main Road, Madurai"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#75675e] mb-1">
                      Google Maps URL
                    </label>
                    <input
                      type="url"
                      value={ev.mapsUrl || ''}
                      onChange={(e) => updateEventField(idx, 'mapsUrl', e.target.value)}
                      className="admin-input text-xs"
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                </div>

                {/* Event Image */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-12 h-12 rounded-lg bg-[#ffffff] border border-[#e6dcce] overflow-hidden shrink-0 flex items-center justify-center">
                    {ev.previewUrl || ev.image ? (
                      <img src={ev.previewUrl || ev.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-[#8c7a6e]">Photo</span>
                    )}
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#8c6d34] cursor-pointer hover:underline block">
                      Upload Event Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleEventImageSelect(idx, e)}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[10px] text-[#8c7a6e]">
                      {ev.image || 'Optional specific ceremony artwork'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: Messages, Music & RSVP */}
        <div className="admin-card p-6 space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#f4ece0] text-[#8c6d34] flex items-center justify-center text-xs font-bold border border-[#c5a869]/40">
              5
            </span>
            <h3 className="text-lg font-serif font-bold text-[#251d18]">
              Invitation Messages & Music
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Custom Tamil Invitation Message
              </label>
              <textarea
                rows={3}
                value={customMessageTamil}
                onChange={(e) => setCustomMessageTamil(e.target.value)}
                className="admin-input font-serif text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Custom English Invitation Message
              </label>
              <textarea
                rows={3}
                value={customMessageEnglish}
                onChange={(e) => setCustomMessageEnglish(e.target.value)}
                className="admin-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Background Music Audio URL
              </label>
              <input
                type="text"
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                placeholder="/music.mp3 or /wedding-music.mp3"
                className="admin-input font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* SECTION 6: Storage Identity & Expiry */}
        <div className="admin-card p-6 space-y-5 bg-gradient-to-br from-[#ffffff] to-[#faf5eb]">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#f4ece0] text-[#8c6d34] flex items-center justify-center text-xs font-bold border border-[#c5a869]/40">
              6
            </span>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#251d18]">
                Folder Identity, Slug & Expiry Management
              </h3>
              <p className="text-xs text-[#75675e]">
                Determines the folder on disk and public share URL
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Client ID (Folder Name) *
              </label>
              <input
                type="text"
                required
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="client-003"
                className="admin-input font-mono text-xs"
              />
              <span className="text-[10px] text-[#8c7a6e] mt-1 block">
                Destination: public/invitations/{clientId}/
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Public URL Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="niveditha-natraj-a8k42"
                className="admin-input font-mono text-xs"
              />
              <span className="text-[10px] text-[#8c7a6e] mt-1 block">
                Public URL: /invite/{slug}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75675e] mb-1.5">
                Invitation Expiry Date & Time
              </label>
              <input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="admin-input text-xs"
              />
              <span className="text-[10px] text-[#8c7a6e] mt-1 block">
                Shows expiration notice when exceeded
              </span>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="sticky bottom-4 z-30 bg-[#ffffff]/95 backdrop-blur-md p-4 rounded-2xl border border-[#c5a869]/50 shadow-xl flex items-center justify-between">
          <div className="text-xs text-[#63544b] hidden sm:block">
            Saves JSON to <code className="bg-[#f4ece0] px-1 py-0.5 rounded text-[11px]">src/data/invitations/{clientId}.json</code>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="btn-gold-secondary text-xs py-2.5 px-5"
            >
              Live Preview
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-gold-primary text-xs py-2.5 px-7 shadow-md"
            >
              {saving ? 'Writing to Project Files...' : '💾 Save Invitation to Project'}
            </button>
          </div>
        </div>
      </form>

      {/* Live Preview Modal */}
      {previewOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#000000]/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1a1411] rounded-2xl w-full max-w-4xl h-[92vh] flex flex-col overflow-hidden border border-[#c5a869]/50 shadow-2xl relative">
            <div className="flex items-center justify-between px-4 py-3 bg-[#120c08] border-b border-[#c5a869]/30 text-[#ffffff]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#ffe682]">
                  Live Preview: {brideName || 'Bride'} & {groomName || 'Groom'}
                </span>
                <span className="text-[10px] bg-[#2a1b12] text-[#c5a869] px-2 py-0.5 rounded">
                  {templateId}
                </span>
              </div>
              <button
                onClick={() => setPreviewOpen(false)}
                className="w-8 h-8 rounded-full bg-[#2a1b12] text-[#ffe682] hover:bg-[#3d2719] flex items-center justify-center text-lg font-bold"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-[#0d0907] relative">
              {ActiveTemplateComponent ? (
                <ActiveTemplateComponent invitationData={buildInvitationRecord()} />
              ) : (
                <div className="text-center p-12 text-[#ffe682]">Template loading...</div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Success Modal */}
      {savedInvitation ? (
        <ShareLinkModal
          invitation={savedInvitation}
          onClose={() => {
            setSavedInvitation(null)
            navigate('/admin/manage')
          }}
        />
      ) : null}
    </div>
  )
}
