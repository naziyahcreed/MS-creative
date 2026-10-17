/**
 * save-invitation.mjs
 * Secure local Node.js file-writing utility for wedding invitation management.
 * 
 * - Writes client invitation photographs into public/invitations/:id/
 * - Writes invitation JSON records into src/data/invitations/:id.json & public/invitations/:id/invitation.json
 * - Updates the invitations index manifest in both locations
 * - Strict security: Path traversal prevention, safe filename enforcement, image type & size validation
 */

import http from 'node:http'
import fs from 'node:fs/promises'
import { existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export const PROJECT_ROOT = path.resolve(__dirname, '..')

export const PUBLIC_INVITATIONS_DIR = path.resolve(PROJECT_ROOT, 'public', 'invitations')
export const SRC_INVITATIONS_DIR = path.resolve(PROJECT_ROOT, 'src', 'data', 'invitations')

// Ensure primary directories exist
mkdirSync(PUBLIC_INVITATIONS_DIR, { recursive: true })
mkdirSync(SRC_INVITATIONS_DIR, { recursive: true })

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/jpg'])
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const MAX_IMAGE_BYTES = 15 * 1024 * 1024 // 15MB limit per image

/**
 * Validates a client ID to prevent directory traversal and unsafe characters.
 */
export function sanitizeClientId(id) {
  if (typeof id !== 'string') return null
  const clean = id.trim()
  if (!/^[a-zA-Z0-9_-]{3,64}$/.test(clean)) {
    return null
  }
  return clean
}

/**
 * Validates that a target path resides strictly inside an allowed base directory.
 */
export function isSafePath(baseDir, targetPath) {
  const resolvedBase = path.resolve(baseDir)
  const resolvedTarget = path.resolve(targetPath)
  return resolvedTarget.startsWith(resolvedBase + path.sep) || resolvedTarget === resolvedBase
}

/**
 * Strips dangerous characters from filename and ensures an allowed extension.
 */
export function sanitizeFilename(filename, defaultExt = '.jpg') {
  const ext = path.extname(filename).toLowerCase() || defaultExt
  const base = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50)
  const safeExt = ALLOWED_EXTENSIONS.has(ext) ? ext : '.jpg'
  return `${base || 'photo'}${safeExt}`
}

/**
 * Parses and validates base64 image data.
 */
export function decodeBase64Image(dataUriOrBase64) {
  let mimeType = 'image/jpeg'
  let base64Data = dataUriOrBase64

  if (dataUriOrBase64.includes(';base64,')) {
    const parts = dataUriOrBase64.split(';base64,')
    const mimeMatch = parts[0].match(/:(image\/[a-zA-Z0-9+.-]+)/)
    if (mimeMatch) {
      mimeType = mimeMatch[1].toLowerCase()
    }
    base64Data = parts[1]
  }

  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new Error(`Unsupported image type "${mimeType}". Only JPG, PNG, and WebP are allowed.`)
  }

  const buffer = Buffer.from(base64Data, 'base64')
  if (buffer.length > MAX_IMAGE_BYTES) {
    throw new Error(`Image size (${(buffer.length / 1024 / 1024).toFixed(2)}MB) exceeds limit of 15MB.`)
  }

  // Validate header magic bytes
  const isJpg = buffer[0] === 0xff && buffer[1] === 0xd8
  const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47
  const isWebp = buffer.toString('utf8', 8, 12) === 'WEBP'

  if (!isJpg && !isPng && !isWebp) {
    throw new Error('File content does not match a valid JPG, PNG, or WebP image.')
  }

  let ext = '.jpg'
  if (isPng) ext = '.png'
  if (isWebp) ext = '.webp'

  return { buffer, ext, mimeType }
}

/**
 * Reads all invitations from disk to return an updated list.
 */
export async function listAllInvitationsFromDisk() {
  const invitations = []
  try {
    const entries = await fs.readdir(SRC_INVITATIONS_DIR, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'index.json') {
        try {
          const filePath = path.join(SRC_INVITATIONS_DIR, entry.name)
          const content = await fs.readFile(filePath, 'utf8')
          const parsed = JSON.parse(content)
          invitations.push(parsed)
        } catch {
          // ignore corrupted single files
        }
      }
    }
  } catch (err) {
    console.error('Error reading invitations directory:', err)
  }

  // Sort by updatedAt or createdAt desc
  invitations.sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
  return invitations
}

