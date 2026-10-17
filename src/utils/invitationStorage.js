/**
 * invitationStorage.js
 * Frontend client for communicating with the local Node.js file-writing utility
 * and managing invitation data stored as files in the project directory.
 */

// Primary API root matches Vite dev server or standalone server
const API_BASE = '/api'
const STANDALONE_API_BASE = 'http://localhost:5174/api'

let cachedBaseUrl = null

/**
 * Determines whether the file persistence API is reachable.
 */
export async function checkServerConnection() {
  const candidates = [API_BASE, STANDALONE_API_BASE]

  for (const base of candidates) {
    try {
      const res = await fetch(`${base}/invitations/status`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        const data = await res.json()
        if (data.ok) {
          cachedBaseUrl = base
          return { connected: true, baseUrl: base, data }
        }
      }
    } catch {
      // try next candidate
    }
  }

  return {
    connected: false,
    baseUrl: null,
    message: 'Local persistence server not reachable. Ensure "npm run dev" or "npm run server" is running.',
  }
}

async function getActiveApiBase() {
  if (cachedBaseUrl) return cachedBaseUrl
  const status = await checkServerConnection()
  if (status.connected) {
    return status.baseUrl
  }
  return API_BASE
}

/**
 * Fetches all saved invitations.
 * Tries API first, then falls back to reading the public/invitations/index.json static manifest.
 */
export async function getInvitations() {
  try {
    const apiBase = await getActiveApiBase()
    const res = await fetch(`${apiBase}/invitations`, { credentials: 'omit' })
    if (res.ok) {
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        return json.data
      }
    }
  } catch (err) {
    console.warn('API fetch failed, trying static manifest:', err.message)
  }

  // Fallback to static manifest (e.g. static production preview)
  try {
    const manifestRes = await fetch('/invitations/index.json', { cache: 'no-cache' })
    if (manifestRes.ok) {
      const manifest = await manifestRes.json()
      // Fetch each full invitation record
      const fullList = await Promise.all(
        manifest.map(async (item) => {
          try {
            const fileRes = await fetch(`/invitations/${item.id}/invitation.json`, { cache: 'no-cache' })
            if (fileRes.ok) return await fileRes.json()
          } catch {
            // ignore
          }
          return item
        }),
      )
      return fullList
    }
  } catch (err) {
    console.error('Failed to load static invitations manifest:', err)
  }

  return []
}

/**
 * Retrieves a single invitation by either its ID or unique public slug.
 */
export async function getInvitationBySlugOrId(identifier) {
  if (!identifier) return null
  const cleanId = String(identifier).trim()

  // 1. Try API
  try {
    const apiBase = await getActiveApiBase()
    const res = await fetch(`${apiBase}/invitations/${encodeURIComponent(cleanId)}`)
    if (res.ok) {
      const json = await res.json()
      if (json.success && json.data) {
        return json.data
      }
    }
  } catch {
    // API failed or offline
  }

  // 2. Try static manifest lookup
  try {
    const manifestRes = await fetch('/invitations/index.json', { cache: 'no-cache' })
    if (manifestRes.ok) {
      const manifest = await manifestRes.json()
      const match = manifest.find((item) => item.id === cleanId || item.slug === cleanId)
      if (match) {
        const fileRes = await fetch(`/invitations/${match.id}/invitation.json`, { cache: 'no-cache' })
        if (fileRes.ok) {
          return await fileRes.json()
        }
        return match
      }
    }
  } catch {
    // Manifest failed
  }

  // 3. Direct attempt at /invitations/:id/invitation.json
  try {
    const directRes = await fetch(`/invitations/${cleanId}/invitation.json`, { cache: 'no-cache' })
    if (directRes.ok) {
      return await directRes.json()
    }
  } catch {
    // ignore
  }

  return null
}

/**
 * Saves or updates an invitation using the local Node.js file-writing utility.
 * Saves client photographs into public/invitations/:id/ and JSON files into project folders.
 */
export async function saveInvitationToProject(invitationData, uploadedFiles = {}) {
  const status = await checkServerConnection()
  if (!status.connected) {
    throw new Error(
      'Cannot save files: Local persistence server is offline.\n\n' +
      'Please run "npm run dev" or in a separate terminal run "npm run server" (node scripts/save-invitation.mjs). ' +
      'Direct browser JavaScript cannot write files to project folders without the local utility.'
    )
  }

  const payload = {
    invitationData,
    uploadedFiles,
  }

  const res = await fetch(`${status.baseUrl}/invitations/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const result = await res.json()
  if (!res.ok || !result.success) {
    throw new Error(result.error || 'Failed to save invitation to project directory.')
  }

  return result
}

/**
 * Deletes an invitation from project folders.
 */
export async function deleteInvitationFromProject(id) {
  const status = await checkServerConnection()
  if (!status.connected) {
    throw new Error('Local persistence server is offline. Run "npm run dev" or "npm run server".')
  }

  const res = await fetch(`${status.baseUrl}/invitations/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })

  const result = await res.json()
  if (!res.ok || !result.success) {
    throw new Error(result.error || 'Failed to delete invitation.')
  }
  return result
}

/**
 * Extends the expiry date/time of an invitation and republishes it.
 */
export async function extendInvitationExpiry(id, newExpiresAt) {
  const current = await getInvitationBySlugOrId(id)
  if (!current) throw new Error(`Invitation "${id}" not found.`)

  const updated = {
    ...current,
    expiresAt: newExpiresAt,
    status: 'published',
  }

  return await saveInvitationToProject(updated, {})
}

/**
 * Exports all invitations as a single downloadable JSON backup file.
 */
export async function exportAllInvitations() {
  const list = await getInvitations()
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(list, null, 2))
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute('href', dataStr)
  downloadAnchor.setAttribute('download', `wedding-invitations-backup-${new Date().toISOString().slice(0, 10)}.json`)
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
}

/**
 * Imports multiple invitations from a JSON backup file.
 */
export async function importInvitationsFromJson(jsonString) {
  let parsed
  try {
    parsed = JSON.parse(jsonString)
  } catch (err) {
    throw new Error('Invalid JSON file format: ' + err.message)
  }

  const items = Array.isArray(parsed) ? parsed : [parsed]
  const results = []

  for (const item of items) {
    if (item && item.id) {
      const res = await saveInvitationToProject(item, {})
      results.push(res)
    }
  }

  return results
}