/**
 * Updates index.json in both src/data/invitations and public/invitations
 */
export async function syncIndexManifest(invitations) {
  const manifest = invitations.map((inv) => ({
    id: inv.id,
    slug: inv.slug,
    templateId: inv.templateId,
    brideName: inv.brideName,
    groomName: inv.groomName,
    weddingDate: inv.events?.find((e) => e.id === 'wedding')?.date || inv.weddingDate || '',
    status: inv.status || 'published',
    expiresAt: inv.expiresAt,
    createdAt: inv.createdAt,
    updatedAt: inv.updatedAt,
    dataFile: `/invitations/${inv.id}/invitation.json`,
  }))

  const jsonStr = JSON.stringify(manifest, null, 2)
  await fs.writeFile(path.join(SRC_INVITATIONS_DIR, 'index.json'), jsonStr, 'utf8')
  await fs.writeFile(path.join(PUBLIC_INVITATIONS_DIR, 'index.json'), jsonStr, 'utf8')
}

/**
 * Main Save/Update Handler
 */
export async function handleSaveInvitation(payload) {
  const { invitationData, uploadedFiles = {} } = payload
  if (!invitationData) {
    throw new Error('Missing invitationData in request payload.')
  }

  const clientId = sanitizeClientId(invitationData.id)
  if (!clientId) {
    throw new Error(`Invalid invitation ID "${invitationData.id}". Only letters, numbers, hyphens, and underscores (3-64 chars) are permitted.`)
  }

  const clientPublicDir = path.join(PUBLIC_INVITATIONS_DIR, clientId)
  if (!isSafePath(PUBLIC_INVITATIONS_DIR, clientPublicDir)) {
    throw new Error('Path traversal attempt detected.')
  }

  await fs.mkdir(clientPublicDir, { recursive: true })

  // Process uploaded images
  const finalPhotos = { ...(invitationData.photos || {}) }
  const savedFilesReport = []

  for (const [key, fileObj] of Object.entries(uploadedFiles)) {
    if (!fileObj || !fileObj.data) continue

    const { buffer, ext } = decodeBase64Image(fileObj.data)
    const rawName = fileObj.filename || `${key}${ext}`
    const safeName = sanitizeFilename(rawName, ext)
    const filePath = path.join(clientPublicDir, safeName)

    if (!isSafePath(clientPublicDir, filePath)) {
      throw new Error(`Path traversal attempt detected in filename "${rawName}".`)
    }

    await fs.writeFile(filePath, buffer)
    const relativeUrl = `/invitations/${clientId}/${safeName}`
    finalPhotos[key] = relativeUrl
    savedFilesReport.push({ field: key, path: relativeUrl, size: buffer.length })
  }

  // Handle event images if uploaded
  const finalEvents = Array.isArray(invitationData.events) ? [...invitationData.events] : []
  for (let i = 0; i < finalEvents.length; i++) {
    const ev = finalEvents[i]
    if (ev.newImageData) {
      const { buffer, ext } = decodeBase64Image(ev.newImageData)
      const evKey = `event-${ev.id || i}${ext}`
      const safeName = sanitizeFilename(evKey, ext)
      const filePath = path.join(clientPublicDir, safeName)
      await fs.writeFile(filePath, buffer)
      ev.image = `/invitations/${clientId}/${safeName}`
      delete ev.newImageData
      savedFilesReport.push({ field: `event-${ev.id}`, path: ev.image, size: buffer.length })
    }
  }

  // Build clean record
  const now = new Date().toISOString()
  const cleanRecord = {
    ...invitationData,
    id: clientId,
    slug: invitationData.slug || `${(invitationData.brideName || 'wedding').toLowerCase().replace(/[^a-z0-9]/g, '-')}-${clientId}`,
    photos: finalPhotos,
    events: finalEvents,
    updatedAt: now,
    createdAt: invitationData.createdAt || now,
    status: invitationData.status || 'published',
  }

  // Write record to src/data/invitations/:id.json
  const srcJsonPath = path.join(SRC_INVITATIONS_DIR, `${clientId}.json`)
  const pubJsonPath = path.join(clientPublicDir, 'invitation.json')

  const jsonContent = JSON.stringify(cleanRecord, null, 2)
  await fs.writeFile(srcJsonPath, jsonContent, 'utf8')
  await fs.writeFile(pubJsonPath, jsonContent, 'utf8')

  // Update manifest
  const all = await listAllInvitationsFromDisk()
  await syncIndexManifest(all)

  return {
    success: true,
    message: `Invitation "${clientId}" saved successfully to project folder.`,
    invitation: cleanRecord,
    savedFiles: savedFilesReport,
    storedPaths: {
      publicFolder: `public/invitations/${clientId}/`,
      dataFile: `src/data/invitations/${clientId}.json`,
      publicDataFile: `public/invitations/${clientId}/invitation.json`,
    },
  }
}

/**
 * Handle Delete Invitation
 */
export async function handleDeleteInvitation(id) {
  const clientId = sanitizeClientId(id)
  if (!clientId) throw new Error('Invalid client ID.')

  const srcJsonPath = path.join(SRC_INVITATIONS_DIR, `${clientId}.json`)
  const clientPublicDir = path.join(PUBLIC_INVITATIONS_DIR, clientId)

  if (existsSync(srcJsonPath)) {
    await fs.unlink(srcJsonPath)
  }
  if (existsSync(clientPublicDir)) {
    await fs.rm(clientPublicDir, { recursive: true, force: true })
  }

  const all = await listAllInvitationsFromDisk()
  await syncIndexManifest(all)

  return { success: true, message: `Invitation ${clientId} deleted from project folders.` }
}

/**
 * HTTP API Request Dispatcher
 */
export async function apiRequestHandler(req, res) {
  // CORS Headers for dev convenience
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  const parsedUrl = new URL(req.url, 'http://localhost')
  const pathname = parsedUrl.pathname

  // Health check / status
  if (pathname === '/api/invitations/status' || pathname === '/api/status') {
    const list = await listAllInvitationsFromDisk()
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
      ok: true,
      mode: 'project-filesystem',
      status: 'connected',
      projectRoot: PROJECT_ROOT,
      publicDir: PUBLIC_INVITATIONS_DIR,
      invitationsCount: list.length,
      timestamp: new Date().toISOString(),
    }))
    return
  }

  // List all invitations
  if (pathname === '/api/invitations' && req.method === 'GET') {
    try {
      const list = await listAllInvitationsFromDisk()
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: true, data: list }))
    } catch (err) {
      res.statusCode = 500
      res.end(JSON.stringify({ success: false, error: err.message }))
    }
    return
  }

  // Get single invitation by ID or Slug
  if (pathname.startsWith('/api/invitations/') && req.method === 'GET') {
    const identifier = pathname.replace('/api/invitations/', '').trim()
    const all = await listAllInvitationsFromDisk()
    const found = all.find((item) => item.id === identifier || item.slug === identifier)
    if (found) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: true, data: found }))
    } else {
      res.statusCode = 404
      res.end(JSON.stringify({ success: false, error: `Invitation "${identifier}" not found on disk.` }))
    }
    return
  }

  // Save / Update invitation
  if ((pathname === '/api/invitations/save' || pathname === '/api/invitations') && (req.method === 'POST' || req.method === 'PUT')) {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body)
        const result = await handleSaveInvitation(parsed)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(result))
      } catch (err) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false, error: err.message }))
      }
    })
    return
  }

  // Delete invitation
  if (pathname.startsWith('/api/invitations/') && req.method === 'DELETE') {
    const id = pathname.replace('/api/invitations/', '').trim()
    try {
      const result = await handleDeleteInvitation(id)
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(result))
    } catch (err) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: err.message }))
    }
    return
  }

  res.statusCode = 404
  res.end(JSON.stringify({ error: `Not found: ${pathname}` }))
}

// Standalone Server Execution
const PORT = process.env.PORT || 5174

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = http.createServer((req, res) => {
    apiRequestHandler(req, res).catch((err) => {
      res.statusCode = 500
      res.end(JSON.stringify({ error: err.message }))
    })
  })

  server.listen(PORT, () => {
    console.log(`\n======================================================`)
    console.log(`💍 Local Wedding Invitation File Persistence Server`)
    console.log(`   Running on: http://localhost:${PORT}`)
    console.log(`   Project Root: ${PROJECT_ROOT}`)
    console.log(`   Public Dir:   ${PUBLIC_INVITATIONS_DIR}`)
    console.log(`   Src Data Dir: ${SRC_INVITATIONS_DIR}`)
    console.log(`======================================================\n`)
  })
}
